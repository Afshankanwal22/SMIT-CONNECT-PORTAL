import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Swal from "sweetalert2";

export default function AdminLeaves() {
  const [leaves, setLeaves] = useState([]);

  const getLeaves = async () => {
    const { data } = await supabase
      .from("leaves")
      .select("*")
      .order("id", { ascending: false });

    setLeaves(data || []);
  };

  useEffect(() => {
    getLeaves();
  }, []);

  // APPROVE / REJECT
  const updateStatus = async (id, status) => {
    await supabase.from("leaves").update({ status }).eq("id", id);
    Swal.fire("Updated", `Leave ${status}`, "success");
    getLeaves();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin - Leave Requests</h1>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>Reason</th>
            <th>Dates</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {leaves.map((l) => (
            <tr key={l.id} className="border-t">
              <td>{l.student_id}</td>
              <td>{l.reason}</td>
              <td>{l.from_date} → {l.to_date}</td>

              <td>{l.status}</td>

              <td className="flex gap-2">
                <button
                  onClick={() => updateStatus(l.id, "approved")}
                  className="bg-green-500 text-white px-2"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(l.id, "rejected")}
                  className="bg-red-500 text-white px-2"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}