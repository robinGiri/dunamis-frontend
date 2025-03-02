import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [feedback, setFeedback] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend API.
    setFeedback("Thank you for contacting us! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      {/* Navbar is rendered at the top */}
      <Navbar />

      <div className="min-h-screen bg-base-200 flex flex-col items-center p-6">
        <div className="w-full max-w-4xl p-6">
          <h1 className="text-4xl font-bold text-center mb-6">
            Contact Us
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Form Card */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Get in Touch</h2>
                <p className="text-base-content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Message</span>
                    </label>
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className="textarea textarea-bordered"
                      required
                    ></textarea>
                  </div>
                  <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">
                      Send Message
                    </button>
                  </div>
                </form>
                {feedback && (
                  <div className="alert alert-success mt-4">
                    <div>{feedback}</div>
                  </div>
                )}
              </div>
            </div>
            {/* Map Card */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body p-0">
              <iframe
                title="Kathmandu Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.253236315241!2d85.31721901504235!3d27.701696982795493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190e4937c9d5%3A0x887a70fa9af9a03c!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2sus!4v1685587547540!5m2!1sen!2sus"
                className="w-full h-full rounded-b-lg"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Toaster for notifications */}
      <Toaster />
    </>
  );
}
