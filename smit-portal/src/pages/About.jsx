import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* HERO SECTION */}
      <div className="bg-green-700 relative">
        <div className="max-w-6xl mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About SMIT Courses Portal
          </h1>
          <p className="text-lg md:text-xl text-green-100">
            Providing quality education and training opportunities for students across Pakistan.
          </p>
        </div>
        <div className="absolute bottom-0 w-full">
          <svg viewBox="0 0 1440 320" className="w-full h-16 fill-white">
            <path d="M0,224L1440,64L1440,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* MISSION & VISION */}
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 text-green-700 rounded-full p-3 mr-4">
              🌟
            </div>
            <h3 className="text-xl font-bold text-gray-800">Our Mission</h3>
          </div>
          <p className="text-gray-600">
            To empower students with modern technical skills and practical knowledge to succeed in today’s competitive environment.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 text-green-700 rounded-full p-3 mr-4">
              🎯
            </div>
            <h3 className="text-xl font-bold text-gray-800">Our Vision</h3>
          </div>
          <p className="text-gray-600">
            To become a leading platform for professional training and development, making education accessible to all.
          </p>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Why Choose SMIT Courses?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition text-center">
              <div className="text-green-700 text-4xl mb-4">👨‍🏫</div>
              <h4 className="font-semibold text-gray-800 mb-2">Expert Trainers</h4>
              <p className="text-gray-600 text-sm">
                Learn from industry experts with years of professional experience.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition text-center">
              <div className="text-green-700 text-4xl mb-4">🛠️</div>
              <h4 className="font-semibold text-gray-800 mb-2">Practical Skills</h4>
              <p className="text-gray-600 text-sm">
                Hands-on training designed to make you job-ready from day one.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition text-center">
              <div className="text-green-700 text-4xl mb-4">🎓</div>
              <h4 className="font-semibold text-gray-800 mb-2">Career Support</h4>
              <p className="text-gray-600 text-sm">
                Guidance, internships, and placement assistance for students.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TEAM SECTION */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Ali Khan"
              className="mx-auto rounded-full w-32 h-32 object-cover mb-4"
            />
            <h4 className="font-semibold text-gray-800">Ali Khan</h4>
            <p className="text-gray-500 text-sm">Founder & CEO</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Sara Ahmed"
              className="mx-auto rounded-full w-32 h-32 object-cover mb-4"
            />
            <h4 className="font-semibold text-gray-800">Sara Ahmed</h4>
            <p className="text-gray-500 text-sm">Head of Training</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Ahmed Ali"
              className="mx-auto rounded-full w-32 h-32 object-cover mb-4"
            />
            <h4 className="font-semibold text-gray-800">Ahmed Ali</h4>
            <p className="text-gray-500 text-sm">Support & Operations</p>
          </div>
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