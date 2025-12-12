import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCasinos, deleteCasino, updateCasino } from "../api/casinos";
import Sidebar from "../components/Sidebar";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Swal from "sweetalert2";
import { FiSearch } from "react-icons/fi";

const CasinosAdmin = () => {
  const [casinos, setCasinos] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCasinos = async () => {
      try {
        const data = await getAllCasinos();
        setCasinos([...data].sort((a, b) => a.order - b.order));
      } catch {
        setError("Failed to load casinos");
      } finally {
        setLoading(false);
      }
    };
    fetchCasinos();
  }, []);

  const filteredCasinos = useMemo(() => {
    return casinos.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      String(c.rating).includes(search)
    );
  }, [casinos, search]);

  const handleDelete = async (id) => {
    try {
      await deleteCasino(id);
      setCasinos(casinos.filter((casino) => casino._id !== id));
    } catch {
      setError("Failed to delete casino");
    }
  };
  const calculateCompletion = (casino) => {
    const requiredFields = [

      casino.name,
      casino.logo,
      casino.rating,
      casino.slug,
      casino.overview,


      casino.welcomeBonus,
      casino.depositBonus,


      casino.tags?.length,
      casino.availableCountries?.length,

      casino.generalInfo?.website,
      casino.generalInfo?.languages,
      casino.generalInfo?.established,
      casino.generalInfo?.licences,
      casino.generalInfo?.affiliateProgram,
      casino.generalInfo?.companyName,
      casino.generalInfo?.casinoType?.length,
      casino.generalInfo?.features?.length,

      casino.paymentInfo?.minimumDeposit,
      casino.paymentInfo?.withdrawalMethods,
      casino.paymentInfo?.withdrawalTime,
      casino.paymentInfo?.fees,

      casino.games?.slots || casino.games?.liveCasino || casino.games?.sportsBetting,

      casino.responsibleGaming?.tools?.length,
      casino.responsibleGaming?.support,

      casino.generalDescription,
      casino.paymentDescription,
      casino.customerSupportDescription,
      casino.responsibleGamblingDescription,


      casino.editorView,
      casino.visits,
      casino.order,

    ];

    const filled = requiredFields.filter(
      (value) =>
        value !== undefined &&
        value !== null &&
        value !== 0
    ).length;

    return Math.round((filled / requiredFields.length) * 100);
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
    } catch {
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
        <div className="flex-1 flex items-center justify-center text-xl animate-pulse">
          Loading casinos...
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gradient-to-br from-[#0f1115] to-[#141824] text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 md:p-10">
        {/* TOP BAR */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h2 className="text-4xl font-bold   ">
            Manage Casinos
          </h2>

          <div className="flex gap-3">
            {/* SEARCH */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or rating..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-xl bg-[#1f2430] border border-white/10 focus:ring-2 focus:ring-green-500 outline-none text-white w-64"
              />
            </div>

            {/* ADD BUTTON */}
            <button
              onClick={() => navigate("/create-casino")}
              disabled={isUpdating}
              className={`px-5 py-2 rounded-xl bg-gradient-to-r from-green-500 to-green-700 shadow-lg transition-all hover:scale-105 hover:shadow-green-500/40 ${isUpdating ? "opacity-50" : ""
                }`}
            >
              {isUpdating ? "Updating..." : "+ Add Casino"}
            </button>
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="border rounded-2xl border-white/10 bg-[#10131a] overflow-x-auto">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="casinoList">
              {(provided) => (
                <table
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-full text-left"
                >
                  <thead className="bg-white/10 border-b text border-white/10">
                    <tr>
                      <th className="p-4 text-gray-300 w-24">Order</th>
                      <th className="p-4 text-gray-300">Logo</th>
                      <th className="p-4 text-gray-300">Name</th>
                      <th className="p-4 text-gray-300">Rating</th>
                      <th className="p-4 text-gray-300">Completion</th>
                      <th className="p-4 text-gray-300">Status</th>
                      <th className="p-4 text-gray-300">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredCasinos.map((casino, index) => (
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
                            className="border-b border-white/10 hover:bg-white/5 transition-all"
                          >
                            <td
                              {...provided.dragHandleProps}
                              className="p-4 font-semibold flex items-center gap-2 cursor-grab"
                            >
                              ☰ {index + 1}
                            </td>

                            <td className="p-4">
                              <img src={casino.logo} alt={casino.name} className="h-20 rounded-lg shadow" />
                            </td>

                            <td className="p-4 font-medium">{casino.name}</td>

                            <td className="p-4 text-yellow-400 font-semibold">
                              {casino.rating} ⭐
                            </td>
                            <td className="p-4 w-48">
                              {(() => {
                                const percent = calculateCompletion(casino);
                                return (
                                  <div className="flex flex-col gap-1">
                                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                      <div
                                        className={`h-full rounded-full transition-all ${percent >= 80
                                          ? "bg-green-500"
                                          : percent >= 50
                                            ? "bg-yellow-400"
                                            : "bg-red-500"
                                          }`}
                                        style={{ width: `${percent}%` }}
                                      />
                                    </div>
                                    <span className="text-xs text-gray-300">{percent}% Completed</span>
                                  </div>
                                );
                              })()}
                            </td>
                            <td className="p-4">
                              <label className="inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="sr-only peer"
                                  checked={casino.enabled === 1}
                                  onChange={async () => {
                                    const newStatus = casino.enabled === 1 ? 0 : 1;
                                    try {
                                      await updateCasino(casino._id, { enabled: newStatus });
                                      setCasinos((prev) =>
                                        prev.map((c) =>
                                          c._id === casino._id ? { ...c, enabled: newStatus } : c
                                        )
                                      );
                                    } catch {
                                      Swal.fire("Error", "Failed to update status", "error");
                                    }
                                  }}
                                />

                                {/* SWITCH UI */}
                                <div className="w-12 h-6 bg-gray-500 peer-checked:bg-green-500 rounded-full peer transition-colors"></div>

                                {/* CIRCLE */}
                                <div className="w-6 h-6 bg-white rounded-full shadow-md -ml-12 peer-checked:translate-x-6 transform transition-transform"></div>
                              </label>
                            </td>


                            <td className="p-4 flex gap-2">
                              <button
                                className="px-4 py-1 rounded-lg bg-red-600 hover:bg-red-700 transition"
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
                                className="px-4 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
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
