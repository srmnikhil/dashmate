// Profile.jsx
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Typography, TextField } from "@mui/material";

export default function Profile() {
  const { user } = useContext(UserContext) || {};

  // Fallback to localStorage if context is empty
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));
  const profile = user || storedUser || {};

  return (
    <div className="flex justify-center items-center mt-10 w-full">
      <div className="bg-white/70 backdrop-blur-md border border-white/30 shadow-xl rounded-xl p-10 w-[90%] sm:w-[60%] md:w-[40%]">
        {/* Heading */}
        <Typography
          variant="h5"
          className="text-center font-bold mb-6 relative pb-2"
        >
          Your Profile
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-1/2 h-0.5 bg-purple-500"></span>
        </Typography>

        {/* Fields */}
        <div className="flex flex-col gap-5">
          <TextField
            label="Name"
            value={profile?.name || ""}
            variant="standard"
            disabled
            fullWidth
          />
          <TextField
            label="Email"
            value={profile?.email || ""}
            variant="standard"
            disabled
            fullWidth
          />
          <TextField
            label="Mobile Number"
            value={profile?.mobile || ""}
            variant="standard"
            disabled
            fullWidth
          />
          <TextField
            label="Country"
            value={profile?.country || "India"}
            variant="standard"
            disabled
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}
