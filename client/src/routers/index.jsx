import { createBrowserRouter, redirect } from "react-router-dom";
import { io } from "socket.io-client";
import LoginPage from "../views/LoginPage";
import Register from "../views/RegisterPage";
import Home from "../views/Home";
import Toastify from "toastify-js";
import AddRoom from "../views/AddRoom";

const socket = io("http://localhost:3000", {
  autoConnect: false,
});
const url = "http://localhost:3000";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register socket={socket} />,
  },
  {
    path: "/login",
    element: <LoginPage socket={socket} />,
    loader: () => {
      if (localStorage.access_token || localStorage.username) {
        Toastify({
          text: "your alerady login",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: { background: "#008000" },
          onClick: function () {}, // Callback after click
        }).showToast();
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/",
    element: <Home socket={socket} url={url} />,
    loader: () => {
      if (!localStorage.access_token || !localStorage.username) {
        Toastify({
          text: "Login first !!",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: { background: "#008000" },
          onClick: function () {}, // Callback after click
        }).showToast();
        return redirect("/login");
      }
      return null;
    },
  },
  {
    path: "/add-room",
    element: <AddRoom socket={socket} url={url} />,
    loader: () => {
      if (!localStorage.access_token || !localStorage.username) {
        Toastify({
          text: "Login first !!",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: { background: "#008000" },
          onClick: function () {}, // Callback after click
        }).showToast();
        return redirect("/login");
      }
      return null;
    },
  },
]);

export default router;
