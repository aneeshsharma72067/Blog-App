import React, { useEffect, useState } from "react";
import UserBlogCard from "./UserBlogCard";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import Loader from "../img/loading.gif";
import { motion } from "framer-motion";

function MyBlog() {
  useEffect(() => {
    document.title = "Hypepost • My Blogs";
  }, []);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    setLoading(true);
    if (user) {
      axios
        .get("http://localhost:8082/api/blogs/my-blogs", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setBlogs(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
  const blogList =
    blogs.length === 0 ? (
      <div className="no__blogs">You haven't made any blogs</div>
    ) : (
      blogs.map((blog, k) => <UserBlogCard blog={blog} key={k} />)
    );
  if (!user) {
    return (
      <motion.div
        className="create__blog"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <head>
          <title>Hypepost • My Blogs</title>
        </head>
        <div className="no_auth">
          <div>Start creating your own blogs by joining today !</div>
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {loading && (
        <div className="loader__img">
          <img src={Loader} alt="loading.gif" />
        </div>
      )}
      {!loading && (
        <motion.div
          className="my-blogs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bloglist__header">
            <h1>Your Blog's</h1>
          </div>
          <div className="bloglist__container">{blogList}</div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default MyBlog;
