import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
  faPaperPlane,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

const ContactUs = () => {
  return (
    <section className="bg-gradient-to-br from-indigo-50 to-blue-100 py-20 px-6 md:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center text-sm text-gray-600 space-x-2">
            <a href="/" className="hover:text-indigo-700 flex items-center space-x-1">
              <FontAwesomeIcon icon={faHome} />
              <span>Home</span>
            </a>
            <span>/</span>
            <span className="font-medium text-indigo-700">Contact Us</span>
          </nav>
        </div>

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-200 text-indigo-800 font-medium shadow mb-4">
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            Let’s Connect
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in Touch with Us
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            We'd love to hear from you! Whether you have questions or just want to say hello.
          </p>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl transition hover:shadow-2xl">
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="text-sm font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  placeholder="Your Subject"
                  className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="mt-6">
                <label className="text-sm font-medium text-gray-700">Message</label>
                <textarea
                  rows="5"
                  placeholder="Your message..."
                  className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Info</h3>
              <div className="space-y-6">
                {[
                  {
                    icon: faMapMarkerAlt,
                    title: "Address",
                    content: "123 Education Street, Knowledge City, India - 123456",
                  },
                  {
                    icon: faPhoneAlt,
                    title: "Phone",
                    content: "+91 123 456 7890\n+91 987 654 3210",
                  },
                  {
                    icon: faEnvelope,
                    title: "Email",
                    content: "info@example.com\nsupport@example.com",
                  },
                ].map(({ icon, title, content }, idx) => (
                  <div className="flex items-start" key={idx}>
                    <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg mr-4">
                      <FontAwesomeIcon icon={icon} className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{title}</h4>
                      <p className="text-gray-600 whitespace-pre-line">{content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <iframe
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.366269835946!2d77.2270223150825!3d28.62873998242036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1632912345678!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
