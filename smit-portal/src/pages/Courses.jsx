import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { supabase } from "../lib/supabase";

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    cnic: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    qualification: "",
  });
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses
  const fetchCourses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("id", { ascending: true });
    if (error) Swal.fire("Error", "Failed to fetch courses", "error");
    else setCourses(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleApply = () => {
    if (!form.name || !form.cnic || !form.phone) {
      Swal.fire("Error", "Please fill all required fields", "warning");
      return;
    }
    Swal.fire({
      icon: "success",
      title: "Application Submitted",
      text: `You applied for ${selectedCourse.name}`,
    });
    setSelectedCourse(null);
    setForm({
      name: "",
      fatherName: "",
      cnic: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      qualification: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <div className="bg-white shadow p-4 flex items-center justify-between px-8">
        <img src="https://lms.saylanimit.com/logo.png" className="h-12" />
        <h1 className="text-lg font-semibold text-gray-700">SMIT Courses Portal</h1>
      </div>

      {/* PAGE TITLE */}
      <div className="text-center mt-6 mb-4">
        <h2 className="text-2xl font-bold text-gray-700">Available Courses</h2>
        <p className="text-gray-500 text-sm">Apply for your desired course below</p>
      </div>

      {/* COURSES GRID */}
      {loading ? (
        <div className="text-center text-gray-500">Loading courses...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 pb-10">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow hover:shadow-xl transition p-5 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-800">{course.name}</h3>
                <div className="text-sm text-gray-500 mt-2 space-y-1">
                  <p><strong>Duration:</strong> {course.duration}</p>
                  <p><strong>Campus:</strong> {course.campus}</p>
                </div>
                <span
                  className={`inline-block mt-3 px-3 py-1 text-xs rounded-full ${
                    course.status === "open"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {course.status === "open" ? "Admissions Open" : "Closed"}
                </span>
              </div>

              <button
                onClick={() => setSelectedCourse(course)}
                disabled={course.status !== "open"}
                className={`mt-5 py-2 rounded-lg text-white font-medium ${
                  course.status === "open"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}

      
         
    {/* SAYLANI STYLE SCROLLABLE APPLY MODAL WITH IMAGE UPLOAD */}
{selectedCourse && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] p-6 relative flex flex-col animate-slide-in">
      {/* Close button */}
      <button
        onClick={() => setSelectedCourse(null)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>

      {/* Title */}
      <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
        Apply for {selectedCourse.name}
      </h2>

      {/* Scrollable form */}
      <div className="overflow-y-auto pr-2 flex-1 space-y-4">
        {/* Full Name */}
        <div>
          <label className="text-gray-600 text-sm mb-1 block">Full Name</label>
          <input
            placeholder="Full Name"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Father's Name */}
        <div>
          <label className="text-gray-600 text-sm mb-1 block">Father's Name</label>
          <input
            placeholder="Father's Name"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
            value={form.fatherName}
            onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
          />
        </div>

        {/* CNIC */}
        <div>
          <label className="text-gray-600 text-sm mb-1 block">CNIC</label>
          <input
            placeholder="12345-1234567-1"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
            value={form.cnic}
            onChange={(e) => setForm({ ...form, cnic: e.target.value })}
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-gray-600 text-sm mb-1 block">Email</label>
          <input
            placeholder="example@mail.com"
            type="email"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-gray-600 text-sm mb-1 block">Phone Number</label>
          <input
            placeholder="+92-300-1234567"
            type="tel"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        {/* Address */}
        <div>
          <label className="text-gray-600 text-sm mb-1 block">Address</label>
          <input
            placeholder="Your Address"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>

        {/* City */}
        <div>
          <label className="text-gray-600 text-sm mb-1 block">City</label>
          <input
            placeholder="City"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
        </div>

        {/* Qualification */}
        <div>
          <label className="text-gray-600 text-sm mb-1 block">Qualification</label>
          <input
            placeholder="Your Qualification"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
            value={form.qualification}
            onChange={(e) => setForm({ ...form, qualification: e.target.value })}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-gray-600 text-sm mb-1 block">Upload CNIC / Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none"
            onChange={(e) =>
              setForm({ ...form, image: e.target.files[0] })
            }
          />
          {/* Preview */}
          {form.image && (
            <img
              src={URL.createObjectURL(form.image)}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-lg border"
            />
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => setSelectedCourse(null)}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleApply}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
)}

      {/* Slide-in animation */}
      <style>
        {`
          @keyframes slide-in {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-in {
            animation: slide-in 0.3s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}