import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    const body = JSON.stringify({ email, password });
    setLoading(true);
    setError(null);
    axios
      .post("http://localhost:8082/api/auth/login", body, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch({ type: "LOGIN", payload: res.data });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setError(err.response.data.error);
      });
  };

  return { login, loading, error };
};
