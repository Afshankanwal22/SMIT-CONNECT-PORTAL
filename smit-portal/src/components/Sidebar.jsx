import { Link } from "react-router-dom";
import { FaHome, FaUsers, FaBook, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg min-h-screen p-5 flex flex-col">

      <h1 className="text-2xl font-bold text-green-600 mb-8">
        Admin Panel
      </h1>

      <nav className="flex flex-col gap-2">

        <Link className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded" to="/admin">
          <FaHome /> Dashboard
        </Link>

        <Link className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded" to="/admin/students">
          <FaUsers /> Students
        </Link>

        <Link className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded" to="/admin/courses">
          <FaBook /> Courses
        </Link>

        <Link className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded" to="/admin/leaves">
          <FaBook /> Leaves
        </Link>

      </nav>

      <button className="mt-auto flex items-center gap-2 p-2 text-red-500 hover:bg-red-50 rounded">
        <FaSignOutAlt /> Logout
      </button>

    </div>
  );
}