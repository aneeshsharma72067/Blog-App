import React, { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  useEffect(() => {
    document.title = "Hypepost • Login";
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, loading } = useLogin();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  if (user) {
    console.log(user);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    if (user) {
      navigate("/");
    }
  };
  return (
    <div className="auth__container login">
      <head>
        <title>Hypepost • Login</title>
      </head>
      <div className="signup__header">
        <div className="circle__animate">
          <div>
            <div></div>
          </div>
        </div>
        <h1>Login</h1>
      </div>
      <div className="signup__text">
        <p>Welcome back! Log in now to continue your journey with us.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={loading} type="submit" className="singup__submit">
          <p>Login</p>
        </button>
        {error && <div className="error__msg">{error}</div>}
      </form>
    </div>
  );
}

export default Login;
