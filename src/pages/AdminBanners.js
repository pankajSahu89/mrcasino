import React, { useEffect, useState } from "react";
import { getBanners, createBanner, deleteBanner } from "../api/bannerApi";
import Sidebar from "../components/Sidebar";

const AdminBanners = () => {
  const [banners, setBanners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBanners = async () => {
    try {
      const res = await getBanners();
      setBanners(res.data.data || []);
    } catch (err) {
      console.error("Fetch banners failed", err);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !redirectUrl || !image) return alert("All fields required");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("redirectUrl", redirectUrl);
    formData.append("image", image);

    try {
      setLoading(true);
      await createBanner(formData);
      resetForm();
      fetchBanners();
    } catch {
      alert("Failed to create banner");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this banner?")) return;
    await deleteBanner(id);
    fetchBanners();
  };

  const resetForm = () => {
    setShowModal(false);
    setTitle("");
    setRedirectUrl("");
    setImage(null);
    setPreview(null);
  };

  return (
    <div className="flex min-h-screen bg-[#0f1115] text-white">
      <Sidebar />

      <div className="flex-1 px-8 py-10">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Banner Management</h1>
              <p className="text-gray-400 text-sm">
                Manage homepage promotional banners
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-lg font-semibold shadow"
            >
              + New Banner
            </button>
          </div>

          {/* TABLE */}
          <div className="bg-[#111] rounded-xl overflow-hidden shadow">
            <table className="w-full text-left">
              <thead className="bg-[#1a1a1a] text-gray-400 text-sm">
                <tr>
                  <th className="p-4">Preview</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Redirect</th>
                  <th className="p-4">Created</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((b) => (
                  <tr
                    key={b._id}
                    className="border-b border-gray-800 hover:bg-[#1c1c1c]"
                  >
                    <td className="p-4">
                      <img
                        src={b.image}
                        alt={b.title}
                        className="h-12 w-24 object-cover rounded-md"
                      />
                    </td>
                    <td className="p-4 font-medium">{b.title}</td>
                    <td className="p-4 text-blue-400 text-sm max-w-xs truncate">
                      <a href={b.redirectUrl} target="_blank" rel="noreferrer">
                        {b.redirectUrl}
                      </a>
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                      {new Date(b.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(b._id)}
                        className="text-red-500 hover:text-red-600 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {banners.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="p-10 text-center text-gray-500"
                    >
                      No banners created yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="bg-[#111] rounded-xl w-full max-w-lg p-6 relative shadow-xl">
            <button
              onClick={resetForm}
              className="absolute top-3 right-3 text-xl text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-1">Create Banner</h2>
            <p className="text-sm text-gray-400 mb-5">
              Upload a banner image and redirect URL
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Banner Title"
                className="w-full p-3 bg-black border border-gray-700 rounded focus:ring-2 focus:ring-blue-600"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type="url"
                placeholder="Redirect URL"
                className="w-full p-3 bg-black border border-gray-700 rounded focus:ring-2 focus:ring-blue-600"
                value={redirectUrl}
                onChange={(e) => setRedirectUrl(e.target.value)}
              />

              <div className="border border-dashed border-gray-600 p-4 rounded text-center">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="bannerUpload"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setPreview(URL.createObjectURL(e.target.files[0]));
                  }}
                />
                <label
                  htmlFor="bannerUpload"
                  className="cursor-pointer text-blue-400"
                >
                  Click to upload image
                </label>

                {preview && (
                  <img
                    src={preview}
                    alt="preview"
                    className="mt-4 h-32 mx-auto rounded-lg object-cover"
                  />
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold"
              >
                {loading ? "Uploading..." : "Create Banner"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBanners;
