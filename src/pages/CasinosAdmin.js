import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCasinos, deleteCasino, updateCasino } from "../api/casinos";
import Sidebar from "../components/Sidebar";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Swal from "sweetalert2";

const CasinosAdmin = () => {
  const [casinos, setCasinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCasinos = async () => {
      try {
        const data = await getAllCasinos();
        setCasinos([...data].sort((a, b) => a.order - b.order));
      } catch (err) {
        setError("Failed to load casinos");
      } finally {
        setLoading(false);
      }
    };
    fetchCasinos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCasino(id);
      setCasinos(casinos.filter((casino) => casino._id !== id));
    } catch {
      setError("Failed to delete casino");
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    setIsUpdating(true);
    const original = [...casinos];

    try {
      const reordered = [...casinos];
      const [moved] = reordered.splice(result.source.index, 1);
      reordered.splice(result.destination.index, 0, moved);

      const updated = reordered.map((item, i) => ({
        ...item,
        order: i + 1,
      }));

      setCasinos(updated);

      await updateCasino(moved._id, { order: result.destination.index + 1 });

      const data = await getAllCasinos();
      setCasinos([...data].sort((a, b) => a.order - b.order));
    } catch (err) {
      setCasinos(original);
      setError("Order update failed");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex bg-[#0f1115] min-h-screen text-white">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">Loading casinos...</div>
      </div>
    );
  }

  return (
    <div className="flex bg-[#0f1115] text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 md:p-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Manage Casinos</h2>

          <button
            onClick={() => navigate("/create-casino")}
            disabled={isUpdating}
            className={`px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-700 shadow-lg transition-all 
              hover:scale-105 hover:shadow-green-500/30 ${isUpdating ? "opacity-50" : ""}`}
          >
            {isUpdating ? "Updating..." : "+ Add Casino"}
          </button>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#1a1d23] shadow-xl overflow-hidden backdrop-blur-xl">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="casinoList">
              {(provided) => (
                <table
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-full text-left"
                >
                  <thead className="bg-[#262b33] border-b border-white/10">
                    <tr>
                      <th className="p-4 text-gray-300 w-24">Order</th>
                      <th className="p-4 text-gray-300">Logo</th>
                      <th className="p-4 text-gray-300">Name</th>
                      <th className="p-4 text-gray-300">Rating</th>
                      <th className="p-4 text-gray-300">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {casinos.map((casino, index) => (
                      <Draggable
                        key={casino._id}
                        draggableId={casino._id}
                        index={index}
                        isDragDisabled={isUpdating}
                      >
                        {(provided) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`border-b border-white/10 hover:bg-white/5 transition-all ${
                              isUpdating ? "opacity-40" : ""
                            }`}
                          >
                            <td className="p-4 font-semibold text-white" {...provided.dragHandleProps}>
                              <div className="flex items-center space-x-2 cursor-grab active:cursor-grabbing">
                                <span className="text-gray-400 text-lg">☰</span>
                                <span>{index + 1}</span>
                              </div>
                            </td>

                            <td className="p-4">
                              <img src={casino.logo} alt={casino.name} className="h-10 rounded" />
                            </td>

                            <td className="p-4">{casino.name}</td>

                            <td className="p-4 text-yellow-400">{casino.rating} ⭐</td>

                            <td className="p-4">
                              <button
                                className="px-3 py-1 mr-2 rounded-lg bg-red-600 hover:bg-red-700 shadow-md hover:scale-110 transition-all"
                                disabled={isUpdating}
                                onClick={() => {
                                  Swal.fire({
                                    title: "Delete casino?",
                                    text: "This action cannot be undone.",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#d33",
                                    cancelButtonColor: "#3085d6",
                                    confirmButtonText: "Delete",
                                  }).then((r) => {
                                    if (r.isConfirmed) {
                                      handleDelete(casino._id);
                                      Swal.fire("Deleted!", "Casino removed.", "success");
                                    }
                                  });
                                }}
                              >
                                Delete
                              </button>

                              <button
                                onClick={() => navigate(`/edit-casino/${casino._id}`)}
                                disabled={isUpdating}
                                className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 shadow-md hover:scale-110 transition-all"
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                </table>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        {error && <div className="text-red-400 mt-4">{error}</div>}
      </div>
    </div>
  );
};

export default CasinosAdmin;
