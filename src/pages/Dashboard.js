import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import Sidebar from "../components/Sidebar";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

const GA4_PROPERTY_ID = "355690072";

// Colors for the Pie Chart and Bar Chart
const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

// Dummy Fallback Data
const fallbackData = [
  { name: "2025-01-01", activeUsers: 120, newUsers: 25, totalRevenue: 350.50, engagementRate: 0.65 },
  { name: "2025-01-02", activeUsers: 140, newUsers: 30, totalRevenue: 420.75, engagementRate: 0.72 },
  { name: "2025-01-03", activeUsers: 98, newUsers: 15, totalRevenue: 300.20, engagementRate: 0.58 },
];
const fallbackCountryData = [
  { name: "USA", users: 500, revenue: 1200 },
  { name: "Canada", users: 350, revenue: 800 },
  { name: "UK", users: 250, revenue: 500 },
  { name: "Germany", users: 150, revenue: 300 },
];

// Key for localStorage
const TOKEN_STORAGE_KEY = 'ga4_access_token';

const DashboardContent = () => {
  // 1. Initialize token state from localStorage
  const [token, setToken] = useState(localStorage.getItem(TOKEN_STORAGE_KEY));
  const [analyticsData, setAnalyticsData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Correct Google Login setup
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      // 2. Persist token to localStorage on successful login
      localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
      setToken(accessToken);
    },
    onError: (error) => console.error("Login Error:", error),
    scope: "https://www.googleapis.com/auth/analytics.readonly openid email profile",
  });

  // Function to clear token and log out
  const handleLogout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
    setAnalyticsData(fallbackData);
    setCountryData(fallbackCountryData);
  };

  // Fetch GA4 Analytics
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      if (!token) {
          // If no token, use fallback data and stop
          setAnalyticsData(fallbackData);
          setCountryData(fallbackCountryData);
          return;
      }

      setLoading(true);

      const requestedMetrics = [
        "activeUsers",
        "newUsers",
        "totalRevenue",
        "engagementRate",
      ];
      
      const requestedDimensions = [{ name: "date" }, { name: "country" }];

      try {
        const response = await fetch(
          `https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY_ID}:runReport`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              dateRanges: [{ startDate: "2025-01-01", endDate: "2025-05-20" }],
              metrics: requestedMetrics.map(name => ({ name })),
              dimensions: requestedDimensions,
              orderBys: [
                { dimension: { dimensionName: "date" } },
                { dimension: { dimensionName: "country" } },
              ],
            }),
          }
        );

        const json = await response.json();

        if (json.error && json.error.code === 401) { // Specifically handle token expiration/invalid token
             console.warn("Token expired or invalid. Logging out.");
             handleLogout(); // Clear the expired token
             return;
        }

        if (json.error || !json.rows) {
          console.error("GA API Error:", json.error || "No rows returned");
          setAnalyticsData(fallbackData);
          setCountryData(fallbackCountryData);
          setLoading(false);
          return;
        }

        // --- Data Aggregation Logic (Unchanged and correct) ---
        const dailyAggregatedDataMap = new Map();
        const countryDataMap = new Map();

        json.rows.forEach((row) => {
             const date = row.dimensionValues[0].value;
             const country = row.dimensionValues[1].value;
             const metricValues = row.metricValues;
             
             const activeUsers = Number(metricValues[0]?.value || 0);
             const newUsers = Number(metricValues[1]?.value || 0);
             const totalRevenue = Number(metricValues[2]?.value || 0);

             // Aggregate by Date
             if (!dailyAggregatedDataMap.has(date)) {
                 dailyAggregatedDataMap.set(date, { 
                     name: date, 
                     activeUsers: 0, 
                     newUsers: 0, 
                     totalRevenue: 0, 
                     engagementRate: Number(metricValues[3]?.value || 0) // Keeping the last recorded rate for the date for now
                 });
             }
             const dailyData = dailyAggregatedDataMap.get(date);
             dailyData.activeUsers += activeUsers;
             dailyData.newUsers += newUsers;
             dailyData.totalRevenue += totalRevenue;
             
             // Aggregate by Country
             if (!countryDataMap.has(country)) {
                 countryDataMap.set(country, { name: country, users: 0, revenue: 0 });
             }
             const countryStats = countryDataMap.get(country);
             countryStats.users += activeUsers;
             countryStats.revenue += totalRevenue;
        });

        const finalDailyData = Array.from(dailyAggregatedDataMap.values());
        const finalCountryData = Array.from(countryDataMap.values())
            .sort((a, b) => b.users - a.users)
            .slice(0, 5);

        setAnalyticsData(finalDailyData.length > 0 ? finalDailyData : fallbackData);
        setCountryData(finalCountryData.length > 0 ? finalCountryData : fallbackCountryData);

      } catch (err) {
        console.error("Analytics Fetch Error:", err);
        setAnalyticsData(fallbackData);
        setCountryData(fallbackCountryData);
      }

      setLoading(false);
    };

    fetchAnalyticsData();
  }, [token]);
  // --- END OF GA4 FETCH AND PROCESSING ---

  // ... (rest of the calculation and formatting functions) ...
  const totalUsers = analyticsData.length > 0 ? analyticsData.reduce((a, c) => a + c.activeUsers, 0) : 0;
  const totalNewUsers = analyticsData.length > 0 ? analyticsData.reduce((a, c) => a + c.newUsers, 0) : 0;
  const totalRevenueValue = analyticsData.length > 0 ? analyticsData.reduce((a, c) => a + c.totalRevenue, 0).toFixed(2) : 0;
  const renderCustomizedLabel = ({ name, percent }) => percent * 100 > 5 ? `${name} (${(percent * 100).toFixed(0)}%)` : null;
  const formatCurrency = (value) => `$${Number(value).toFixed(2)}`;
  
  const CustomCountryTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-2 bg-[#2a2d33] border border-white/20 rounded-lg text-white">
          <p className="font-bold">{`${label}`}</p>
          <p className="text-sm">Users: {data.users.toLocaleString()}</p>
          <p className="text-sm">Revenue: ${data.revenue.toFixed(2).toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };


  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0f1115] text-white">
      <Sidebar />

      <div className="flex-1 p-6 md:p-10">
        <h2 className="text-3xl font-bold mb-8 text-white tracking-wide">
          Admin Dashboard
        </h2>

        {/* Conditional Login/Logout Button/Status */}
        {!token ? (
          <button
            onClick={() => login()}
            className="mb-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
          >
            🔑 Login with Google to Load Analytics
          </button>
        ) : (
           <div className="flex justify-between items-center mb-6 p-4 bg-[#1a1d23] rounded-lg border border-green-700/50">
                <p className="text-lg text-green-400 font-semibold">
                     Analytics Data Loaded 
                </p>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-300"
                >
                    Logout
                </button>
            </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            {
              title: "Total Casinos",
              value: 25,
              color: "from-blue-500 to-blue-700",
              sub: "+12% from last month",
            },
            {
              title: "New Users",
              value: totalNewUsers.toLocaleString(),
              color: "from-green-500 to-green-700",
              sub: "+3 new this month",
            },
            {
              title: "Active Users (Total)",
              value: totalUsers.toLocaleString(),
              color: "from-yellow-500 to-yellow-700",
              sub: `Across ${countryData.length} countries`,
            },
            {
              title: "Total Revenue",
              value: `$${totalRevenueValue.toLocaleString()}`,
              color: "from-purple-500 to-purple-700",
              sub: "Target: $10k this month",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl bg-gradient-to-br ${item.color} shadow-xl backdrop-blur-lg bg-opacity-10 border border-white/10 hover:scale-105 transition-all duration-300`}
            >
              <h3 className="text-lg font-semibold opacity-90">{item.title}</h3>
              <p className="text-4xl font-bold mt-3">{item.value}</p>
              <p className="text-sm opacity-80 mt-1">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Charts Container - Row 1 (Time-Series) */}
        {loading ? (
          <div className="text-center py-10 text-gray-400">
            <div className="animate-pulse text-lg">Loading Analytics...</div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
              {/* Chart 1: Daily User Activity (Bar Chart) */}
              <div className="p-6 bg-[#1a1d23] rounded-2xl shadow-lg border border-white/10">
                <h3 className="text-xl font-semibold mb-4">
                  Daily User Activity (Active vs. New)
                </h3>
                <div className="w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#aaa" />
                      <YAxis stroke="#aaa" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="activeUsers" fill="#3B82F6" name="Active Users" />
                      <Bar dataKey="newUsers" fill="#10B981" name="New Users" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 2: Revenue Trend (Line Chart) */}
              <div className="p-6 bg-[#1a1d23] rounded-2xl shadow-lg border border-white/10">
                <h3 className="text-xl font-semibold mb-4">
                  Revenue & Engagement Trend
                </h3>
                <div className="w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#aaa" />
                      <YAxis yAxisId="left" stroke="#10B981" domain={['auto', 'auto']} tickFormatter={formatCurrency} />
                      <YAxis yAxisId="right" orientation="right" stroke="#EF4444" domain={[0, 1]} />
                      <Tooltip formatter={(value, name) => name === 'Revenue' ? formatCurrency(value) : value} />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="totalRevenue"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={false}
                        name="Revenue"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="engagementRate"
                        stroke="#EF4444"
                        strokeWidth={3}
                        dot={false}
                        name="Engagement Rate"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Charts Container - Row 2 (Country Data) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Chart 3: Top 5 Countries by Users (Pie Chart) */}
              <div className="p-6 bg-[#1a1d23] rounded-2xl shadow-lg border border-white/10">
                <h3 className="text-xl font-semibold mb-4">
                  Top 5 Countries by Users
                </h3>
                <div className="w-full h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={countryData}
                        dataKey="users"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label={renderCustomizedLabel}
                        labelLine={false}
                      >
                        {countryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      {/* Use custom tooltip to show both users and revenue */}
                      <Tooltip content={<CustomCountryTooltip />} />
                      <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ paddingLeft: '20px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 4: Top 5 Countries by Revenue (NEW BAR CHART) */}
              <div className="p-6 bg-[#1a1d23] rounded-2xl shadow-lg border border-white/10">
                <h3 className="text-xl font-semibold mb-4">
                  Top 5 Countries by Revenue
                </h3>
                <div className="w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    {/* Use BarChart for Revenue comparison */}
                    <BarChart data={countryData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis type="number" stroke="#aaa" tickFormatter={formatCurrency} />
                      <YAxis type="category" dataKey="name" stroke="#aaa" width={100} />
                      {/* Use custom tooltip to show both users and revenue */}
                      <Tooltip content={<CustomCountryTooltip />} />
                      <Bar dataKey="revenue" fill="#F59E0B" name="Revenue" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Google OAuth Wrapper
const Dashboard = () => (
  <GoogleOAuthProvider clientId="541803818140-q1dtlr4jcj41r544cqpi748166mmm0lc.apps.googleusercontent.com">
    <DashboardContent />
  </GoogleOAuthProvider>
);

export default Dashboard;