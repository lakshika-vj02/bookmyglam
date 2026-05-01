import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("user");

  const handleSignup = async () => {
    if (!name || !email || !password || !gender || !phone) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          gender,
          phone_no: phone,
          role,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Signup Successful");
        navigate("/");
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
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">💄 BookMyGlam</h3>
        <h5 className="text-center mb-4">Signup</h5>

        <input
          className="form-control mb-3"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Phone Number"
          onChange={(e) => setPhone(e.target.value)}
        />

        <select
          className="form-control mb-3"
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select
          className="form-control mb-3"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="artist">Artist</option>
          <option value="admin">Admin</option>
        </select>

        <button
          className="btn btn-success w-100 mb-3"
          onClick={handleSignup}
        >
          Signup
        </button>

        <p className="text-center">
          Already have an account?
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            {" "}Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;