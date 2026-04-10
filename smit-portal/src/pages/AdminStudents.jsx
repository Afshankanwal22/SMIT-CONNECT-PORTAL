import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Swal from "sweetalert2";

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const getStudents = async () => {
    const { data } = await supabase.from("students").select("*");
    setStudents(data || []);
  };

  useEffect(() => {
    getStudents();
  }, []);

  const deleteStudent = async (id) => {
    await supabase.from("students").delete().eq("id", id);
    Swal.fire("Deleted", "Student removed", "success");
    getStudents();
  };

  return (
    <div className="p-6 flex-1">

      <h1 className="text-2xl font-bold mb-4">Students</h1>

      <input
        placeholder="Search student..."
        className="border p-2 mb-4 w-full rounded"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="bg-white rounded shadow overflow-x-auto">

        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th>Course</th>
              <th>CNIC</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students
              .filter((s) =>
                s.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="p-3">{s.name}</td>
                  <td>{s.course}</td>
                  <td>{s.cnic}</td>
                  <td>
                    <button
                      onClick={() => deleteStudent(s.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}