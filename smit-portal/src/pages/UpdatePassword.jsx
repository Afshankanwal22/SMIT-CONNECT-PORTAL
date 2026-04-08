import { useState } from "react";
import { supabase } from "../lib/supabase";
import Swal from "sweetalert2";
import { FaLock } from "react-icons/fa";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!password || !confirm) {
      Swal.fire("Error", "Fill all fields", "warning");
      return;
    }

    if (password !== confirm) {
      Swal.fire("Error", "Passwords do not match", "error");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    setLoading(false);

    if (error) {
      Swal.fire("Error", error.message, "error");
    } else {
      Swal.fire("Success 🎉", "Password updated successfully", "success");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-700 to-green-900 text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">Set New Password</h1>
        <p className="text-lg text-center opacity-90">
          Create a strong password to secure your account.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center bg-gray-100 p-6">

        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl">

          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Update Password
          </h2>

          {/* Password */}
          <div className="relative mb-4">
            <FaLock className="absolute top-4 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Confirm */}
          <div className="relative mb-5">
            <FaLock className="absolute top-4 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full pl-10 p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-green-700 text-white p-3 rounded-xl font-semibold hover:bg-green-800 transition active:scale-95 flex justify-center items-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Update Password"
            )}
          </button>

        </div>
      </div>
    </div>
  );
}