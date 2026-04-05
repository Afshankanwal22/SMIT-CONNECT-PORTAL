// StudentDashboard.jsx
import { useNavigate } from "react-router-dom";
import { FaBook, FaCalendarPlus, FaClipboardList } from "react-icons/fa";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const studentName = localStorage.getItem("student_name") || "Student";

  const cards = [
    { title:"Courses", icon:<FaBook className="text-4xl text-white"/>, bg:"bg-blue-500 hover:bg-blue-600", route:"/courses"},
    { title:"Apply Leave", icon:<FaCalendarPlus className="text-4xl text-white"/>, bg:"bg-green-500 hover:bg-green-600", route:"/leave"},
    { title:"My Leaves", icon:<FaClipboardList className="text-4xl text-white"/>, bg:"bg-purple-500 hover:bg-purple-600", route:"/my-leaves"}
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome, {studentName}!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c,i)=>(
          <div key={i} onClick={()=>navigate(c.route)} className={`${c.bg} cursor-pointer rounded-xl shadow-lg p-6 flex flex-col items-center justify-center transition transform hover:-translate-y-1`}>
            {c.icon}<h2 className="text-white text-xl font-semibold mt-4">{c.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}