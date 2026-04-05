// MyLeaves.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function MyLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMyLeaves = async () => {
    setLoading(true);
    // Replace "123" with dynamic student_id from auth/localStorage
    const studentId = localStorage.getItem("student_id") || "123";
    const { data, error } = await supabase
      .from("leaves")
      .select("*")
      .eq("student_id", studentId)
      .order("id", { ascending: false });
    if (!error) setLeaves(data);
    setLoading(false);
  };

  useEffect(() => {
    getMyLeaves();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Leave Requests</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : leaves.length === 0 ? (
        <p className="text-gray-500">You have not applied for any leaves yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leaves.map((l) => (
            <div
              key={l.id}
              className="bg-white p-6 shadow rounded-lg hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-700">
                {l.reason}
              </h2>

              <p className="text-gray-600 mb-1">
                <b>From:</b> {l.from_date}
              </p>
              <p className="text-gray-600 mb-3">
                <b>To:</b> {l.to_date}
              </p>

              <p>
                <span
                  className={`px-2 py-1 text-xs rounded font-semibold ${
                    l.status === "pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : l.status === "approved"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {l.status.toUpperCase()}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}