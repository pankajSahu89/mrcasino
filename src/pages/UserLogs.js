import { useState, useEffect, useMemo } from "react";
import Sidebar from "../components/Sidebar";
import { getAllVisitorLogs } from "../api/visitorLog";
import { FaSyncAlt } from "react-icons/fa";

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

const LOGS_PER_PAGE = 10;

const UserLogsAdmin = () => {
  const [logs, setLogs] = useState([]);
  const [searchIP, setSearchIP] = useState("");
  const [filterCountry, setFilterCountry] = useState("Global");
  const [currentPage, setCurrentPage] = useState(1);


  const fetchLogs = async () => {
    try {
      const data = await getAllVisitorLogs();
      setLogs(data);
      setCurrentPage(1); // reset page on refresh
    } catch (err) {
      console.error("Error fetching visitor logs:", err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesIP = log.ip?.includes(searchIP);
      const matchesCountry =
        filterCountry === "Global" ? true : log.country === filterCountry;
      return matchesIP && matchesCountry;
    });
  }, [logs, searchIP, filterCountry]);


  const totalPages = Math.ceil(filteredLogs.length / LOGS_PER_PAGE);
  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * LOGS_PER_PAGE;
    return filteredLogs.slice(start, start + LOGS_PER_PAGE);
  }, [filteredLogs, currentPage]);

  return (
    <div className="flex min-h-screen bg-[#0f1115] text-white">
      <Sidebar />

      <div className="flex-1 p-6 md:p-10">
        <h2 className="text-3xl font-bold tracking-wide mb-6">User Logs</h2>

     
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-3 md:space-y-0">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-3 md:space-y-0">
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

         
          <button
            onClick={fetchLogs}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 
            text-white shadow-md hover:scale-105 transition-all"
          >
            <FaSyncAlt />
            Refresh
          </button>
        </div>

        <div className="bg-[#1a1d23] rounded-xl shadow-xl border border-white/10  ">
          <table className="w-full text-left min-w-[1200px]">
            <thead className="bg-[#262b33] border-b border-white/10 sticky top-0">
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
              {paginatedLogs.length > 0 ? (
                paginatedLogs.map((log, i) => (
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

        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-40"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === idx + 1
                    ? "bg-blue-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLogsAdmin;
