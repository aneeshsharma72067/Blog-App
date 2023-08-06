import React, { useEffect, useState } from "react";
import categories from "../data/categories";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { BanIcon } from "../data/Icons";
import jwtDecode from "jwt-decode";

function EditBlog(props) {
  const { user } = useAuthContext();
  const [blog, setBlog] = useState({
    title: "",
    category: "",
    content: "",
    user_id: "",
  });
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:8082/api/blogs/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setBlog({
            title: res.data.title,
            category: res.data.category,
            content: res.data.content,
            user_id: res.data.user_id,
          });
        })
        .catch((err) => {
          setError(err.response.data.error);
        });
      const decoded = jwtDecode(user.token)._id;
      setUserId(decoded);
    }
  }, [id, user]);

  const onChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: blog.title,
      category: blog.category,
      content: blog.content,
    };
    axios
      .put(`http://localhost:8082/api/blogs/${id}`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        navigate(`/blogs/${id}`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  if (!user || userId !== blog.user_id) {
    return (
      <div className="edit__blog">
        <div className="no_auth">
          <BanIcon />
          <div>You are not authorized to view this page</div>
        </div>
      </div>
    );
  }
  return (
    <div className="create__blog">
      <div className="create__header">
        <h1>Edit Blog</h1>
      </div>
      <div className="create__form">
        <form onSubmit={onSubmit}>
          <div className="form__layout">
            <div className="prop__titles">
              <div>Title</div>
              <div>Category</div>
              <div>Content</div>
            </div>
            <div className="prop__inputs">
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
          <input type="submit" value="Edit" className="form__submit" />
        </form>
      </div>
    </div>
  );
}

export default EditBlog;
