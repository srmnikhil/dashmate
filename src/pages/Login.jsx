// LoginSignupPage.jsx
import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Switch,
} from "@mui/material";

const LoginSignupPage = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
    setForm({ name: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      // 1. Check context first
      if (user && user.email === form.email) {
        if (user.password === form.password) {
          navigate("/dashboard");
          return;
        } else {
          alert("Incorrect password. Please try again.");
          return;
        }
      }

      // 2. Check localStorage users
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const foundUser = users.find((u) => u.email === form.email);

      if (!foundUser) {
        alert("User not registered. Please sign up first.");
        return;
      }

      // 3. If email exists but password wrong
      if (foundUser.password !== form.password) {
        alert("Incorrect password. Please try again.");
        return;
      }

      // 4. Success — save in context
      setUser({ ...foundUser, keepLoggedIn: rememberMe });

      if (rememberMe) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ ...foundUser, keepLoggedIn: true })
        );
      } else {
        localStorage.removeItem("currentUser");
      }

      navigate("/dashboard");
    } else {
      // Signup logic
      const users = JSON.parse(localStorage.getItem("users")) || [];

      if (users.some((u) => u.email === form.email)) {
        alert("User already exists. Please login.");
        return;
      }

      const newUser = { id: Date.now(), ...form };

      // Save new user in localStorage
      localStorage.setItem("users", JSON.stringify([...users, newUser]));

      // After signup, force them to login
      alert("Registration successful. Please login with your details.");
      setIsLogin(true);
      setForm({ name: "", email: "", password: "" });
    }
  };

  return (
    <div className="flex justify-center w-full items-center min-h-screen">
      <div className="bg-white/80 backdrop-blur-lg border border-white/30 shadow-2xl rounded-xl w-[35%] min-w-[22rem] p-16">
        {/* Title */}
        <Typography
          variant="h3"
          className="text-center font-bold text-gray-800 mb-12"
        >
          {isLogin ? "Login" : "Sign Up"}
        </Typography>

        {/* Form */}
        <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
          {!isLogin && (
            <TextField
              variant="standard"
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              fullWidth
            />
          )}
          <TextField
            variant="standard"
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            variant="standard"
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            fullWidth
          />

          {isLogin && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
              label="Keep me logged in"
            />
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="rounded-lg py-2 font-semibold"
          >
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>

        {/* Switch between login/signup */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <Typography variant="body2" className="text-gray-600">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}
          </Typography>
          <Switch checked={!isLogin} onChange={handleSwitch} />
          <Typography variant="body2" className="text-gray-800 font-semibold">
            {isLogin ? "Sign Up" : "Login"}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupPage;
