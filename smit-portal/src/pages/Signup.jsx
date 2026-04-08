import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Swal from "sweetalert2";
import {
  FaUser,
  FaIdCard,
  FaPhone,
  FaLock,
  FaHashtag,
} from "react-icons/fa";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [roll, setRoll] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    if (!name || !cnic || !roll || !contact || !password) {
      Swal.fire("Oops!", "Please fill all fields", "warning");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("cnic", cnic)
        .single();

      if (error && error.code !== "PGRST116") throw error;

      if (data) {
        Swal.fire("Error", "CNIC already exists", "error");
        setLoading(false);
        return;
      }

      const { error: insertError } = await supabase
        .from("students")
        .insert([
          {
            name,
            cnic,
            roll_no: roll,
            contact_number: contact,
            password,
          },
        ]);

      if (insertError) throw insertError;

      Swal.fire({
        icon: "success",
        title: "Signup Successful 🎉",
        text: "Redirecting to Login...",
        timer: 2000,
        showConfirmButton: false,
        willClose: () => navigate("/login"),
      });
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-700 to-green-900 text-white flex-col justify-center items-center p-10">
        <img
          src="https://lms.saylanimit.com/logo.png"
          className="h-20 mb-6"
        />
        <h1 className="text-4xl font-bold mb-4">Join SMIT</h1>
        <p className="text-lg text-center opacity-90">
          Start your journey with Saylani Mass IT Training.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center bg-gray-100 p-6">

        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl">

          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Create Account
          </h2>

          {/* Name */}
          <div className="relative mb-4">
            <FaUser className="absolute top-4 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* CNIC */}
          <div className="relative mb-4">
            <FaIdCard className="absolute top-4 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="CNIC (42101-1234567-8)"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
              className="w-full pl-10 p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Roll No */}
          <div className="relative mb-4">
            <FaHashtag className="absolute top-4 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Roll Number"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              className="w-full pl-10 p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Contact */}
          <div className="relative mb-4">
            <FaPhone className="absolute top-4 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Contact Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full pl-10 p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative mb-5">
            <FaLock className="absolute top-4 left-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />

            <span
              className="absolute right-3 top-3 text-sm cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* Button */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-green-600 text-white p-3 rounded-xl font-semibold hover:bg-green-700 transition active:scale-95 flex justify-center items-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Signup"
            )}
          </button>

          {/* Login */}
          <p className="text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-green-600 font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}