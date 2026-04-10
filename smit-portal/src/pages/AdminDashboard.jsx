import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    leaves: 0,
  });

  // FETCH STATS
  const fetchStats = async () => {
    const { data: s } = await supabase.from("students").select("*");
    const { data: c } = await supabase.from("courses").select("*");
    const { data: l } = await supabase.from("leaves").select("*");

    setStats({
      students: s?.length || 0,
      courses: c?.length || 0,
      leaves: l?.length || 0,
    });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // 🔥 LOGOUT FUNCTION
  const handleLogout = async () => {
    const confirm = await Swal.fire({
      title: "Logout?",
      text: "You will be signed out from admin panel",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Logout",
    });

    if (!confirm.isConfirmed) return;

    // Supabase logout (important)
    await supabase.auth.signOut();

    // Local storage clear
    localStorage.removeItem("admin");

    Swal.fire("Logged Out", "You have been logged out", "success");

    // Redirect to login
    navigate("/AdminLogin");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Logout
          </button>

        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
            <h2 className="text-gray-500">Students</h2>
            <p className="text-3xl font-bold text-blue-600">
              {stats.students}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
            <h2 className="text-gray-500">Courses</h2>
            <p className="text-3xl font-bold text-green-600">
              {stats.courses}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
            <h2 className="text-gray-500">Leave Requests</h2>
            <p className="text-3xl font-bold text-red-600">
              {stats.leaves}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}