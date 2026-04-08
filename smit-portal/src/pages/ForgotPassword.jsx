import { useState } from "react";
import { supabase } from "../lib/supabase";
import Swal from "sweetalert2";
import { FaEnvelope } from "react-icons/fa";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      Swal.fire("Error", "Enter your email", "warning");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/update-password",
    });

    setLoading(false);

    if (error) {
      Swal.fire("Error", error.message, "error");
    } else {
      Swal.fire(
        "Email Sent 📧",
        "Check your email to reset password",
        "success"
      );
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-600 to-green-800 text-white flex-col justify-center items-center p-10">
        <img src="https://lms.saylanimit.com/logo.png" className="h-20 mb-6" />
        <h1 className="text-4xl font-bold mb-4">Forgot Password</h1>
        <p className="text-lg text-center opacity-90">
          Don’t worry, we’ll help you recover your account.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center bg-gray-100 p-6">

        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl">

          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Reset Your Password
          </h2>

          {/* Email */}
          <div className="relative mb-5">
            <FaEnvelope className="absolute top-4 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleReset}
            disabled={loading}
            className="w-full bg-green-600 text-white p-3 rounded-xl font-semibold hover:bg-green-700 transition active:scale-95 flex justify-center items-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Send Reset Link"
            )}
          </button>

        </div>
      </div>
    </div>
  );
}