import React, { useEffect } from "react";
import Logo from "../img/HYPEPOST.png";
import DeveloperPhoto from "../img/developer.png";
import { motion } from "framer-motion";

function About() {
  useEffect(() => {
    document.title = "Hypepost • About Us";
  }, []);
  return (
    <motion.div
      className="about__container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="site__info">
        <div className="about__site">
          <h2>About HYPEPOST</h2>
          <p>
            <span>
              HYPE<strong style={{ color: "var(--dark-color)" }}>POST</strong>
            </span>{" "}
            is a dynamic and user-friendly online platform that serves as a
            blogging community, bringing together writers and readers from
            diverse backgrounds and interests. With its modern and intuitive
            interface, Hypepost provides a seamless user experience, making it
            easy for visitors to browse, read, and engage with the content.
          </p>
        </div>
        <div className="site__logo">
          <img src={Logo} alt="hypepost.png" />
        </div>
      </div>
      <div className="developer__info">
        <div className="developer__dp">
          <img src={DeveloperPhoto} alt="developer.png" />
        </div>
        <div className="about__developer">
          <h3>About the developer</h3>
          <p>
            Hello there, I am Aneesh Sharma, a B.tech undergraduate and a self
            taught web developer. I decided to make this website as my personal
            project and for honing my skills as a developer. It’s free to use
            and I also have uploaded the source code on my GitHub. I know this
            is a small website but I would really appreciate if you could give a
            feedback about the design and the performance of the site. It could
            really help me improving this site and who knows, maybe in future it
            would be used as an actual social media platform by many people over
            the internet. Well, I can just hope :P
          </p>
          <p>Have a nice day !!</p>
        </div>
      </div>
    </motion.div>
  );
}

export default About;
