import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, name, username, password) => {
    const body = JSON.stringify({ email, name, username, password });
    setLoading(true);
    setError(null);
    axios
      .post("http://localhost:8082/api/auth/signup", body, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch({ type: "LOGIN", payload: res.data });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.error);
      });
  };

  return { signup, loading, error };
};
