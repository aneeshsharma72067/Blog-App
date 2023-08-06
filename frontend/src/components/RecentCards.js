import React, { useEffect, useState } from "react";
import { UserIcon } from "../data/Icons";
import axios from "axios";
import Dateformat from "dateformat";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function RecentCards(props) {
  const { user } = useAuthContext();
  const blog = props.blog;
  const [author, setAuthor] = useState({});
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
  return (
    <div className="recent__item">
      <Link to={`/blogs/${blog._id}`} className="recent__img">
        <img src={`http://localhost:8082/${blog.imageUrl}`} alt="blog.jpeg" />
      </Link>
      <div className="recent__content">
        <Link to={`/blogs/${blog._id}`} className="recent__title">
          {blog.title}
        </Link>

        <div className="recent__details">
          <div className="recent__author">
            <div className="author__dp">
              <UserIcon />
            </div>
            <span>@{author.username}</span>
          </div>
          <div className="recent__time">
            {Dateformat(`${blog.createdAt}`, "mmmm dS")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentCards;
