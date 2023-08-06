import React, { useEffect, useState } from "react";
import { UserIcon } from "../data/Icons";
import Dateformat from "dateformat";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

function BlogCard(props) {
  const { user } = useAuthContext();
  const [author, setAuthor] = useState({});
  const [readingtime, setReadingtime] = useState(null);
  const blog = props.blog;
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:8082/api/users/${blog.user_id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setAuthor(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
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
  return (
    <div className="blog__item">
      <Link to={`/blogs/${blog._id}`} className="blog__image">
        <img src={`http://localhost:8082/${blog.imageUrl}`} alt="blog.jpeg" />
      </Link>
      <div className="blog__content">
        <Link to={`/blogs/${blog._id}`} className="blog__title">
          {blog.title}
        </Link>
        <Link to={`/blogs/${blog._id}`} className="blog__description">
          {blog.content}
        </Link>
        <div className="blog__details">
          <div className="blog__creator">
            <div className="creator__dp">
              <UserIcon />
            </div>
            <div className="creator__name">@{author.username}</div>
          </div>
          <div className="blog__date">
            {Dateformat(`${blog.createdAt}`, "mmmm dS")}
          </div>
          <div className="read__time">{readingtime}</div>
          <div className="category">{blog.category}</div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
