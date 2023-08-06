import React from "react";
import BlogCard from "./BlogCard";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { DeleteIcon, EditIcon } from "../data/Icons";
import { useAuthContext } from "../hooks/useAuthContext";
function UserBlogCard(props) {
  const { user } = useAuthContext();
  const blog = props.blog;
  const navigate = useNavigate();

  const deleteBlog = (id) => {
    axios
      .delete(`http://localhost:8082/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        console.log(`Blog Deleted Successfully`);
        navigate("/my-blogs");
        window.location.reload();
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div className="user_blog_card">
      <BlogCard blog={blog} />
      <div className="btn_grp">
        <button
          className="delete__btn"
          onClick={() => {
            deleteBlog(blog._id);
          }}
        >
          <DeleteIcon />
        </button>
        <button className="edit__btn">
          <Link to={`/edit-blog/${blog._id}`}>
            <EditIcon />
          </Link>
        </button>
      </div>
    </div>
  );
}

export default UserBlogCard;
