import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

// Leaflet default marker fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [position, setPosition] = useState([24.8607, 67.0011]); // default Karachi
  const [loading, setLoading] = useState(false);

  // Get live location
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (err) => alert("Error getting location: " + err.message),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) {
      Swal.fire("Error", "Please fill all fields", "warning");
      return;
    }
    setLoading(true);

    // You can send form + position to backend here
    setTimeout(() => {
      Swal.fire(
        "Success 🎉",
        `Message sent successfully. Your location: [${position[0].toFixed(
          5
        )}, ${position[1].toFixed(5)}]`,
        "success"
      );
      setForm({ name: "", email: "", phone: "", message: "" });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white text-center py-24">
        <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-green-100 text-lg">
          We’re here to help — reach out anytime!
        </p>
      </div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        {/* LEFT SIDE */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600">
              Our team is ready to assist you. Your current location is shown
              below.
            </p>
          </div>

          {/* Info Cards */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
              <FaMapMarkerAlt className="text-green-600 text-xl" />
              <span className="text-gray-700">Karachi, Pakistan</span>
            </div>

            <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
              <FaPhone className="text-green-600 text-xl" />
              <span className="text-gray-700">+92-300-1234567</span>
            </div>

            <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
              <FaEnvelope className="text-green-600 text-xl" />
              <span className="text-gray-700">info@smitcourses.com</span>
            </div>
          </div>

          {/* LIVE MAP */}
          <div className="rounded-2xl overflow-hidden shadow-lg mt-6">
            <MapContainer center={position} zoom={15} className="w-full h-64">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <Marker position={position}>
                <Popup>Your Current Location</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        {/* RIGHT SIDE (FORM) */}
        <div className="bg-white p-8 rounded-2xl shadow-2xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Send a Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />
            <textarea
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full p-3 border rounded-xl h-32 resize-none focus:ring-2 focus:ring-green-500 outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition active:scale-95 flex justify-center items-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-green-700 text-white text-center py-14">
        <h2 className="text-3xl font-bold mb-3">Need Immediate Help?</h2>
        <p className="text-green-100 mb-5">
          Contact our support team for quick assistance.
        </p>
        <button className="bg-white text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
          Call Now
        </button>
      </div>

      {/* FOOTER */}
      <div className="bg-gray-900 py-6 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} SMIT Portal. All rights reserved.
        </p>
      </div>
    </div>
  );
}