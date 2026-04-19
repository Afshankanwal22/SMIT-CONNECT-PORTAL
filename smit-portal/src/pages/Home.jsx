import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Swal from "sweetalert2"

export default function Home() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  // 🔐 LOGIN CHECK
  const handleExplore = () => {
    const isLoggedIn = localStorage.getItem("student");

    if (!isLoggedIn) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login first to explore courses",
        confirmButtonText: "Go to Login",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    navigate("/courses");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-lg shadow z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

          <img
            src="https://lms.saylanimit.com/logo.png"
            className="h-12 cursor-pointer"
            onClick={() => navigate("/")}
          />

          <div className="hidden md:flex gap-8 text-gray-700 font-medium">
            {["Home", "Courses", "About", "Contact"].map((l) => (
              <button
                key={l}
                onClick={() => navigate(`/${l.toLowerCase()}`)}
                className="hover:text-green-600"
              >
                {l}
              </button>
            ))}
          </div>

          <div className="hidden md:flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/AdminLogin")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Admin
            </button>
          </div>

          <div className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </div>
        </div>

        {/* MOBILE */}
        {menuOpen && (
          <div className="md:hidden bg-white p-4 space-y-3">
            {["Home", "Courses", "About", "Contact"].map((l) => (
              <button
                key={l}
                onClick={() => {
                  navigate(`/${l.toLowerCase()}`);
                  setMenuOpen(false);
                }}
                className="block w-full text-left"
              >
                {l}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <div className="relative h-screen flex items-center justify-center text-center">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644')",
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 max-w-3xl px-4">

          <h1 className="text-5xl font-extrabold text-white mb-4">
            SMIT Connect Portal
          </h1>

          <p className="text-gray-200 mb-6">
            Learn modern skills, grow your career, and join Pakistan’s top IT platform.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">

            {/* 🔐 PROTECTED BUTTON */}
            <button
              onClick={handleExplore}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
            >
              Explore Courses
            </button>

            {/* 🎥 VIDEO BUTTON */}
            <button
              onClick={() => setVideoOpen(true)}
              className="bg-white text-black px-6 py-3 rounded-lg"
            >
              ▶ Watch Saylani Video
            </button>

          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose SMIT?
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {[
            { title: "Expert Training", desc: "Industry level courses with real projects." },
            { title: "Free Learning", desc: "Learn modern tech skills at zero cost." },
            { title: "Career Growth", desc: "Get job ready with practical skills." },
          ].map((f) => (
            <div key={f.title} className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-bold">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}

        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-black text-white text-center p-6">
        © {new Date().getFullYear()} SMIT Connect
      </footer>

      {/* 🎥 VIDEO MODAL (FIXED) */}
      {videoOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

          <div className="bg-white p-4 rounded-lg w-[90%] md:w-[60%]">

            <button
              onClick={() => setVideoOpen(false)}
              className="float-right font-bold"
            >
              ✕
            </button>

            <h2 className="text-lg font-bold mb-2">
              Saylani Introduction Video
            </h2>

            <iframe
              className="w-full h-80 rounded"
              src="https://www.youtube.com/embed/5MgBikgcWnY"
              title="Saylani Video"
              allowFullScreen
            ></iframe>

          </div>

        </div>
      )}

    </div>
  );
}