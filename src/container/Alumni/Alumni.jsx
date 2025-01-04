import React, { useState, useEffect } from "react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";  // Hapus AiFillEye yang tidak digunakan
import { motion } from "framer-motion";
import axios from "axios";

import { AppWrap, MotionWrap } from "../../wrapper";
import "./Alumni.scss";

const SPREADSHEET_ID = "1p7aHoR95gaTpaPH4kh5YPdgaPEQjuNBCJmRsBz5ss-A";
const RANGE = "Form Responses 1!B:S"; // Mengambil kolom B hingga S
const API_KEY = "AIzaSyBSDF4KF73HLzyq2Gamqx0vl46Tsc1nLNw";

const Alumni = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [alumni, setAlumni] = useState([]);
  const [filterAlumni, setFilterAlumni] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);  // State untuk kontrol modal
  const [selectedAlumni, setSelectedAlumni] = useState(null); // State untuk alumni yang dipilih

  useEffect(() => {
    const fetchAlumniData = async () => {
      try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
        const response = await axios.get(url);

        if (response.status === 200) {
          const rows = response.data.values;

          if (rows) {
            // Menyaring data berdasarkan kolom B yang berisi 'Alumni' dan menghindari nilai placeholder
            const alumniData = rows.slice(1).map((row, index) => {
              // Pastikan data hanya diproses jika kolom B berisi 'Alumni'
              if (row[0] !== 'Alumni') return null; // Jika kolom B tidak berisi 'Alumni', skip baris ini

              // Menyusun data alumni
              const imageUrl = row[12] || ''; // Kolom N untuk gambar, pastikan tidak null
              const imageId = imageUrl.match(/id=([\w-]{25,})/)?.[1] || null;
              const imageDriveUrl = imageId
              ? `https://www.googleapis.com/drive/v3/files/${imageId}?alt=media&key=${API_KEY}`
              : "/images/default.svg";
              // Menyusun objek alumni
              return {
                name: row[8] || `Alumni ${index + 1}`, // Kolom J (Nama)
                npm: row[9] || "N/A", // Kolom K (NPM)
                bidangMinat: row[10] || "N/A", // Kolom L (Bidang Minat)
                title: row[11] || "Untitled Research", // Kolom M (Judul Penelitian)
                imgUrl: imageDriveUrl, // Gambar dari Google Drive
                projectLink: row[17] || "#", // Kolom R (Link Proyek)
                codeLink: row[18] || "#", // Kolom S (Link GitHub)
              };
            }).filter(Boolean); // Hapus nilai null yang dihasilkan oleh baris yang tidak sesuai atau tidak lengkap

            setAlumni(alumniData);
            setFilterAlumni(alumniData);
          }
        } else {
          console.error("Failed to fetch data from Google Sheets.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAlumniData();
  }, []);

  const handleAlumniFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === "All") {
        setFilterAlumni(alumni);
      } else {
        setFilterAlumni(alumni.filter((work) => work.bidangMinat.includes(item)));
      }
    }, 500);
  };

  const handleReadMore = (alumni) => {
    setSelectedAlumni(alumni);
    setModalOpen(true);
  };

  const truncateTitle = (title) => {
    const words = title.split(' ');
    return words.length > 5 ? words.slice(0, 5).join(' ') + '...' : title;
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <h2 className="head-text">
        MY <span>ALUMNI</span>
      </h2>
      <div>
        <span>INCLUDING MASTER AND UNDERGRADUATE STUDENTS</span>
      </div>

      <div className="app__alumni-filter">
        {["Data Mining", "RPL", "Jaringan", "GIS", "All"].map((item, index) => (
          <div
            key={index}
            onClick={() => handleAlumniFilter(item)}
            className={`app__alumni-filter-item app__flex p-text ${activeFilter === item ? "item-active" : ""}`}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app_alumni-portfolio"
      >
        {filterAlumni.length === 0 ? (
          <div className="no-data-container">
            <p>No alumni data found</p>
          </div>
        ) : (
          filterAlumni.map((alumni, index) => (
            <motion.div
              className="app_alumni-item app__flex"
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="app_alumni-img app__flex">
                <img src={alumni.imgUrl} alt={`${alumni.name} profile`} 
                onError={(e) => (e.target.src = "/images/default.svg")}/>
              </div>

              <div className="app_alumni-content app__flex">
                <div className="app__alumni-name">
                  {alumni.name}
                </div>
                <div className="app__alumni-bidang">
                  {alumni.bidangMinat}
                </div>
                <div className="app__alumni-npm">{alumni.npm}</div>
                <h4 className="app__alumni-title">{truncateTitle(alumni.title)}</h4>

                <button className="read-more" onClick={() => handleReadMore(alumni)}>
                  Read More
                </button>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Modal */}
      {modalOpen && selectedAlumni && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full transform transition-all ease-in-out duration-500 px-4 sm:px-6 md:px-8 mx-4 sm:mx-6 md:mx-8">
            <button
              className="absolute top-2 right-2 text-xl text-gray-700"
              onClick={closeModal}
            >
              X
            </button>
            <div className="flex flex-col items-center">
              <img
                src={selectedAlumni.imgUrl}
                alt={`${selectedAlumni.name} profile`}  // Memperbaiki alt tag
                className="w-40 h-40 object-cover rounded-full border-4 border-gray-300 mb-4"
              />
              <h2 className="text-xl font-bold">{selectedAlumni.name}</h2>
              <p className="text-gray-600 text-sm">{selectedAlumni.npm}</p>
              <p className="text-gray-600 text-sm">{selectedAlumni.bidangMinat}</p>
              <p className="text-gray-800 mt-2">{selectedAlumni.title}</p>

              <div className="mt-4 flex space-x-4">
                <a
                  href={selectedAlumni.codeLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  <AiFillGithub size={30} />
                </a>
                <a
                  href={selectedAlumni.linkedinLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  <AiFillLinkedin size={30} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppWrap(MotionWrap(Alumni, "app__alumni"), "alumni", "app__primarybg");
