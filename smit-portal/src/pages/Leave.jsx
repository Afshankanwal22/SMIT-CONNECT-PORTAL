// Leave.jsx
import { useState } from "react";
import { supabase } from "../lib/supabase";
import Swal from "Sweetalert2";
import "Sweetalert2/dist/Sweetalert2.min.css";

export default function Leave() {
  const [reason, setReason] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitLeave = async () => {
    if (!reason || !from || !to)
      return Swal.fire("Error", "Please fill all required fields", "error");

    setLoading(true);
    let imageUrl = "";

    // Upload file if exists
    if (file) {
      const { data, error } = await supabase.storage
        .from("leaves")
        .upload(`public/${Date.now()}-${file.name}`, file);

      if (error) {
        setLoading(false);
        return Swal.fire("Error", "File upload failed", "error");
      }

      imageUrl = data.path;
    }

    // Insert leave request
    const { error } = await supabase.from("leaves").insert([
      {
        student_id: "123", // replace with dynamic user ID later
        reason,
        from_date: from,
        to_date: to,
        image: imageUrl,
        status: "pending",
      },
    ]);

    setLoading(false);
    if (error) return Swal.fire("Error", error.message, "error");

    Swal.fire("Success", "Leave submitted successfully", "success");
    setReason("");
    setFrom("");
    setTo("");
    setFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-700">Apply for Leave</h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <div className="flex gap-2">
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="border border-gray-300 p-2 rounded-lg"
          />
          {file && (
            <p className="text-sm text-gray-500">Selected file: {file.name}</p>
          )}

          <button
            onClick={submitLeave}
            disabled={loading}
            className={`bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-semibold transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Submit Leave"}
          </button>
        </div>
      </div>
    </div>
  );
}