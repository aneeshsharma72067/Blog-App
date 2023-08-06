import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useAuthContext } from "../hooks/useAuthContext";

function UserProfile() {
  const { user } = useAuthContext();
  const [error, setError] = useState();
  const [userdata, setUserdata] = useState({});
  const { id } = useParams();
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:8082/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setUserdata(res.data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  });
  useEffect(() => {
    console.log(userdata);
  });
  if (!user) {
    return;
  }
  return (
    <div>
      {error && <div className="error__msg">{error}</div>}
      <div> {userdata.username}</div>
      <div>{userdata.email}</div>
    </div>
  );
}

export default UserProfile;
