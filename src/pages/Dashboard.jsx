import { useState, useEffect, useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  CssBaseline,
  useMediaQuery,
  InputBase,
  Badge,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate, Routes, Route } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";

import Profile from "../components/Profile";
import { UserContext } from "../context/UserContext";
import DashboardContent from "../components/DashboardContent";

const sidebarWidth = 240;

export default function ResponsiveDashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchor, setNotifAnchor] = useState(null);

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const handleDrawerToggle = () => setSidebarOpen(!sidebarOpen);
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleNotifMenu = (event) => setNotifAnchor(event.currentTarget);
  const handleNotifClose = () => setNotifAnchor(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const sidebarLinks = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      action: () => navigate("/dashboard"),
    },
    {
      text: "My Profile",
      icon: <PersonIcon />,
      action: () => navigate("/dashboard/profile"),
    },
    {
      text: "Settings",
      icon: <SettingsIcon />,
      action: () => alert("Settings clicked"), // placeholder
    },
    {
      text: "Logout",
      icon: <ExitToAppIcon />,
      action: handleLogout,
    },
  ];

  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      <CssBaseline />

      {/* Sidebar */}
      <div
        className={`bg-black text-white transition-all duration-500 flex-shrink-0`}
        style={{ width: sidebarOpen ? sidebarWidth : 0 }}
      >
        <div
          className="p-4 font-bold text-3xl cursor-pointer flex items-center gap-3"
          onClick={() => navigate("/dashboard")}
        >
          <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
          DashMate
        </div>
        <nav className="flex flex-col ml-3 mt-3">
          {sidebarLinks.map(({ text, icon, action }) => (
            <div
              key={text}
              className="px-6 py-3 flex gap-3 hover:bg-white/30 cursor-pointer transition"
              onClick={action}
            >
              {icon}
              <span>{text}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Right Section */}
      <div className="flex flex-col flex-1 transition-all duration-500">
        {/* AppBar */}
        <AppBar
          position="static"
          sx={{ background: "linear-gradient(to right, #4f46e5, #9333ea)" }}
        >
          <Toolbar className="gap-4">
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
            {!sidebarOpen && (
              <div
                className="absolute left-16 flex items-center gap-2 cursor-pointer"
                onClick={() => navigate("/dashboard")}
              >
                <img src="/logo.svg" alt="Logo" className="w-6 h-6" />
                <Typography
                  variant="h5"
                  color="inherit"
                  style={{ fontWeight: "bold" }}
                >
                  DashMate
                </Typography>
              </div>
            )}

            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {/* Can keep empty or optional text */}
            </Typography>

            {!isMobile && (
              <div className="relative bg-white/20 rounded-lg px-3 py-1 flex items-center">
                <SearchIcon className="text-white mr-2" />
                <InputBase
                  placeholder="Search..."
                  className="w-40"
                  sx={{
                    color: "white",
                    "& input::placeholder": { color: "white", opacity: 0.8 },
                  }}
                />
              </div>
            )}

            <IconButton color="inherit" onClick={handleNotifMenu}>
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={notifAnchor}
              open={Boolean(notifAnchor)}
              onClose={handleNotifClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleNotifClose}>
                🔔 New comment on your post
              </MenuItem>
              <MenuItem onClick={handleNotifClose}>
                📊 Your analytics report is ready
              </MenuItem>
              <MenuItem onClick={handleNotifClose}>
                ⚡ System update completed
              </MenuItem>
            </Menu>

            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/dashboard/profile");
                }}
              >
                My Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleLogout();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Main Dashboard Content with Nested Routes */}
        <main className="p-6 flex-1 bg-gray-50 flex flex-col">
          <Routes>
            <Route path="*" element={<DashboardContent />} />
            <Route path="profile" element={<Profile />} />
          </Routes>

          <div className="mt-8 flex justify-center text-gray-500">
            Made with ❤️ by React + Tailwind CSS + MUI
          </div>
        </main>
      </div>
    </div>
  );
}
