// AdminPanel.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import Swal from "Sweetalert2";
import "Sweetalert2/dist/Sweetalert2.min.css";
import UploadStudents from "../components/UploadStudents";
import { FaBook, FaUserGraduate, FaSignOutAlt } from "react-icons/fa";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("open");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch courses
  const getCourses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("id", { ascending: true });
    if (!error) setCourses(data);
    setLoading(false);
  };

  useEffect(() => {
    getCourses();
  }, []);

  // Save course
  const saveCourse = async () => {
    if (!name) return Swal.fire("Error", "Course name is required", "error");
    setLoading(true);

    if (editingId) {
      await supabase.from("courses").update({ name, status }).eq("id", editingId);
      Swal.fire("Success", "Course updated successfully", "success");
      setEditingId(null);
    } else {
      await supabase.from("courses").insert([{ name, status }]);
      Swal.fire("Success", "Course added successfully", "success");
    }

    setName("");
    setStatus("open");
    getCourses();
  };

  const editCourse = (course) => {
    setName(course.name);
    setStatus(course.status);
    setEditingId(course.id);
  };

  const deleteCourse = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the course permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await supabase.from("courses").delete().eq("id", id);
        Swal.fire("Deleted!", "Course has been deleted.", "success");
        getCourses();
      }
    });
  };

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  const handleStudentsUpload = (newStudents) => {
    setStudents(newStudents);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg fixed h-full p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-10">
            <img src="https://lms.saylanimit.com/logo.png" alt="Logo" className="h-22 w-32 object-contain" />
          </div>
          <nav className="flex flex-col gap-4">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2 text-gray-700 hover:text-green-600">
              <FaBook /> Dashboard
            </button>
            <button onClick={() => document.getElementById("upload-students")?.scrollIntoView({ behavior: "smooth" })} className="flex items-center gap-2 text-gray-700 hover:text-green-600">
              <FaUserGraduate /> Upload Students
            </button>
            <button onClick={() => document.getElementById("courses-list")?.scrollIntoView({ behavior: "smooth" })} className="flex items-center gap-2 text-gray-700 hover:text-green-600">
              <FaBook /> Courses List
            </button>
          </nav>
        </div>
        <button onClick={logout} className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 shadow rounded-lg hover:shadow-xl transition">
            <h3 className="text-lg font-semibold mb-2">Total Courses</h3>
            <p className="text-2xl font-bold">{courses.length}</p>
          </div>
          <div className="bg-white p-6 shadow rounded-lg hover:shadow-xl transition">
            <h3 className="text-lg font-semibold mb-2">Uploaded Students</h3>
            <p className="text-2xl font-bold">{students.length}</p>
          </div>
          <div className="bg-white p-6 shadow rounded-lg hover:shadow-xl transition">
            <h3 className="text-lg font-semibold mb-2">Open Courses</h3>
            <p className="text-2xl font-bold">{courses.filter(c => c.status === 'open').length}</p>
          </div>
        </div>

        {/* Upload Students */}
        <section id="upload-students" className="bg-white shadow-lg rounded-xl p-6 mb-8 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Upload Students (Excel)</h2>
          <UploadStudents onUpload={handleStudentsUpload} />

          {/* Students Preview Table */}
          {students.length > 0 && (
            <div className="mt-6 overflow-x-auto">
              <h3 className="text-xl font-semibold mb-3 text-gray-700">Uploaded Students Preview</h3>
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border-b px-4 py-2 text-left text-gray-600">Name</th>
                    <th className="border-b px-4 py-2 text-left text-gray-600">Email</th>
                    <th className="border-b px-4 py-2 text-left text-gray-600">Course</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="border-b px-4 py-2">{s.name}</td>
                      <td className="border-b px-4 py-2">{s.email}</td>
                      <td className="border-b px-4 py-2">{s.course}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Add / Edit Courses */}
        <section className="bg-white shadow-lg rounded-xl p-6 mb-8 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">{editingId ? "Edit Course" : "Add New Course"}</h2>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <input type="text" placeholder="Course Name" value={name} onChange={(e) => setName(e.target.value)} className="border border-gray-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-green-400" />
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400">
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
            <button onClick={saveCourse} disabled={loading} className={`px-6 py-3 rounded-lg font-semibold text-white transition ${editingId ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"} ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
              {loading ? "Processing..." : editingId ? "Update" : "Add"}
            </button>
          </div>
        </section>

        {/* Courses List */}
        <section id="courses-list" className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Courses List</h2>
          {courses.length === 0 ? (
            <p className="text-gray-500">No courses added yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border-b px-4 py-2 text-left text-gray-600">Course Name</th>
                    <th className="border-b px-4 py-2 text-left text-gray-600">Status</th>
                    <th className="border-b px-4 py-2 text-left text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                      <td className="border-b px-4 py-2">{c.name}</td>
                      <td className="border-b px-4 py-2"><span className={`px-2 py-1 text-xs rounded ${c.status === "open" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>{c.status.toUpperCase()}</span></td>
                      <td className="border-b px-4 py-2 flex gap-2">
                        <button onClick={() => editCourse(c)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition">Edit</button>
                        <button onClick={() => deleteCourse(c.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}