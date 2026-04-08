import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <div className="relative bg-gradient-to-r from-green-700 to-green-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-28 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Empowering Future Through IT Education
          </h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto">
            SMIT is dedicated to providing modern technical skills, helping
            students build careers and succeed in the digital world.
          </p>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 w-full">
          <svg viewBox="0 0 1440 320" className="w-full h-20 fill-gray-50">
            <path d="M0,224L1440,64L1440,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* STATS */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
          <h2 className="text-4xl font-bold text-green-700">10K+</h2>
          <p className="text-gray-600 mt-2">Students Trained</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
          <h2 className="text-4xl font-bold text-green-700">50+</h2>
          <p className="text-gray-600 mt-2">Courses Available</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
          <h2 className="text-4xl font-bold text-green-700">95%</h2>
          <p className="text-gray-600 mt-2">Success Rate</p>
        </div>
      </div>

      {/* MISSION / VISION */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:scale-105 transition">
          <h3 className="text-2xl font-bold text-green-700 mb-4">
            🚀 Our Mission
          </h3>
          <p className="text-gray-600 leading-relaxed">
            To equip students with industry-relevant skills through practical
            training, enabling them to build strong careers in the IT sector.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg hover:scale-105 transition">
          <h3 className="text-2xl font-bold text-green-700 mb-4">
            🎯 Our Vision
          </h3>
          <p className="text-gray-600 leading-relaxed">
            To become Pakistan’s leading IT training platform, making education
            accessible, affordable, and impactful for everyone.
          </p>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "👨‍🏫",
                title: "Expert Trainers",
                desc: "Learn from professionals with real industry experience.",
              },
              {
                icon: "💻",
                title: "Hands-on Projects",
                desc: "Build real-world projects to boost your portfolio.",
              },
              {
                icon: "🎓",
                title: "Career Support",
                desc: "Internships, guidance, and job placement assistance.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition bg-gray-50"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="font-semibold text-lg mb-2 text-gray-800">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TEAM */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Meet Our Team
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Ali Khan", role: "CEO" },
            { name: "Sara Ahmed", role: "Head Trainer" },
            { name: "Ahmed Ali", role: "Operations" },
          ].map((member, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition"
            >
              <img
                src={`https://i.pravatar.cc/150?img=${i + 3}`}
                className="w-28 h-28 rounded-full mx-auto mb-4"
              />
              <h4 className="font-semibold text-gray-800">
                {member.name}
              </h4>
              <p className="text-gray-500 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-green-700 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="mb-6 text-green-100">
          Join SMIT today and build your future in IT.
        </p>
        <button className="bg-white text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
          Explore Courses
        </button>
      </div>

      {/* FOOTER */}
      <div className="bg-gray-900 py-6 text-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} SMIT Portal. All rights reserved.
        </p>
      </div>
    </div>
  );
}