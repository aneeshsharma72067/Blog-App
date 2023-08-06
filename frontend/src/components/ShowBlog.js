import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DeleteIcon, EditIcon, UserIcon } from "../data/Icons";
import Dateformat from "dateformat";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import jwtDecode from "jwt-decode";
import Loader from "../img/loading.gif";
import { motion } from "framer-motion";

function ShowBlog(params) {
  useEffect(() => {
    document.title = `Hypepost • Blog`;
  });
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState({});
  const [userId, setUserId] = useState(null);
  const [readingtime, setReadingtime] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8082/api/blogs/blog/${id}`)
      .then((res) => {
        setError(null);
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Something went wrong");
        console.log(err);
      });
    if (!loading && error) {
      navigate(`/blogs/${id}`);
    }
  }, [error, loading, navigate, id]); //
  function removeItem(array, item) {
    return array.filter((i) => i !== item);
  }
  useEffect(() => {
    if (blog.content) {
      const content = JSON.stringify(blog.content).split(/[.,!,?,' ']/);
      const wordArray = removeItem(content, "");
      const readtime = wordArray.length / 200;
      if (readtime < 1) {
        setReadingtime(
          (`${readtime * 60}`.length > 2
            ? `${readtime * 60}`.slice(0, 2)
            : `${readtime * 60}`) + "sec"
        );
      } else {
        setReadingtime(`${Math.floor(readtime)} min`);
      }
    }
  }, [blog.content]);
  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/users/${blog.user_id}`)
      .then((res) => {
        setError(null);
        setLoading(false);
        setAuthor(res.data);
      })
      .catch((err) => {
        setError("Something went wrong");
      });
    if (user) {
      const decoded = jwtDecode(user.token)._id;
      setUserId(decoded);
    }
  }, [blog, user]);
  const deleteBlog = (id) => {
    axios
      .delete(`http://localhost:8082/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        window.location.reload();
        navigate("/my-blogs");
      })
      .catch((err) => {
        setError("Something went wrong");
        console.log(err.message);
      });
  };
  return (
    <>
      {error && <div className="error__msg">{error}</div>}
      {!blog.title && (
        <div className="loader__img">
          <img src={Loader} alt="loading.gif" />
        </div>
      )}
      (
      <motion.div
        className="blog__container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="blog__title_1">
          <h1>{blog.title}</h1>
        </div>
        <div className="blog__details_1">
          <div className="blog__author">
            <div className="author__dp">
              <UserIcon />
            </div>
            <div className="author__name">
              <div className="author__username">@{author.username}</div>
            </div>
          </div>
          <div className="blog__info">
            <div className="blog__category">
              <div className="category">{blog.category}</div>
            </div>
            <div className="blog__datetime">
              <div className="blog__date">
                {Dateformat(blog.createAt, "mmmm dS")}
              </div>
              <div className="read__time">{readingtime}</div>
            </div>
          </div>
        </div>
        {userId === blog.user_id && (
          <div className="blog__options">
            <button
              className="delete__btn"
              onClick={() => {
                deleteBlog(id);
              }}
            >
              <span>Delete</span>
              <DeleteIcon />
            </button>
            <Link to={`/edit-blog/${id}`} className="edit__btn">
              <span>Edit</span>
              <EditIcon />
            </Link>
          </div>
        )}
        <div className="blog__img">
          <img src={`http://localhost:8082/${blog.imageUrl}`} alt="blog.jpeg" />
        </div>
        <div className="blog__content">{blog.content}</div>
      </motion.div>
      )
    </>
  );
}

export default ShowBlog;
