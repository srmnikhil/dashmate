import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { Player } from "@lottiefiles/react-lottie-player";
import logo from "../assets/logo.json";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4">
      <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-16 mt-12">
        {/* Left: Text content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-lg">
          <h1 className="font-extrabold text-3xl sm:text-5xl text-gray-800 leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              DashMate
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-xl italic text-gray-400 max-w-sm sm:max-w-2xl px-2 text-justify">
            DashMate is a sleek, modern dashboard web app that makes managing
            your data effortless. Track user activity, monitor new signups, and
            visualize insights in real-time with interactive charts and
            responsive cards. Built with ❤️ using React, Tailwind CSS, and
            Material UI, it’s designed to be intuitive, fast, and visually
            stunning.
          </p>

          <div className="mt-5 flex sm:flex-row gap-4">
            <Button
              onClick={() => navigate("/login")}
              label="Get Started"
              className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 text-base sm:px-8 sm:py-3 sm:text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            />
            <Button
              onClick={() => navigate("/about")}
              label="About"
              className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 text-base sm:px-8 sm:py-3 sm:text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            />
          </div>
        </div>

        {/* Right: Lottie Animation */}
        <div className="w-100 sm:w-140 md:w-180">
          <Player
            autoplay
            loop
            src={logo}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>

      <p className="mt-12 text-sm text-gray-400">
        Built with ❤️ using React + Tailwind
      </p>
    </div>
  );
}
