import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css"; 

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: null,
    email: null,
    country: null,
    city: null,
    phone: null,
    password: null,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8800/api/auth/register", credentials);
      setLoading(false);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data || "Registration failed.");
    }
  };

  return (
    <div className="register">
      <div className="rContainer">
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="text"
          placeholder="Country"
          id="country"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="text"
          placeholder="City"
          id="city"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="text"
          placeholder="Phone"
          id="phone"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="rInput"
        />
        <button disabled={loading} onClick={handleClick} className="rButton">
          Register
        </button>
        {error && <span className="error">{error.message}</span>}
      </div>
    </div>
  );
};

export default Register;
