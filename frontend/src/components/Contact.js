import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "../data/Icons";

function Contact() {
  useEffect(() => {
    document.title = "Hypepost • My Blogs";
  }, []);
  const [email, setEmail] = useState("");
  const [bug, setBug] = useState("");
  const [loading, setLoading] = useState(null);
  return (
    <motion.div
      className="contact__container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bug__report">
        <h2>Report a Bug</h2>
        <form>
          <div>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              rows={10}
              value={bug}
              placeholder="Enter the details about the bug"
              onChange={(e) => setBug(e.target.value)}
            />
          </div>
          <input disabled={loading} type="submit" value="Submit" />
        </form>
      </div>
      <div className="contact__links">
        <h2>Contact Me</h2>
        <div className="links__container">
          <Link to={"https://github.com/aneesh1024"} target="_blank">
            <GithubIcon />
          </Link>
          <Link to={"https://www.instagram.com/aneesh72067/"} target="_blank">
            <InstagramIcon />
          </Link>
          <Link
            to={"https://www.linkedin.com/in/aneesh-sharma-as72067"}
            target="_blank"
          >
            <LinkedinIcon />
          </Link>
          <Link
            to={"https://api.whatsapp.com/send?phone=7206734591"}
            target="_blank"
          >
            <WhatsappIcon />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default Contact;
