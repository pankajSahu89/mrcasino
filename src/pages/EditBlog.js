import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogById, updateBlog } from "../api/blogs";
import { uploadImage } from "../api/upload";
import Sidebar from "../components/Sidebar";
import { Editor } from "@tinymce/tinymce-react";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    content: "",
    publishDate: new Date().toISOString().split("T")[0],
    thumbnail: "",
    tags: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        setBlog({
          ...data,
          publishDate: data.publishDate
            ? new Date(data.publishDate).toISOString().split("T")[0]
            : "",
        });
      } catch (err) {
        setError(err.message || "Failed to load blog");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    try {
      setLoading(true);
      const file = e.target.files[0];
      const { url } = await uploadImage(file);
      setBlog((prev) => ({ ...prev, thumbnail: url }));
    } catch (err) {
      setError(err.message || "Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !blog.tags.includes(newTag.trim())) {
      setBlog((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setBlog((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateBlog(id, blog);
      navigate("/blogs-admin");
    } catch (err) {
      setError(err.message || "Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !blog.title) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="text-center">Loading blog data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="text-red-500 text-center">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">Edit Blog</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              className="w-full p-2 border rounded"
              value={blog.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Author</label>
            <input
              type="text"
              name="author"
              className="w-full p-2 border rounded"
              value={blog.author}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Content</label>
            <Editor
              apiKey="qmt427jjiza088glb2sjc6w1700id5wq110jxbs05c9nhuy4"
              value={blog.content}
              onChange={handleChange}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist outdent indent | removeformat | help",
              }}
            />
          </div>

         

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border rounded"
            />
            {blog.thumbnail && (
              <img src={blog.thumbnail} alt="Preview" className="h-20 mt-2" />
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Publish Date
            </label>
            <input
              type="date"
              name="publishDate"
              className="w-full p-2 border rounded"
              value={blog.publishDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Tags</label>
            <div className="flex mb-2">
              <input
                type="text"
                className="flex-1 p-2 border rounded-l"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add new tag"
              />
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition"
                onClick={handleAddTag}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <div
                  key={tag}
                  className="bg-gray-200 px-3 py-1 rounded-full flex items-center"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Blog"}
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              onClick={() => navigate("/blogs-admin")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
