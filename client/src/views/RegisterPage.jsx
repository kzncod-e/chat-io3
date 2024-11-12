import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import logo from "../assets/Vector.png";

export default function Register({ socket }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();
        try {
            const body = { email, password, username };
            const { data } = await axios.post(`http://localhost:3000/register`, body);

            navigate("/login");
            Toastify({
                text: "Success Register",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#008000",
                },
                onClick: function () { }, // Callback after click
            }).showToast();
        } catch (error) {
            console.log(error);
            Toastify({
                text: error.message,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#FF0000",
                },
                onClick: function () { }, // Callback after click
            }).showToast();
        }
    }

    return (
        <div
            className="flex items-center justify-center h-screen bg-cover"
            style={{ background: "url('../src/assets/Untitled.png')" }}
        >
            <div className="flex w-3/4 max-w-4xl bg-white rounded-xl shadow-lg">
                {/* Left section - Register form */}
                <div className="w-1/2 p-10 bg-blue-500 rounded-l-xl">
                    <h2 className="text-white text-3xl font-bold mb-6">Register</h2>

                    <form onSubmit={handleRegister}>
                        <div className="mb-4">
                            <label className="block text-white mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="w-full p-3 rounded bg-white text-gray-700 focus:outline-none"
                                type="text"
                                id="name"
                                placeholder="Ishowspeed"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-white mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="w-full p-3 rounded bg-white text-gray-700 focus:outline-none"
                                type="email"
                                id="email"
                                placeholder="username@gmail.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-white mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="w-full p-3 rounded bg-white text-gray-700 focus:outline-none"
                                type="password"
                                id="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button className="w-full py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition">
                            Register
                        </button>

                        <div className="text-center text-white mt-6">
                            Already have an account?{" "}
                            <Link to="/login" className="underline">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Right section - Logo */}
                <div className="w-1/2 flex justify-center items-center bg-blue-100 rounded-r-xl">
                    <div className="text-center">
                        <img
                            src={logo}
                            alt="ChatHub Logo"
                            className="mx-auto mb-4"
                        />
                        <h1 className="text-blue-500 text-3xl font-bold">ChatHub</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};
