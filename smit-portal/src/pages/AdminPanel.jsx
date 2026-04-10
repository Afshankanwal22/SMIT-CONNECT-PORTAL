import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaDownload, FaTrash, FaSearch } from "react-icons/fa";

export default function AdminPanel() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch Students
  const getStudents = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("students")
      .select("*")
      .order("id", { ascending: false });

    setStudents(data || []);
    setLoading(false);
  };

  useEffect(() => {
    getStudents();
  }, []);

  // DELETE
  const deleteStudent = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Student?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
    });

    if (confirm.isConfirmed) {
      await supabase.from("students").delete().eq("id", id);
      Swal.fire("Deleted!", "Student removed", "success");
      getStudents();
    }
  };

  // EXCEL DOWNLOAD
  const downloadExcel = () => {
    if (students.length === 0) {
      Swal.fire("Error", "No data available", "warning");
      return;
    }

    const ws = XLSX.utils.json_to_sheet(students);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");

    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const file = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, "Students_Data.xlsx");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <button
          onClick={downloadExcel}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow"
        >
          <FaDownload /> Export Excel
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative mb-6">
        <FaSearch className="absolute top-3 left-3 text-gray-400" />
        <input
          placeholder="Search student by name..."
          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE CARD */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">

        {loading ? (
          <p className="text-center py-10 text-gray-500">Loading...</p>
        ) : students.length === 0 ? (
          <p className="text-center py-10 text-gray-500">
            No students found
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Course</th>
                <th className="p-4 text-left">CNIC</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {students
                .filter((s) =>
                  s.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((s) => (
                  <tr
                    key={s.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-medium text-gray-800">
                      {s.name}
                    </td>
                    <td className="p-4">{s.course}</td>
                    <td className="p-4">{s.cnic}</td>

                    <td className="p-4">
                      <button
                        onClick={() => deleteStudent(s.id)}
                        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}