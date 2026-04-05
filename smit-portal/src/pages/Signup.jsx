import { useState } from "react";
import { supabase } from '../lib/supabase';
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [roll, setRoll] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    if (!name || !cnic || !roll || !contact || !password) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Please fill all the fields.",
      });
      return;
    }

    setLoading(true);
    try {
      // Check if student already exists (optional)
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("cnic", cnic)
        .single();

      if (error && error.code !== "PGRST116") throw error; // Ignore no row error

      if (data) {
        Swal.fire({
          icon: "error",
          title: "Signup Denied",
          text: "CNIC already exists. Contact admin.",
        });
        setLoading(false);
        return;
      }

      // Insert new student
      const { error: insertError } = await supabase
        .from("students")
        .insert([{ name, cnic, roll_no: roll, contact_number: contact, password }]);

      if (insertError) throw insertError;

      // Success alert with redirect
      Swal.fire({
        icon: "success",
        title: "Signup Successful!",
        text: "Redirecting to Login...",
        timer: 2000,
        showConfirmButton: false,
        willClose: () => {
          // Redirect to login page
          window.location.href = "/login"; // replace with your login route
        },
      });

      setLoading(false);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-200 flex items-center justify-center overflow-hidden">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm flex flex-col gap-4">

        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="https://lms.saylanimit.com/logo.png"
            alt="Logo"
            className="h-16 w-auto"
          />
        </div>

        {/* Name */}
        <input
          className="border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* CNIC */}
        <input
          className="border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="CNIC (42101-1234567-8)"
          value={cnic}
          onChange={(e) => setCnic(e.target.value)}
        />

        {/* Roll No */}
        <input
          className="border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Roll Number"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
        />

        {/* Contact Number */}
        <input
          className="border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="border border-gray-300 p-2 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute right-3 top-2 text-gray-500 cursor-pointer select-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className={`bg-green-500 text-white p-2 rounded-xl font-semibold hover:bg-green-600 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <span
            className="text-green-600 cursor-pointer hover:underline"
            onClick={() => window.location.href = "/login"}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}