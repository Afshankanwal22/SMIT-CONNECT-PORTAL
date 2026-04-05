import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Swal from "Sweetalert2";
import "Sweetalert2/dist/Sweetalert2.min.css";

export default function Login() {
  const navigate = useNavigate();
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!cnic || !password) {
      Swal.fire("Error", "Enter CNIC & Password", "warning");
      return;
    }

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("cnic", cnic)
      .eq("password", password)
      .single();

    if (error || !data) {
      Swal.fire("Login Failed", "Invalid Credentials", "error");
      return;
    }

    Swal.fire({
      icon: "success",
      title: `Welcome ${data.name}`,
      timer: 2000,
      showConfirmButton: false,
      willClose: () => navigate("/courses"),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md flex flex-col gap-6">

        {/* Logo */}
        <img
          src="https://lms.saylanimit.com/logo.png"
          className="h-20 mx-auto"
        />

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Login to Your Account
        </h2>

        {/* CNIC */}
        <input
          placeholder="Enter CNIC (42101-1234567-8)"
          className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          onChange={(e) => setCnic(e.target.value)}
        />

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute right-3 top-3 text-gray-500 cursor-pointer text-sm"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="bg-green-500 text-white p-3 rounded-xl font-semibold hover:bg-green-600 active:scale-95 transition"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm">
          Don't have an account?{" "}
          <span
            className="text-green-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>

      </div>
    </div>
  );
}