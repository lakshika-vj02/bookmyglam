import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        // Save login session
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", data.role);
        if (data.userId) {
          localStorage.setItem("userId", data.userId);
        }

        // Check whether the user came from Book Now
        if (location.state) {
          navigate("/booking", {
            state: location.state
          });
          return;
        }

        if (data.role === "admin") navigate("/admin");
        else if (data.role === "artist") navigate("/artist-dashboard");
        else navigate("/home");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      
      <div className="card p-4 shadow" style={{ width: "350px", borderRadius: "12px" }}>
        
        <h3 className="text-center mb-3">💄 BookMyGlam</h3>
        <h5 className="text-center mb-4">Login</h5>

        <input
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
  className="btn btn-primary w-100 mb-3"
  onClick={handleLogin}
  style={{
    backgroundColor: "#f472b6",
    borderColor: "#f472b6"
  }}
>
  Login
</button>

        <p className="text-center">
          Don't have an account?
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            {" "}Signup
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;