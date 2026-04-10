import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Swal from "sweetalert2";
import { FaCheck, FaTimes, FaUser, FaCalendarAlt } from "react-icons/fa";

export default function AdminLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);

  // FETCH
  const getLeaves = async () => {
    setLoading(true);

    const { data } = await supabase
      .from("leaves")
      .select("*")
      .order("id", { ascending: false });

    setLeaves(data || []);
    setLoading(false);
  };

  useEffect(() => {
    getLeaves();
  }, []);

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    const confirm = await Swal.fire({
      title: `Mark as ${status}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: status === "approved" ? "#16a34a" : "#dc2626",
    });

    if (!confirm.isConfirmed) return;

    await supabase.from("leaves").update({ status }).eq("id", id);

    Swal.fire("Success", `Leave ${status}`, "success");
    getLeaves();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Leave Management
        </h1>
        <p className="text-gray-500 text-sm">
          Approve or reject student leave requests
        </p>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="text-center text-gray-500 py-10">
          Loading leaves...
        </div>
      ) : leaves.length === 0 ? (
        <div className="bg-white p-10 text-center rounded-xl shadow">
          <p className="text-gray-500">No leave requests found</p>
        </div>
      ) : (
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">

          {/* TABLE */}
          <table className="w-full text-sm">

            {/* HEADER */}
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="p-4 text-left">Student</th>
                <th className="p-4 text-left">Reason</th>
                <th className="p-4 text-left">Dates</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>

              {leaves.map((l) => (
                <tr
                  key={l.id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  {/* STUDENT */}
                  <td className="p-4 flex items-center gap-2 text-gray-700">
                    <FaUser className="text-gray-400" />
                    {l.student_id}
                  </td>

                  {/* REASON */}
                  <td className="p-4 text-gray-700">
                    {l.reason}
                  </td>

                  {/* DATES */}
                  <td className="p-4 text-gray-600 flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-400" />
                    {l.from_date} → {l.to_date}
                  </td>

                  {/* STATUS BADGE */}
                  <td className="p-4">
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
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4 flex gap-2">

                    <button
                      onClick={() => updateStatus(l.id, "approved")}
                      className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      <FaCheck /> Approve
                    </button>

                    <button
                      onClick={() => updateStatus(l.id, "rejected")}
                      className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      <FaTimes /> Reject
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}