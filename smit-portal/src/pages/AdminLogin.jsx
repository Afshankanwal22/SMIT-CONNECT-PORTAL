import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const ADMIN_EMAIL = "admin@smit.com";
  const ADMIN_PASSWORD = "Smit@123";

  const handleLogin = () => {
    if (!email || !password) {
      Swal.fire("Oops!", "Please enter email and password", "warning");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        Swal.fire({
          icon: "success",
          title: "Welcome Admin 👋",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          localStorage.setItem(
            "admin",
            JSON.stringify({ email: ADMIN_EMAIL })
          );
          navigate("/admin/dashboard");
        });
      } else {
        Swal.fire("Error", "Invalid Admin Credentials", "error");
      }

      setLoading(false);
    }, 800); // small delay for UX feel
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-800 to-green-950 text-white flex-col justify-center items-center p-10">
        <img
          src="https://lms.saylanimit.com/logo.png"
          className="h-20 mb-6"
        />
        <h1 className="text-4xl font-bold mb-4">Admin Portal</h1>
        <p className="text-lg text-center opacity-90">
          Manage students, courses & system securely.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center bg-gray-100 p-6">

        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl">

          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Admin Login
          </h2>

          {/* Email */}
          <div className="relative mb-4">
            <FaEnvelope className="absolute top-4 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-green-700 text-white p-3 rounded-xl font-semibold hover:bg-green-800 transition active:scale-95 flex justify-center items-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Login as Admin"
            )}
          </button>

          {/* Footer */}
          <p className="text-center text-gray-400 text-sm mt-6">
            © 2026 SMIT Admin Panel
          </p>

        </div>
      </div>
    </div>
  );
}