import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import Sidebar from "../components/Sidebar";
import { createBlog } from "../api/blogs.js";

const CreateBlog = () => {
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    content: "",
    publishDate: new Date().toLocaleDateString("en-CA"), 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleEditorChange = (content) => {
    setBlog({ ...blog, content });
  };

  const handleSubmit = async () => {
    try {
      await createBlog(blog);
      navigate("/blogs-admin");
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
          
          <div>
            <label className="block text-sm font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={blog.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              className="w-full p-3 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Author</label>
            <input
              type="text"
              name="author"
              value={blog.author}
              onChange={handleChange}
              placeholder="Author name"
              className="w-full p-3 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Content</label>
            <Editor
              apiKey="qmt427jjiza088glb2sjc6w1700id5wq110jxbs05c9nhuy4"
              value={blog.content}
              onEditorChange={handleEditorChange}
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

          <div>
            <label className="block text-sm font-semibold mb-1">Publish Date</label>
            <input
              type="date"
              name="publishDate"
              value={blog.publishDate}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              required
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            >
              Add Blog
            </button>
            <button
              onClick={() => navigate("/blogs-admin")}
              className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
