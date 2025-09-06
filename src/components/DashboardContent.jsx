import { useEffect, useState } from "react";
import { Typography, Card, CardContent, LinearProgress } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4f46e5", "#9333ea"];

export default function DashboardContent() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, newSignups: 0 });
  const [barData, setBarData] = useState([]);
  const [loading, setLoading] = useState(false); // track loading

  const fetchUsers = async () => {
    setLoading(true); // start progress bar
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();

      // simulate 50–100 users
      const totalUsers = 50 + Math.floor(Math.random() * 51);
      const activeUsers = Math.floor(Math.random() * totalUsers);
      const newSignups = Math.floor(Math.random() * 10);

      // generate last 7 days signup data
      const bar = Array.from({ length: 7 }, (_, i) => ({
        day: `Day ${i + 1}`,
        signups: Math.floor(Math.random() * 5),
      }));

      setUsers(data);
      setStats({ total: totalUsers, active: activeUsers, newSignups });
      setBarData(bar);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false); // end progress bar
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Progress bar */}
      {loading && <LinearProgress color="secondary" />}

      {/* Refresh button */}
      <div className="flex justify-end">
        <button
          onClick={fetchUsers}
          className="
      bg-gradient-to-r from-purple-600 to-indigo-500 
      text-white font-semibold px-5 py-2 rounded-lg 
      shadow hover:from-purple-700 hover:to-indigo-600 
      transition-colors duration-300 hover:cursor-pointer
    "
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4 bg-white shadow rounded">
          <CardContent>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">{stats.total}</Typography>
          </CardContent>
        </Card>

        <Card className="p-4 bg-white shadow rounded">
          <CardContent>
            <Typography variant="h6">Active Users</Typography>
            <Typography variant="h4">{stats.active}</Typography>
          </CardContent>
        </Card>

        <Card className="p-4 bg-white shadow rounded">
          <CardContent>
            <Typography variant="h6">New Signups Today</Typography>
            <Typography variant="h4">{stats.newSignups}</Typography>
          </CardContent>
        </Card>

        {/* Circular chart */}
        <Card className="p-4 bg-white shadow rounded md:col-span-1">
          <CardContent>
            <Typography variant="h6" className="mb-4">
              Active / Total Users
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Active Users", value: stats.active },
                    {
                      name: "Inactive Users",
                      value: stats.total - stats.active,
                    },
                  ]}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell key="active" fill={COLORS[0]} />
                  <Cell key="inactive" fill={COLORS[1]} />
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
              </PieChart>
            </ResponsiveContainer>

            {/* Custom Legend */}
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-purple-700 rounded-sm"></div>
                <Typography variant="body2">Active Users</Typography>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-purple-400 rounded-sm"></div>
                <Typography variant="body2">Inactive Users</Typography>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bar chart */}
        <Card className="p-4 bg-white shadow rounded md:col-span-2">
          <CardContent>
            <Typography variant="h6" className="mb-4">
              New Signups Last 7 Days
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="signups" fill="#9333ea" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
