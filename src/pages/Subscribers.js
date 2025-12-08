import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getSubscribers, deleteSubscriber } from "../api/subscribe";

const SubscribersAdmin = () => {
  const [subscribers, setSubscribers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const data = await getSubscribers(); // Make sure this returns res.data.data
        setSubscribers(data);
      } catch (err) {
        console.error("Error fetching subscribers:", err);
      }
    };

    fetchSubscribers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteSubscriber(id);
      setSubscribers(subscribers.filter((sub) => sub._id !== id));
    } catch (error) {
      console.error("Error deleting subscriber:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0f1115] text-white">
      <Sidebar />

      <div className="flex-1 p-6 md:p-10">
        <h2 className="text-3xl font-bold tracking-wide mb-6">Subscribers List</h2>

        <div className="bg-[#1a1d23] rounded-xl shadow-xl border border-white/10 overflow-hidden backdrop-blur-lg">
          <table className="w-full text-left">
            <thead className="bg-[#262b33] border-b border-white/10">
              <tr>
                <th className="p-4 text-gray-300">Email</th>
                <th className="p-4 text-gray-300">Subscribed At</th>
                <th className="p-4 text-gray-300">Actions</th>
              </tr>
            </thead>

            <tbody>
              {subscribers.length > 0 ? (
                subscribers.map((sub, i) => (
                  <tr
                    key={sub._id}
                    className={`border-b border-white/10 hover:bg-white/5 transition-all ${
                      i % 2 === 0 ? "bg-white/5" : "bg-transparent"
                    }`}
                  >
                    <td className="p-4 font-semibold text-white">{sub.email}</td>
                    <td className="p-4 text-gray-400">
                      {new Date(sub.createdAt).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <button
                        className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 
                        text-white shadow-md hover:scale-110 transition-all"
                        onClick={() => handleDelete(sub._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-6 text-center text-gray-400" colSpan="3">
                    No subscribers found.
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

export default SubscribersAdmin;
