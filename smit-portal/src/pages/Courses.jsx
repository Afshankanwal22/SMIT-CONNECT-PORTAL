import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { supabase } from "../lib/supabase";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    cnic: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    qualification: "",
    image: null,
  });

  // Fetch courses
  const fetchCourses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      Swal.fire("Error", "Failed to fetch courses", "error");
    } else {
      setCourses(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Submit + Excel Export
  const handleApply = () => {
    if (!form.name || !form.cnic || !form.phone) {
      Swal.fire("Error", "Please fill required fields", "warning");
      return;
    }

    const data = [
      {
        Course: selectedCourse.name,
        Name: form.name,
        FatherName: form.fatherName,
        CNIC: form.cnic,
        Email: form.email,
        Phone: form.phone,
        Address: form.address,
        City: form.city,
        Qualification: form.qualification,
      },
    ];

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");

    const excelBuffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, "Student_Record.xlsx");

    Swal.fire("Success", "Application Submitted & Excel Downloaded", "success");

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
      image: null,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <div className="bg-white shadow p-4 flex items-center justify-between px-8">
        <img src="https://lms.saylanimit.com/logo.png" className="h-12" />

        {/* BUTTON */}
        <button
          onClick={() => window.location.reload()}
          className="text-lg font-semibold text-white bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          SMIT Courses Portal
        </button>
      </div>

      {/* TITLE */}
      <div className="text-center mt-6 mb-4">
        <h2 className="text-2xl font-bold text-gray-700">Available Courses</h2>
      </div>

      {/* COURSES */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6 px-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white p-5 rounded-xl shadow">
              <h3 className="font-bold text-lg">{course.name}</h3>
              <p>Duration: {course.duration}</p>
              <p>Campus: {course.campus}</p>

              <button
                disabled={course.status !== "open"}
                onClick={() => setSelectedCourse(course)}
                className={`mt-4 w-full py-2 rounded ${
                  course.status === "open"
                    ? "bg-green-500 text-white"
                    : "bg-gray-400"
                }`}
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white w-full max-w-lg p-6 rounded-xl max-h-[90vh] overflow-y-auto">

            <h2 className="text-xl font-bold text-green-600 mb-4">
              Apply for {selectedCourse.name}
            </h2>

            {/* FORM */}
            <input
              placeholder="Full Name"
              className="input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder="Father Name"
              className="input"
              value={form.fatherName}
              onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
            />

            <input
              placeholder="CNIC"
              className="input"
              value={form.cnic}
              onChange={(e) => setForm({ ...form, cnic: e.target.value })}
            />

            <input
              placeholder="Phone"
              className="input"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <input
              placeholder="Email"
              className="input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              placeholder="Address"
              className="input"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />

            <input
              placeholder="City"
              className="input"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />

            <input
              placeholder="Qualification"
              className="input"
              value={form.qualification}
              onChange={(e) =>
                setForm({ ...form, qualification: e.target.value })
              }
            />

            {/* IMAGE */}
            <input
              type="file"
              onChange={(e) =>
                setForm({ ...form, image: e.target.files[0] })
              }
            />

            {form.image && (
              <img
                src={URL.createObjectURL(form.image)}
                className="w-24 mt-2"
              />
            )}

            {/* BUTTONS */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setSelectedCourse(null)}
                className="w-full bg-gray-300 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleApply}
                className="w-full bg-green-600 text-white py-2 rounded"
              >
                Submit & Download Excel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STYLE */}
      <style>
        {`
          .input {
            width: 100%;
            border: 1px solid #ccc;
            padding: 10px;
            margin-top: 10px;
            border-radius: 8px;
          }
        `}
      </style>
    </div>
  );
}