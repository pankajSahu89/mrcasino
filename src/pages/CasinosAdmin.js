

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCasinos, deleteCasino, updateCasino } from "../api/casinos";
import Sidebar from "../components/Sidebar";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Swal from 'sweetalert2';
const CasinosAdmin = () => {
  const [casinos, setCasinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  // Fetch casinos sorted by order
  useEffect(() => {
    const fetchCasinos = async () => {
      try {
        const data = await getAllCasinos();
        const sortedCasinos = [...data].sort((a, b) => a.order - b.order);
        setCasinos(sortedCasinos);
      } catch (err) {
        setError(err.message || "Failed to load casinos");
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
    } catch (err) {
      setError(err.message || "Failed to delete casino");
    }
  };

  // const onDragEnd = async (result) => {
  //   if (!result.destination) return;
  //   if (result.source.index === result.destination.index) return;

  //   setIsUpdating(true);

  //   try {
  //     // Create new ordered array
  //     const newCasinos = Array.from(casinos);
  //     const [movedCasino] = newCasinos.splice(result.source.index, 1);
  //     newCasinos.splice(result.destination.index, 0, movedCasino);

  //     // Update order numbers sequentially starting from 1
  //     const updatedCasinos = newCasinos.map((casino, index) => ({
  //       ...casino,
  //       order: index + 1,
  //     }));

  //     // Optimistic UI update
  //     setCasinos(updatedCasinos);

  //     // Update the moved casino's order in the backend
  //     await updateCasinoOrder(movedCasino._id, result.destination.index + 1);

  //     // If you want to update all orders (more reliable but heavier):
  //     // await Promise.all(updatedCasinos.map(casino =>
  //     //   updateCasinoOrder(casino._id, casino.order)
  //     // ));
  //   } catch (err) {
  //     setError(err.message || "Failed to update order");
  //     // Revert to previous state if update fails
  //     const data = await getCasinos();
  //     const sortedCasinos = [...data].sort((a, b) => a.order - b.order);
  //     setCasinos(sortedCasinos);
  //   } finally {
  //     setIsUpdating(false);
  //   }
  // };

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;

    setIsUpdating(true);
    const originalCasinos = [...casinos];

    try {
      // Create new ordered array
      const newCasinos = Array.from(casinos);
      const [movedCasino] = newCasinos.splice(result.source.index, 1);
      newCasinos.splice(result.destination.index, 0, movedCasino);

      // Get the new order value from the destination index
      const newOrder = result.destination.index + 1;

      // Optimistic UI update with actual order values
      const updatedCasinos = newCasinos.map((casino, index) => ({
        ...casino,
        order: index + 1,
      }));

      setCasinos(updatedCasinos);

      // Update backend with the new order for the moved casino only
      await updateCasino(movedCasino._id, { order: newOrder });

      // Refresh the list from server to get final order values
      const data = await getAllCasinos();
      setCasinos(data.sort((a, b) => a.order - b.order));
    } catch (err) {
      setError(err.message || "Failed to update order");
      setCasinos(originalCasinos);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 flex items-center justify-center">
          <div>Loading casinos...</div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">Manage Casinos</h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600 transition"
          onClick={() => navigate("/create-casino")}
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Create Casino"}
        </button>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="casinos">
              {(provided) => (
                <table
                  className="w-full"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-3 text-left w-24">Order</th>
                      <th className="p-3 text-left">Logo</th>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Rating</th>
                      <th className="p-3 text-left">Actions</th>
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
                            className={`border-b hover:bg-gray-50 ${isUpdating ? "opacity-50" : ""
                              }`}
                          >
                            <td className="p-3" {...provided.dragHandleProps}>
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-gray-400 mr-2"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                                {index + 1}
                              </div>
                            </td>
                            <td className="p-3">
                              <img
                                src={casino.logo}
                                alt={casino.name}
                                className="h-10"
                              />
                            </td>
                            <td className="p-3">{casino.name}</td>
                            <td className="p-3">{casino.rating} ⭐</td>
                            <td className="p-3">
                              <button
                                className="bg-red-500 text-white px-3 py-1 rounded mr-2 hover:bg-red-600 transition disabled:opacity-50"
                                onClick={() => {
                                  Swal.fire({
                                    title: 'Are you sure?',
                                    text: "Do you really want to delete this casino? This action cannot be undone.",
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#d33',
                                    cancelButtonColor: '#3085d6',
                                    confirmButtonText: 'Yes, delete it!',
                                    cancelButtonText: 'Cancel',
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      handleDelete(casino._id);
                                      Swal.fire(
                                        'Deleted!',
                                        'The casino has been deleted.',
                                        'success'
                                      );
                                    }
                                  });
                                }}
                                disabled={isUpdating}
                              >
                                Delete
                              </button>

                              <button
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition disabled:opacity-50"
                                onClick={() =>
                                  navigate(`/edit-casino/${casino._id}`)
                                }
                                disabled={isUpdating}
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
      </div>
    </div>
  );
};

export default CasinosAdmin;
