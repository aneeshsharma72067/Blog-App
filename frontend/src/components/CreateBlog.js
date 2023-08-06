import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import categories from "../data/categories";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function CreateBlog() {
  useEffect(() => {
    document.title = "Hypepost • Create a Blog";
  }, []);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  });
  const [error, setError] = useState(null);
  const onChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };
  const imageChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.files[0] });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("category", blog.category);
    formData.append("content", blog.content);
    formData.append("image", blog.image);
    axios
      .post("http://localhost:8082/api/blogs", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        setBlog({
          title: "",
          category: "",
          content: "",
          image: "",
        });
        navigate("/");
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };
  if (!user) {
    return (
      <motion.div
        className="create__blog"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="no_auth">
          <div>Join now and start creating a world of possibilities.</div>
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div
      className="create__blog"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="create__header">
        <h1>Create a Blog</h1>
      </div>
      <div className="create__form">
        <form onSubmit={onSubmit}>
          <div className="form__layout">
            <div className="prop__titles">
              <div>Image</div>
              <div>Title</div>
              <div>Category</div>
              <div>Content</div>
            </div>
            <div className="prop__inputs">
              <input
                type="file"
                name="image"
                placeholder="Choose an Image"
                onChange={imageChange}
              />
              <input
                type="text"
                placeholder="Enter the Blog Title"
                name="title"
                value={blog.title}
                onChange={onChange}
              />
              <select
                name="category"
                id="category"
                value={blog.category}
                onChange={onChange}
              >
                <option value="0">Select the Blog's Category</option>
                {categories.map((item) => {
                  return <option value={item}>{item}</option>;
                })}
              </select>
              <textarea
                name="content"
                id="content"
                cols="30"
                rows="10"
                placeholder="Enter the Blog's Content"
                value={blog.content}
                onChange={onChange}
              ></textarea>
            </div>
          </div>
          {error && <div className="error__msg">{error}</div>}
          <input type="submit" value="Create" className="form__submit" />
        </form>
      </div>
    </motion.div>
  );
}

export default CreateBlog;
