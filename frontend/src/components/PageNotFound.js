import React from "react";
import PageNotFoundImage from "../img/404.png";

function PageNotFound() {
  return (
    <div className="pageNotFound">
      <div className="p-404-image">
        <img src={PageNotFoundImage} alt="" />
      </div>
      <div className="p-404-text">
        <div className="p-404-head">Oops !!</div>
        <div className="p-404-content">
          <span>Page Not Found</span>
          <span>Looks like have entered a wrong URL</span>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
