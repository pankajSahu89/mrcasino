import { useState, useEffect, useMemo } from "react";
import Sidebar from "../components/Sidebar";
import { getAllVisitorLogs } from "../api/visitorLog";

const countryOptions = [
  "Global",
  // North America
  "Canada",
  "United States",
  // Oceania
  "Australia",
  "New Zealand",
  // Europe
  "Austria",
  "Finland",
  "Germany",
  "Ireland",
  "Netherlands",
  "Norway",
  "Sweden",
  "Switzerland",
  "United Kingdom (UK)",
  "European Countries (General)",
  // Asia
  "India",
];

const UserLogsAdmin = () => {
  const [logs, setLogs] = useState([]);
  const [searchIP, setSearchIP] = useState("");
  const [filterCountry, setFilterCountry] = useState("Global");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getAllVisitorLogs();
        setLogs(data);
      } catch (err) {
        console.error("Error fetching visitor logs:", err);
      }
    };
    fetchLogs();
  }, []);

  // Filtered logs based on search and country
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesIP = log.ip.includes(searchIP);
      const matchesCountry =
        filterCountry === "Global" ? true : log.country === filterCountry;
      return matchesIP && matchesCountry;
    });
  }, [logs, searchIP, filterCountry]);

  return (
    <div className="flex min-h-screen bg-[#0f1115] text-white">
      <Sidebar />

      <div className="flex-1 p-6 md:p-10">
        <h2 className="text-3xl font-bold tracking-wide mb-6">User Logs</h2>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-6 space-y-3 md:space-y-0">
          <input
            type="text"
            placeholder="Search by IP..."
            value={searchIP}
            onChange={(e) => setSearchIP(e.target.value)}
            className="p-2 rounded bg-[#262b33] text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
            className="p-2 rounded bg-[#262b33] text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {countryOptions.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-[#1a1d23] rounded-xl shadow-xl border border-white/10 overflow-auto max-h-[80vh]">
          <table className="w-full text-left min-w-[1200px]">
            <thead className="bg-[#262b33] border-b border-white/10">
              <tr>
                <th className="p-4 text-gray-300">IP</th>
                <th className="p-4 text-gray-300">Type</th>
                <th className="p-4 text-gray-300">Country</th>
                <th className="p-4 text-gray-300">Country Code</th>
                <th className="p-4 text-gray-300">Region</th>
                <th className="p-4 text-gray-300">City</th>
                <th className="p-4 text-gray-300">ISP</th>
                <th className="p-4 text-gray-300">Visited At</th>
              </tr>
            </thead>

            <tbody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log, i) => (
                  <tr
                    key={log._id}
                    className={`border-b border-white/10 hover:bg-white/5 transition-all ${
                      i % 2 === 0 ? "bg-white/5" : "bg-transparent"
                    }`}
                  >
                    <td className="p-4 font-semibold text-white">{log.ip}</td>
                    <td className="p-4 text-gray-400">{log.type}</td>
                    <td className="p-4 text-gray-400">{log.country}</td>
                    <td className="p-4 text-gray-400">{log.country_code}</td>
                    <td className="p-4 text-gray-400">{log.region}</td>
                    <td className="p-4 text-gray-400">{log.city}</td>
                    <td className="p-4 text-gray-400">{log.isp}</td>
                    <td className="p-4 text-gray-400">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-6 text-center text-gray-400" colSpan="8">
                    No visitor logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserLogsAdmin;
