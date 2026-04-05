import React, { useState } from "react";
import Swal from "sweetalert2";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) {
      Swal.fire("Error", "Please fill all fields", "warning");
      return;
    }
    Swal.fire("Success", "Your message has been submitted", "success");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HERO SECTION */}
      <div className="bg-green-700 relative">
        <div className="max-w-6xl mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-green-100">
            Have a question or need support? Reach out to us today!
          </p>
        </div>
        <div className="absolute bottom-0 w-full">
          <svg viewBox="0 0 1440 320" className="w-full h-16 fill-white">
            <path d="M0,224L1440,64L1440,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* MAIN CONTACT SECTION */}
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        
        {/* LEFT: Contact Info + Map */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>
          <p className="text-gray-600">
            Fill out the form and our team will get back to you as soon as possible.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
              </svg>
              <p className="text-gray-600">123 SMIT Street, Karachi, Pakistan</p>
            </div>

            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.466 15.466 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.48 2.53.74 3.88.74a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 21.5 2.5 13.93 2.5 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.26 2.67.74 3.88a1 1 0 01-.21 1.11l-2.2 2.2z"/>
              </svg>
              <p className="text-gray-600">+92-300-1234567</p>
            </div>

            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <p className="text-gray-600">info@smitcourses.com</p>
            </div>
          </div>

          {/* GOOGLE MAP */}
          <div className="mt-6 rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="SMIT Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.0000000000005!2d67.001!3d24.850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f0000000001%3A0x0000000000000000!2sKarachi!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s"
              className="w-full h-64 border-0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* RIGHT: Contact Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email Address"
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <textarea
              placeholder="Your Message"
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-400 focus:outline-none h-32 resize-none"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-gray-900 py-8 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} SMIT Courses Portal. All rights reserved.
        </p>
      </div>
    </div>
  );
}