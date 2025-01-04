import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import { AppWrap, MotionWrap } from "../../wrapper";
import "./Students.scss";

const SPREADSHEET_ID = "1p7aHoR95gaTpaPH4kh5YPdgaPEQjuNBCJmRsBz5ss-A";
const RANGE = "Form Responses 1!B:AD"; 
const API_KEY = "AIzaSyBSDF4KF73HLzyq2Gamqx0vl46Tsc1nLNw";

const Students = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
    const [students, setStudents] = useState([]);
    const [filterStudents, setFilterStudents] = useState([]);
  
    useEffect(() => {
        const fetchStudentsData = async () => {
            try {
                const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
                const response = await axios.get(url);

                if (response.status === 200) {
                    const rows = response.data.values;
                    if (rows) {
                        const studentsData = rows.slice(1).map((row, index) => {
                            if (row[0] !== 'Students') return null;

                            const imageUrl = row[28] || '';
                            const imageId = imageUrl.match(/id=([\w-]{25,})/)?.[1] || null;
                            const imageDriveUrl = imageId
                                ? `https://www.googleapis.com/drive/v3/files/${imageId}?alt=media&key=${API_KEY}`
                                : "/images/default.svg";

                            return {
                                name: row[18] || `Students ${index + 1}`,
                                npm: row[19] || "N/A",
                                bidangMinat: row[20] || "N/A",
                                imgUrl: imageDriveUrl,
                            };
                        }).filter(Boolean);

                        setStudents(studentsData);
                        setFilterStudents(studentsData);
                    }
                } else {
                    console.error("Failed to fetch data from Google Sheets.");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchStudentsData();
    }, []);

    const handleStudentsFilter = (item) => {
        setActiveFilter(item);
        setAnimateCard([{ y: 100, opacity: 0 }]);

        setTimeout(() => {
            setAnimateCard([{ y: 0, opacity: 1 }]);
            if (item === "All") {
                setFilterStudents(students);
            } else {
                setFilterStudents(students.filter((work) => work.bidangMinat.includes(item)));
            }
        }, 500);
    };
   

    return (
        <>
            <h2 className="head-text">MY <span>STUDENTS</span></h2>
            <div><span>A VALUEABLE OPPORTUNITY FOR STUDENTS TO GAIN EXPERIENCE</span></div>

            <div className="app__students-filter">
                {["Data Mining", "RPL", "Jaringan", "GIS", "All"].map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleStudentsFilter(item)}
                        className={`app__students-filter-item app__flex p-text ${activeFilter === item ? "item-active" : ""}`}
                    >
                        {item}
                    </div>
                ))}
            </div>

            <motion.div
                animate={animateCard}
                transition={{ duration: 0.5, delayChildren: 0.5 }}
                className="app__students-portfolio"
            >
                {filterStudents.length === 0 ? (
                    <div className="no-data-container">
                        <p>No students data found</p>
                    </div>
                ) : (
                    filterStudents.map((student, index) => (
                        <motion.div
                            className="app__students-item"
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="app__students-item-container">
                                <div className="app__students-item-image">
                                    <img
                                        src={student.imgUrl}
                                        alt={`${student.name} profile`}
                                        onError={(e) => (e.target.src = "/images/default.svg")}
                                    />
                                </div>

                                <div className="app__students-item-content">
                                    <h3 className="app__students-name">{student.name}</h3>
                                    <p className="app__students-bidang">{student.bidangMinat}</p>
                                    <p className="app__students-npm">{student.npm}</p>
                                  
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </motion.div>

          
        </>
    );
};

export default AppWrap(
    MotionWrap(Students, "app__students"),
    "students",
    "app__primarybg"
);
