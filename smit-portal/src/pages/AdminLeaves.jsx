// AdminLeaves.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Swal from "sweetalert2";
import "Sweetalert2/dist/Sweetalert2.min.css";

export default function AdminLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch leave requests
  const getLeaves = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("leaves").select("*").order("id", { ascending: true });
    if (!error) setLeaves(data);
    setLoading(false);
  };

  useEffect(() => {
    getLeaves();
  }, []);

  // Update status with confirmation
  const updateStatus = async (id, status) => {
    const result = await Swal.fire({
      title: `Are you sure you want to ${status}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await supabase.from("leaves").update({ status }).eq("id", id);
      Swal.fire("Success", `Leave has been ${status}`, "success");
      getLeaves();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Leave Requests</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : leaves.length === 0 ? (
        <p className="text-gray-500">No leave requests yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leaves.map((l) => (
            <div
              key={l.id}
              className="bg-white p-6 shadow rounded-lg hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-700">
                {l.student_name || "Student"} {/* Optional: student_name */}
              </h2>

              <p className="text-gray-600 mb-1"><b>Reason:</b> {l.reason}</p>
              <p className="text-gray-600 mb-1">
                <b>Date:</b> {l.from_date} → {l.to_date}
              </p>

              <p className="mb-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
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

              <div className="flex gap-3">
                <button
                  onClick={() => updateStatus(l.id, "approved")}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded transition"
                  disabled={l.status === "approved"}
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(l.id, "rejected")}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded transition"
                  disabled={l.status === "rejected"}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}