import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("Location State:", location.state);

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
      console.log("Backend Response:", data);
      console.log("Role from Backend:", data.role);
      if (data.success) {
        // Save login session
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", data.role);
        if (data.userId) {
          localStorage.setItem("userId", data.userId);
        }
         console.log("Login Success");
  console.log("Full Location:", location);
  console.log("Location State:", location.state);

        // Check whether the user came from Book Now
        if (location.state) {
          console.log("Going back to Booking");
          navigate("/booking", {
            state: location.state
          });
          return;
        }
 console.log("No location.state found");

        if (data.role === "admin") navigate("/admin");
        else if (data.role === "artist") navigate("/artist-dashboard");
        else navigate("/");
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
            onClick={() => navigate("/signup", { state: location.state })}
          >
            {" "}Signup
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;