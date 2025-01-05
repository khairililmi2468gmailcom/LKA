import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Lab.scss";
import Modal from "./Modal";

const SPREADSHEET_ID = "1p7aHoR95gaTpaPH4kh5YPdgaPEQjuNBCJmRsBz5ss-A";
const RANGE = "Form Responses 1!B:Q"; // Mengambil kolom B hingga Q
const API_KEY = "AIzaSyBSDF4KF73HLzyq2Gamqx0vl46Tsc1nLNw"; // Dummy data

const Lab = () => {
  const [lab, setLab] = useState([]);
  const [modalData, setModalData] = useState(null); // Data untuk modal
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLabData = async () => {
      try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
        const response = await axios.get(url);
        if (response.status === 200) {
          const rows = response.data.values;
          if (rows) {
            const labData = rows
              .slice(1) // Mengabaikan header
              .filter((row) => row[0] === "Research Area") // Filter untuk "My Lab"
              .map((row) => {
                const imgUrl = row[15] || ""; // Kolom Q
                const imageId = imgUrl && imgUrl.match(/id=([a-zA-Z0-9_-]+)/) ? imgUrl.match(/id=([a-zA-Z0-9_-]+)/)[1] : null;
                const imageDriveUrl = imageId ? `https://www.googleapis.com/drive/v3/files/${imageId}?alt=media&key=${API_KEY}` : "/images/default.svg";
                console.log("imageDriveUrl:", imageDriveUrl);

                return {
                  title: row[13] || "Untitled Lab", // Kolom O
                  description: row[14] || "No description provided", // Kolom P
                  imgUrl: imageDriveUrl,
                };
              });
            setLab(labData);
          }
        } else {
          setError("Failed to fetch data from Google Sheets");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please check your API Key and Spreadsheet permissions.");
      }
    };
    fetchLabData();
  }, []);

  const handleItemClick = (item) => {
    setModalData(item); // Set data ke modal
  };
  useEffect(() => {
    if (modalData) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [modalData]);

  const closeModal = () => {
    setModalData(null); // Tutup modal
  };

  const truncateDescription = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <>
      {/* Head text */}
      <div className="py-8">
        <h2 className="head-text">
          OUR <span>RESEARCH AREA</span>
        </h2>
        <span>Our Research Activities, Recognition and Awards</span>
      </div>

      {/* Lab list */}
      <motion.div
        className="app_lab-portfolio"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {lab.map((item, index) => (
          <div
            className="app_lab-item"
            key={index}
            onClick={() => handleItemClick(item)} // Klik item harus memanggil handleItemClick dengan data yang benar
          >
            <div className="app_lab-img">
              <img src={item.imgUrl} alt={item.title} 
              onError={(e) => (e.target.src = "/images/default.svg")}
              />
            </div>
            <div className="app_lab-content">
              <h4 className="bold-text">{item.title}</h4>
              <p className="p-text">{truncateDescription(item.description, 5)}</p> {/* Deskripsi singkat */}
              
            </div>
          </div>
        ))}

      </motion.div>

      {/* Modal */}
      <Modal modalData={modalData} closeModal={closeModal} />

      {error && <p className="error-message">{error}</p>}
    </>
  );
};

export default AppWrap(MotionWrap(Lab, "app__lab"), "research area", "app__whitebg");
