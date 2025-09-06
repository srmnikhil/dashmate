import { useNavigate } from "react-router-dom";
import {
  FaLinkedin,
  FaGithub,
  FaChartBar,
  FaPalette,
  FaBolt,
} from "react-icons/fa";
import { MdEmail, MdNotificationsActive, MdDevices } from "react-icons/md";
import { FiUser } from "react-icons/fi";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full py-8 px-4 sm:px-12">
      {/* Title */}
      <h1 className="font-extrabold text-3xl sm:text-5xl text-gray-800 leading-tight text-center">
        About{" "}
        <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          DashMate
        </span>
      </h1>

      {/* Description */}
      <p className="mt-6 text-base sm:text-xl text-gray-600 max-w-3xl text-center italic">
        DashMate is not just a dashboard — it’s your personal control center for
        tracking data, analyzing insights, and managing workflows with style and
        simplicity. Built to be fast, modern, and highly customizable, it’s
        perfect for both learners and professionals who want clarity at a
        glance.
      </p>

      {/* Features */}
      <div className="mt-10 max-w-3xl w-full text-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ✨ Key Features
        </h2>
        <ul className="space-y-3">
          <li className="flex items-center gap-2">
            <FaChartBar className="text-indigo-600" /> Interactive charts with
            tooltips and legends
          </li>
          <li className="flex items-center gap-2">
            <FiUser className="text-indigo-600" /> User profile management with
            a clean UI
          </li>
          <li className="flex items-center gap-2">
            <MdNotificationsActive className="text-indigo-600" /> Notification
            dropdown with real-time updates
          </li>
          <li className="flex items-center gap-2">
            <MdDevices className="text-indigo-600" /> Fully responsive across
            mobile, tablet, and desktop
          </li>
          <li className="flex items-center gap-2">
            <FaPalette className="text-indigo-600" /> Modern design using React,
            Tailwind CSS & Material UI
          </li>
          <li className="flex items-center gap-2">
            <FaBolt className="text-indigo-600" /> Lightweight, fast, and easy
            to extend
          </li>
        </ul>
      </div>

      {/* About Developer */}
      <div className="mt-12 max-w-3xl w-full text-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <img src="/developer.svg" alt="Developer Icon" className="w-8 h-8" />
          About the Developer
        </h2>
        <p className="mb-4">
          Hi, I’m{" "}
          <span className="font-semibold text-indigo-600">Nikhil Sharma</span>,
          an aspiring software engineer passionate about building modern web
          applications with the MERN stack and beyond. DashMate is a project I
          built to strengthen my foundation in JavaScript, React, and full-stack
          development while experimenting with clean, responsive UI design.
        </p>

        <ul className="space-y-3">
          <li className="flex items-center gap-2">
            <FaLinkedin className="text-indigo-600" />
            <a
              href="https://linkedin.com/in/srmnikhil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              linkedin.com/in/srmnikhil
            </a>
          </li>
          <li className="flex items-center gap-2">
            <FaGithub className="text-gray-800" />
            <a
              href="https://github.com/srmnikhil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              github.com/srmnikhil
            </a>
          </li>
          <li className="flex items-center gap-2">
            <MdEmail className="text-red-500" />
            <a
              href="mailto:srmnikhilswn@gmail.com"
              className="text-indigo-600 hover:underline"
            >
              srmnikhilswn@gmail.com
            </a>
          </li>
          <li className="flex items-center gap-2">
            <FaGithub className="text-gray-800" />
            <a
              href="https://github.com/srmnikhil/dashmate"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              github.com/srmnikhil/dashmate
            </a>
          </li>
        </ul>
      </div>

      {/* Back Button */}
      <div className="mt-12">
        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 text-lg rounded-lg hover:cursor-pointer shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-white"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
