import React, { useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Vector.png";

export default function Login({socket}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const { data } = await axios.post(`http://localhost:3000/login`, { email, password });

      console.log(data);
      
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("username", data.payload.username);
      
      navigate("/");
      Toastify({
        text: "Login success",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: { background: "#008000" },
        onClick: function () {}, // Callback after click
      }).showToast();
    } catch (error) {
      console.log(error);
      Toastify({
        text: "Login failed",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: { background: "#FF0000" },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  }

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover"
      style={{ background: "url('../src/assets/Untitled.png')" }}>
      <div className="flex w-3/4 max-w-4xl bg-white rounded-2xl shadow-lg">
        {/* Left section - Login form */}
        <div className="w-1/2 p-10 bg-blue-500 rounded-l-xl">
          <h2 className="text-white text-3xl font-bold mb-6">Login</h2>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full p-3 rounded bg-white text-gray-700 focus:outline-none"
                type="text"
                id="email"
                placeholder="username@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-white mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="w-full p-3 rounded bg-white text-gray-700 focus:outline-none"
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="w-full py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition">
              Sign in
            </button>

            <div className="text-center text-white mt-4">or continue with</div>

            <div className="flex justify-center space-x-4 mt-4">
              <button className="p-3 bg-white rounded-full">
                <img
                  src="https://img.icons8.com/color/48/000000/google-logo.png"
                  alt="Google"
                  className="h-6"
                />
              </button>
              <button className="p-3 bg-white rounded-full">
                <img
                  src="https://img.icons8.com/ios-glyphs/30/000000/github.png"
                  alt="Github"
                  className="h-6"
                />
              </button>
              <button className="p-3 bg-white rounded-full">
                <img
                  src="https://img.icons8.com/color/48/000000/facebook-new.png"
                  alt="Facebook"
                  className="h-6"
                />
              </button>
            </div>

            <div className="text-center text-white mt-6">
              Don't have an account yet?{" "}
              <a href="/register" className="underline">
                Register for free
              </a>
            </div>
          </form>
        </div>

        {/* Right section - Logo */}
        <div className="w-1/2 flex justify-center items-center bg-blue-100 rounded-r-xl">
          <div className="text-center">
            <img src={logo} alt="ChatHub Logo" className="mx-auto mb-4" />
            <h1 className="text-blue-500 text-3xl font-bold">ChatHub</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
