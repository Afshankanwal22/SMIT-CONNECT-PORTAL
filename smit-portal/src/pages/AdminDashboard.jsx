import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Sidebar from "../components/Sidebar";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    leaves: 0,
  });

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

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 p-6">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h1>

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