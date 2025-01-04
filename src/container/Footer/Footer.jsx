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
          href="https://wa.me/625370984854"
          target="_blank"
          rel="noopener noreferrer"
          className="app__footer-contact app__footer-whatsapp"
        >
          <FaWhatsapp className="contact-icon" />
          <span>Hubungi via WhatsApp</span>
        </a>

        {/* Email Contact */}
        <a
          href="mailto:misbullah@cs.usk.ac.id"
          target="_blank"
          rel="noopener noreferrer"
          className="app__footer-contact app__footer-email"
        >
          <FaEnvelope className="contact-icon" />
          <span>Hubungi via Email</span>
        </a>

        {/* Google Form */}
        <a
          href="https://forms.gle/FxsQJn46x48HhLsm6"
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
