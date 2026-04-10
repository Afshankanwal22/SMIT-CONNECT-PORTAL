import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiPlay } from "react-icons/fi";

export default function Home() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-lg shadow z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

          {/* LOGO */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
            <img src="https://lms.saylanimit.com/logo.png" className="h-12" />
          </div>

          {/* LINKS */}
          <div className="hidden md:flex gap-8 text-gray-700 font-medium">
            {["Home", "Courses", "About", "Contact"].map((l) => (
              <button
                key={l}
                onClick={() => navigate(`/${l.toLowerCase()}`)}
                className="hover:text-green-600 transition"
              >
                {l}
              </button>
            ))}
          </div>

          {/* BUTTONS */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/AdminLogin")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Admin
            </button>
          </div>

          {/* MOBILE */}
          <div className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </div>
        </div>

        {/* MOBILE MENU */}
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

        {/* BACKGROUND */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644')",
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-3xl px-4">

          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            SMIT Connect Portal
          </h1>

          <p className="text-gray-200 text-lg mb-6">
            Learn modern skills, grow your career, and join Pakistan’s top IT training platform.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">

            <button
              onClick={() => navigate("/courses")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
            >
              Explore Courses
            </button>

           <button
  onClick={() =>
    window.open("https://www.youtube.com/@SaylaniMassITTraining", "_blank")
  }
  className="bg-white text-black px-6 py-3 rounded-lg flex items-center gap-2"
>
  ▶ Watch Saylani Channel
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
            <div
              key={f.title}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition"
            >
              <h3 className="font-bold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}

        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-black text-white text-center p-6 mt-10">
        <p>© {new Date().getFullYear()} SMIT Connect</p>
      </footer>

      {/* 🎥 VIDEO MODAL */}
      {videoOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

          <div className="bg-white p-4 rounded-lg w-[90%] md:w-[60%]">

            <button
              onClick={() => setVideoOpen(false)}
              className="float-right text-black font-bold"
            >
              ✕
            </button>

            <h2 className="text-lg font-bold mb-2">
              Saylani Introduction Video
            </h2>

            {/* 🔥 SAYLANI VIDEO LINK */}
            

          </div>

        </div>
      )}

    </div>
  );
}