import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost, editPost } from "./feature/post/Postslice";
import View_post from "./components/View_post";

function App() {
  const [post, setPost] = useState({});
  const dispatch = useDispatch();
  const [editId, setEditId] = useState("");

  const handleEdit = (post) => {
    setPost(post);
    setEditId(post.id);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!post.title || !post.discription) {
      alert("Please fill in all fields.");
      return;
    }

    if (editId === "") {
      dispatch(createPost(post));
    } else {
      dispatch(editPost(post));
      setEditId("");
    }
    setPost({});
  };

  return (
    <div className="container mt-5">
      <div className="card w-50 mx-auto shadow-sm p-4 mb-5 bg-white rounded">
        <h3 className="text-center mb-4">{editId ? "Edit Post" : "Create New Post"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Enter title"
              onChange={handleInput}
              value={post.title || ""}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="discription" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              name="discription"
              placeholder="Enter description"
              rows="3"
              onChange={handleInput}
              value={post.discription || ""}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {editId ? "Update Post" : "Submit"}
          </button>
        </form>
      </div>
      <View_post handleEdit={handleEdit} />
    </div>
  );
}

export default App;
