import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Swal from "sweetalert2";
import { FaIdCard, FaLock } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔐 LOGIN FUNCTION
  const handleLogin = async () => {
    if (!cnic || !password) {
      Swal.fire("Error", "Enter CNIC & Password", "warning");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("cnic", cnic)
      .eq("password", password)
      .single();

    setLoading(false);

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

  // 🔁 FORGOT PASSWORD FUNCTION (EMAIL BASED)
  const handleForgotPassword = async () => {
    const { value: email } = await Swal.fire({
      title: "Reset Password",
      input: "email",
      inputLabel: "Enter your registered email",
      inputPlaceholder: "example@gmail.com",
      showCancelButton: true,
    });

    if (!email) return;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/update-password",
    });

    if (error) {
      Swal.fire("Error", error.message, "error");
    } else {
      Swal.fire(
        "Email Sent",
        "Check your email to reset password",
        "success"
      );
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-600 to-green-800 text-white flex-col justify-center items-center p-10">
        <img
          src="https://lms.saylanimit.com/logo.png"
          className="h-20 mb-6"
        />
        <h1 className="text-4xl font-bold mb-4">SMIT Portal</h1>
        <p className="text-lg text-center opacity-90">
          Learn skills. Build future. Join Saylani Mass IT Training.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center bg-gray-100 p-6">

        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl">

          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Login Account
          </h2>

          {/* CNIC */}
          <div className="relative mb-5">
            <FaIdCard className="absolute top-4 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Enter CNIC"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
              className="w-full pl-10 p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative mb-5">
            <FaLock className="absolute top-4 left-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
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

          {/* Forgot */}
          <div className="flex justify-end mb-5">
            <span
              onClick={handleForgotPassword}
              className="text-green-600 text-sm cursor-pointer hover:underline"
            >
              Forgot Password?
            </span>
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-green-600 text-white p-3 rounded-xl font-semibold hover:bg-green-700 transition active:scale-95 flex justify-center items-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>

          {/* Signup */}
          <p className="text-center text-gray-500 mt-6">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-green-600 font-semibold cursor-pointer hover:underline"
            >
              Signup
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}