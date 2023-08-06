import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { AddIcon } from "../data/Icons";

function CustomLink({ href, title }) {
  const router = useLocation();
  if (title === "Create") {
    return (
      <Link
        to={href}
        className={`${
          router.pathname === href ? "active__link" : ""
        } create__btn link`}
      >
        <span>{title}</span>
        <AddIcon />
      </Link>
    );
  }
  return (
    <Link
      to={href}
      className={`${router.pathname === href ? "active__link" : ""} link`}
    >
      {title}
    </Link>
  );
}

export default CustomLink;
