import { useState } from "react";
import { supabase } from "../lib/supabase";
import Swal from "sweetalert2";
import { FaCalendarAlt, FaFileAlt } from "react-icons/fa";

export default function ApplyLeave() {
  const [form, setForm] = useState({
    reason: "",
    from_date: "",
    to_date: "",
  });

  const [loading, setLoading] = useState(false);

  const submitLeave = async () => {
    const studentId = localStorage.getItem("student_id") || "123";

    if (!form.reason || !form.from_date || !form.to_date) {
      Swal.fire("Error", "All fields are required", "warning");
      return;
    }

    // Date validation
    if (form.from_date > form.to_date) {
      Swal.fire("Error", "From date cannot be after To date", "error");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("leaves").insert([
      {
        ...form,
        student_id: studentId,
        status: "pending",
      },
    ]);

    setLoading(false);

    if (!error) {
      Swal.fire("Success", "Leave Applied Successfully!", "success");
      setForm({ reason: "", from_date: "", to_date: "" });
    } else {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      {/* CARD */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">

        {/* HEADER */}
        <div className="mb-5 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Apply for Leave
          </h2>
          <p className="text-sm text-gray-500">
            Submit your leave request
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-4">

          {/* Reason */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Reason
            </label>
            <div className="relative">
              <FaFileAlt className="absolute top-3 left-3 text-gray-400" />
              <input
                placeholder="Enter reason..."
                className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                value={form.reason}
                onChange={(e) =>
                  setForm({ ...form, reason: e.target.value })
                }
              />
            </div>
          </div>

          {/* From Date */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              From Date
            </label>
            <div className="relative">
              <FaCalendarAlt className="absolute top-3 left-3 text-gray-400" />
              <input
                type="date"
                className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                value={form.from_date}
                onChange={(e) =>
                  setForm({ ...form, from_date: e.target.value })
                }
              />
            </div>
          </div>

          {/* To Date */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              To Date
            </label>
            <div className="relative">
              <FaCalendarAlt className="absolute top-3 left-3 text-gray-400" />
              <input
                type="date"
                className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                value={form.to_date}
                onChange={(e) =>
                  setForm({ ...form, to_date: e.target.value })
                }
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={submitLeave}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit Leave"}
          </button>
        </div>
      </div>
    </div>
  );
}