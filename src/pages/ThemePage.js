import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const ColorPage = () => {
  const [colors, setColors] = useState([]);
  const [variable, setVariable] = useState("");
  const [hexCode, setHexCode] = useState("#267BDC"); // project theme default
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch colors
  const fetchColors = async () => {
    try {
      const res = await axios.get("/api/colors");
      setColors(res.data);
    } catch (err) {
      console.error("Error fetching colors:", err);
    }
  };

  useEffect(() => {
    fetchColors();
  }, []);

  // Add or update color
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await axios.put(`/api/colors/${editId}`, { variable, hexCode });
      } else {
        await axios.post("/api/colors", { variable, hexCode });
      }
      setVariable("");
      setHexCode("#267BDC");
      setEditId(null);
      fetchColors();
    } catch (err) {
      console.error("Error saving color:", err);
    } finally {
      setLoading(false);
    }
  };

  // Edit color
  const handleEdit = (color) => {
    setVariable(color.variable);
    setHexCode(color.hexCode);
    setEditId(color._id);
  };

  // Delete color
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this color?")) return;
    try {
      await axios.delete(`/api/colors/${id}`);
      setColors(colors.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting color:", err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold mb-6">Manage Colors</h2>

        {/* Add/Edit Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editId ? "Edit Color" : "Add New Color"}
          </h3>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <input
              type="text"
              placeholder="Variable name (e.g. --primary)"
              value={variable}
              onChange={(e) => setVariable(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="color"
              value={hexCode}
              onChange={(e) => setHexCode(e.target.value)}
              className="w-16 h-12 border border-gray-300 rounded cursor-pointer"
            />
            <button
              type="submit"
              className={`px-4 py-2 rounded ${
                editId
                  ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
              disabled={loading}
            >
              {editId ? "Update Color" : "Add Color"}
            </button>
          </form>
        </div>

        {/* Colors Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Preview</th>
                <th className="p-3 text-left">Variable</th>
                <th className="p-3 text-left">Hex Code</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {colors.length > 0 ? (
                colors.map((color) => (
                  <tr key={color._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div
                        className="w-8 h-8 rounded border"
                        style={{ backgroundColor: color.hexCode }}
                      ></div>
                    </td>
                    <td className="p-3">{color.variable}</td>
                    <td className="p-3">{color.hexCode}</td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(color)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(color._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">
                    No colors added yet.
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

export default ColorPage;
