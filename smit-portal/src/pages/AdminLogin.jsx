import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "Sweetalert2";
import 'Sweetalert2/dist/Sweetalert2.min.css';

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Hardcoded admin credentials
  const ADMIN_EMAIL = "admin@smit.com";
  const ADMIN_PASSWORD = "Smit@123";

  const handleLogin = () => {
    // Empty field validation
    if (!email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Please enter email and password',
      });
      return;
    }

    // Check against hardcoded credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      Swal.fire({
        icon: 'success',
        title: 'Login Success',
        text: `Welcome Admin!`,
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        // Save admin info in localStorage
        localStorage.setItem("admin", JSON.stringify({ email: ADMIN_EMAIL }));
        navigate("/admin/dashboard"); // redirect to dashboard
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Admin',
        text: 'Email or password is incorrect',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <img
            src="https://lms.saylanimit.com/logo.png"
            className="h-20 mx-auto"
          />
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter Admin Email"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-semibold transition duration-200"
          >
            Login as Admin
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © 2026 SMIT Portal
        </p>
      </div>
    </div>
  );
}