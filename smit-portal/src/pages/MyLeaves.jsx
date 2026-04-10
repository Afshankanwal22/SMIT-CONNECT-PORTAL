import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { FaCalendarAlt, FaInfoCircle } from "react-icons/fa";

export default function MyLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMyLeaves = async () => {
    setLoading(true);
    const studentId = localStorage.getItem("student_id") || "123";

    const { data } = await supabase
      .from("leaves")
      .select("*")
      .eq("student_id", studentId)
      .order("id", { ascending: false });

    setLeaves(data || []);
    setLoading(false);
  };

  useEffect(() => {
    getMyLeaves();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          My Leave Requests
        </h1>
        <p className="text-gray-500 text-sm">
          Track your leave applications and status
        </p>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading your leaves...
        </div>
      ) : leaves.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <FaInfoCircle className="text-4xl text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">
            You have not applied for any leaves yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {leaves.map((l) => (
            <div
              key={l.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col justify-between"
            >
              {/* TOP */}
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  {l.reason}
                </h2>

                {/* DATE */}
                <div className="flex items-center text-gray-500 text-sm mb-2 gap-2">
                  <FaCalendarAlt />
                  <span>
                    {l.from_date} → {l.to_date}
                  </span>
                </div>
              </div>

              {/* STATUS */}
              <div className="mt-4 flex justify-between items-center">
                <span
                  className={`px-3 py-1 text-xs rounded-full font-semibold ${
                    l.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : l.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {l.status.toUpperCase()}
                </span>

                <span className="text-xs text-gray-400">
                  ID: {l.id}
                </span>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}