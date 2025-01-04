import React from "react";
import { motion } from "framer-motion";

import { AppWrap } from "../../wrapper";
import { images } from "../../constants";
import "./Header.scss";

// scale variant
const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

// Header
const Header = () => {
  return (
    <div id="home" className="app__header app__flex">
      {/* About Me */}
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className="app__header-info"
      >
        <div className="app__header-badge">
          <div className="badge-cmp app__flex">
            <span>👋</span>
            <div style={{ marginLeft: 20 }}>
              <p className="p-text">Hello, We're</p>
              <h1 className="head-text">LKA</h1>
            </div>
          </div>

          <div className="tag-cmp app__flex">
            <p className="p-text header-description">
              LKA (Lab Kreatifitas Alim Misbullah) - Universitas Syiah Kuala. Led by Alim Misbullah, S.Si., M.S., an expert in Data Mining, AI, and Machine Learning. Our research focuses on Computer Vision, Deep Learning, Biomedical Imaging, and Intelligent Surveillance Systems, striving for excellence in cutting-edge research and innovation within these transformative fields.
            </p>
          </div>
        </div>
      </motion.div>


      {/* My Profile */}
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__header-img"
      >
        <img src={images.profile} alt="profile" />

        <motion.img
          whileInView={{ scale: [0, 1] }}
          transition={{ duration: 1, ease: "easeInOut" }}
          src={images.circle}
          alt="profile circle"
          className="overlay_circle"
        />
      </motion.div>

      {/* My Lab */}
      <motion.div
        variants={scaleVariants}
        whileInView={scaleVariants.whileInView}
        className="app__header-circles"
      >
        {[images.javascript, images.python, images.pytorch, images.tensorflow].map((circle, index) => (
          <div className="circle-cmp app__flex" key={`circle-${index}`}>
            <img src={circle} alt="Circle" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AppWrap(Header, "home");
