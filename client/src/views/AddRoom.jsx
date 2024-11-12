import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
export default function AddRoom({ url }) {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  function handleBack() {
    navigate("/");
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${url}/rooms`,
        { name: roomName, imageUrl: imageUrl },
        { headers: { Authorization: `Bearer ${localStorage.access_token}` } }
      );
      console.log(data, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
      navigate("/");
      setRoomName("");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="relative">
        {/* Background layers */}
        <div className="absolute -bottom-4 -right-4 w-full h-full bg-[#f8d3b9] rounded-lg"></div>
        <div className="absolute -bottom-2 -right-2 w-full h-full bg-[#fae7cc] rounded-lg"></div>

        {/* Main form */}
        <form
          className="relative bg-[#fff7d6] p-8 rounded-lg shadow-md w-80"
          onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full bg-transparent border-b-2 border-gray-400 focus:border-gray-600 outline-none pb-1"
              onChange={(e) => setRoomName(e.target.value)}
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1">
              isert the img
            </label>
            <input
              type="text"
              id="phone"
              className="w-full bg-transparent border-b-2 border-gray-400 focus:border-gray-600 outline-none pb-1"
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#f8a27d] text-white py-2 px-4 rounded hover:bg-[#f7956c] transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#f7956c] focus:ring-opacity-50">
            add new room
          </button>
        </form>

        {/* Decorative pencil */}
        <div className="absolute -bottom-8 left-4 w-16 h-2 bg-[#fae7cc] transform rotate-45"></div>
        <div className="absolute -bottom-8 left-4 w-2 h-2 bg-[#f8d3b9] rounded-full transform -translate-x-1/2"></div>
      </div>
    </div>
  );
}
