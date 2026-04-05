import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Home() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-50 font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-md z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
            <img src="https://lms.saylanimit.com/logo.png" alt="SMIT Connect Logo" className="h-12 mr-2" />
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 text-gray-700 font-medium">
            {["Home", "Courses", "About", "Contact"].map((link) => (
              <button
                key={link}
                onClick={() => navigate(`/${link.toLowerCase()}`)}
                className="hover:text-green-600 transition font-medium"
              >
                {link}
              </button>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition transform hover:-translate-y-1"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/AdminLogin")}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition transform hover:-translate-y-1"
            >
              Admin Login
            </button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden text-gray-800 text-2xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </div>
        </div>

        {/* Mobile Menu Items */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-md w-full py-4 px-6 flex flex-col gap-4">
            {["Home", "Courses", "About", "Contact"].map((link) => (
              <button
                key={link}
                onClick={() => { navigate(`/${link.toLowerCase()}`); setMenuOpen(false); }}
                className="text-gray-700 hover:text-green-600 text-lg font-medium transition"
              >
                {link}
              </button>
            ))}
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => { navigate("/login"); setMenuOpen(false); }}
                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-4 py-2 rounded-lg w-full font-semibold shadow-md transition"
              >
                Login
              </button>
              <button
                onClick={() => { navigate("/AdminLogin"); setMenuOpen(false); }}
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-4 py-2 rounded-lg w-full font-semibold shadow-md transition"
              >
                Signup
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen flex flex-col justify-center items-center text-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://mir-s3-cdn-cf.behance.net/project_modules/max_632_webp/b38f2d209998635.670952f348846.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 px-4 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
            SMIT Connect Portal
          </h1>
          <p className="text-lg md:text-2xl text-white mb-8 drop-shadow-md">
            Connect, learn, and grow with the best courses and community at SMIT.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/courses")}
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition transform hover:-translate-y-1"
            >
              Explore Courses
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition transform hover:-translate-y-1"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-20 px-4 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Why Choose SMIT Connect?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { title: "Expert Courses", desc: "Learn from industry experts with comprehensive courses designed to boost your skills." },
            { title: "Community Support", desc: "Join a vibrant community of learners, share knowledge, and get your questions answered." },
            { title: "Flexible Learning", desc: "Access courses anytime, anywhere, and learn at your own pace with our flexible platform." },
          ].map((feature) => (
            <div key={feature.title} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-12 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">SMIT Connect</h3>
            <p className="max-w-xs">
              Your one-stop platform for learning, connecting, and growing your skills. Join our community and start your journey today.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Courses", "About", "Contact"].map((link) => (
                <li key={link}>
                  <button onClick={() => navigate(`/${link.toLowerCase()}`)} className="hover:text-green-500 transition">{link}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-green-500 transition">Facebook</a>
              <a href="#" className="hover:text-blue-500 transition">Twitter</a>
              <a href="#" className="hover:text-purple-500 transition">LinkedIn</a>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 mt-8">&copy; {new Date().getFullYear()} SMIT Connect. All rights reserved.</p>
      </footer>
    </div>
  );
}