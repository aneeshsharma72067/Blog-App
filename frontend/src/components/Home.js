import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AddIcon } from "../data/Icons";
import BlogCard from "./BlogCard";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import RecentCards from "./RecentCards";
import Loader from "../img/loading.gif";
import { motion } from "framer-motion";

function Home() {
  useEffect(() => {
    document.title = "Hypepost • Home";
  }, []);
  const { user } = useAuthContext();
  const [greeting, setGreeting] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [recblogs, setRecblogs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    var today = new Date();
    var curHr = today.getHours();
    if (curHr < 12) {
      setGreeting("Morning");
    } else if (curHr < 17) {
      setGreeting("Afternoon");
    } else {
      setGreeting("Evening");
    }
  }, [greeting]);

  useEffect(() => {
    setLoading(true);
    if (user) {
      axios
        .get("http://localhost:8082/api/blogs/my-blogs/", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setBlogs(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);
  useEffect(() => {
    axios
      .get("http://localhost:8082/api/blogs/")
      .then((res) => {
        setRecblogs(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  });
  const blogList =
    blogs.length === 0 ? (
      user ? (
        <div className="no__blogs">You haven't made any blogs</div>
      ) : (
        <div className="no__blogs">
          Join now and start creating your own blogs
        </div>
      )
    ) : (
      blogs.map((blog, k) => <BlogCard blog={blog} key={k} />)
    );
  recblogs.reverse();
  const recentBlogList =
    recblogs.length === 0
      ? "No Blogs to Show"
      : recblogs.map((blog, k) => <RecentCards blog={blog} key={k} />);
  return (
    <motion.div id="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="left">
        <div className="home__header">
          <h1>
            Good {greeting}, {user && <span>{user.name.firstname}</span>}
            {!user && "Stranger"}
          </h1>
          <p>
            Explore all the exciting features and content we have to offer.
            Whether you're here to read captivating blogs, share your own
            experiences, connect with like-minded individuals, or participate in
            engaging discussions, we're sure you'll find something that piques
            your interest.
          </p>
          <Link to={"/create"} className="create__btn">
            <span>Create Post</span>
            <AddIcon />
          </Link>
        </div>
        {loading && (
          <div className="prev__posts">
            <div className="loader__img">
              <img src={Loader} alt="loading.gif" />
            </div>
          </div>
        )}
        {!loading && (
          <motion.div
            className="prev__posts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="prev__header">
              <h1>Your Previous Post's</h1>
            </div>
            <div className="posts__list">{blogList}</div>
          </motion.div>
        )}
      </div>
      <div className="right">
        {loading && (
          <div className="loader__img">
            <img src={Loader} alt="loading.gif" />
          </div>
        )}
        {!loading && (
          <div className="recent__blogs">
            <div className="recent__header">Recent Blogs</div>
            <div className="recent__bloglist">{recentBlogList}</div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Home;
