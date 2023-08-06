import React, { useEffect, useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router";

function Signup() {
  useEffect(() => {
    document.title = "Hypepost • Signup";
  }, []);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState({
    firstname: "",
    lastname: "",
  });
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const onChange = (e) => {
    setName({ ...name, [e.target.name]: e.target.value });
  };
  const { signup, loading, error } = useSignup();

  const handleSumbit = async (e) => {
    e.preventDefault();
    signup(email, name, username, password);
    if (user) {
      navigate("/");
    }
  };
  return (
    <div className="auth__container">
      <div className="signup__header">
        <div className="circle__animate">
          <div>
            <div></div>
          </div>
        </div>
        <h1>Register</h1>
      </div>
      <div className="signup__text">
        <p>
          Stay informed, inspired, and entertained. Register today and join our
          vibrant community of passionate readers.
        </p>
      </div>
      <form onSubmit={handleSumbit}>
        <div>
          <input
            type="text"
            name="firstname"
            placeholder="Firstname"
            onChange={onChange}
          />
          <input
            type="text"
            name="lastname"
            placeholder="Lastname"
            onChange={onChange}
          />
        </div>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
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
          <p>Submit</p>
        </button>
        {error && <div className="error__msg">{error}</div>}
      </form>
    </div>
  );
}

export default Signup;
