import React from "react";
import { FaWhatsapp, FaEnvelope, FaGoogle } from "react-icons/fa";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="app__footer">
      <h2 className="head-text">
      Butuh Bantuan Menyelesaikan Tugas Akhir? 
      <span> Kami Siap Memandu!</span>
      </h2>

      <div className="app__footer-info">
        {/* WhatsApp Contact */}
        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="app__footer-contact app__footer-whatsapp"
        >
          <FaWhatsapp className="contact-icon" />
          <span>Hubungi via WhatsApp</span>
        </a>

        {/* Email Contact */}
        <a
          href="mailto:admin@example.com"
          target="_blank"
          rel="noopener noreferrer"
          className="app__footer-contact app__footer-email"
        >
          <FaEnvelope className="contact-icon" />
          <span>Hubungi via Email</span>
        </a>

        {/* Google Form */}
        <a
          href="https://forms.gle/your-google-form-link"
          target="_blank"
          rel="noopener noreferrer"
          className="app__footer-contact app__footer-google"
        >
          <FaGoogle className="contact-icon" />
          <span>Daftar via Google Form</span>
        </a>
      </div>
    </div>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__whitebg"
);
