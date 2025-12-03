import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getBlogs, deleteBlog } from "../api/blogs";

const BlogsAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBlogs()
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0f1115] text-white">
      <Sidebar />

      <div className="flex-1 p-6 md:p-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-wide">Manage Blogs</h2>

          <button
            onClick={() => navigate("/create-blog")}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white 
            shadow-lg hover:shadow-green-500/20 hover:scale-105 transition-all duration-300"
          >
            + Add Blog
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-[#1a1d23] rounded-xl shadow-xl border border-white/10 overflow-hidden backdrop-blur-lg">
          <table className="w-full text-left">
            <thead className="bg-[#262b33] border-b border-white/10">
              <tr>
                <th className="p-4 text-gray-300">Title</th>
                <th className="p-4 text-gray-300">Author</th>
                <th className="p-4 text-gray-300">Date</th>
                <th className="p-4 text-gray-300">Actions</th>
              </tr>
            </thead>

            <tbody>
              {blogs.length > 0 ? (
                blogs.map((blog, i) => (
                  <tr
                    key={blog._id}
                    className={`border-b border-white/10 hover:bg-white/5 transition-all ${
                      i % 2 === 0 ? "bg-white/5" : "bg-transparent"
                    }`}
                  >
                    <td className="p-4 font-semibold text-white">{blog.title}</td>
                    <td className="p-4 text-gray-400">{blog.author}</td>
                    <td className="p-4 text-gray-400">
                      {new Date(blog.publishDate).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <button
                        className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 
                        text-white shadow-md mr-3 hover:scale-110 transition-all"
                        onClick={() => handleDelete(blog._id)}
                      >
                        Delete
                      </button>

                      <button
                        className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 
                        text-white shadow-md hover:scale-110 transition-all"
                        onClick={() => navigate(`/edit-blog/${blog._id}`)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-6 text-center text-gray-400" colSpan="4">
                    No blogs found.
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

export default BlogsAdmin;
