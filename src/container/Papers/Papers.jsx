import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Papers.scss";

const SPREADSHEET_ID = "1p7aHoR95gaTpaPH4kh5YPdgaPEQjuNBCJmRsBz5ss-A";
const API_KEY = "AIzaSyBSDF4KF73HLzyq2Gamqx0vl46Tsc1nLNw";
const RANGE = "Form Responses 1!B2:R";

const Papers = () => {
  const [papers, setPapers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedPaper, setExpandedPaper] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
        const response = await axios.get(url);
  
        if (response.status === 200) {
          const rows = response.data.values;
          // console.log("Data rows:", rows);
  
          if (rows) {
            const filteredData = rows
              .filter((row) => row[0] === "Papers")
              .map((row, index) => {
                const imageUrl = row[7] || ""; // Column I
                // console.log(`Row ${index}, URL dari spreadsheet:`, imageUrl);
  
                const imageId = imageUrl.match(/id=([\w-]{25,})/)?.[1] || null;
                // console.log(`Row ${index}, ID dari URL gambar:`, imageId);
  
                const driveImageUrl = imageId
                  ? `https://www.googleapis.com/drive/v3/files/${imageId}?alt=media&key=${API_KEY}`
                  : "/images/default.svg";
                // console.log(`Row ${index}, Drive Image URL:`, driveImageUrl);
  
                return {
                  title: row[2] || "Untitled",
                  description: row[3] || "No description available",
                  authors: row[4] || "Unknown authors",
                  year: row[5] || "Unknown year",
                  journal: row[6] || "Unknown journal",
                  imgUrl: driveImageUrl,
                  link: row[8] || "#", // Column I (paper link)
                };
              });
            setPapers(filteredData);
          }
        } else {
          setError("Error fetching data from Google Sheets.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please check your API Key and Spreadsheet permissions.");
      }
    };
  
    fetchData();
  }, []);
  

  const toggleReadMore = (index) => {
    setExpandedPaper(expandedPaper === index ? null : index);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPapers = papers.filter((paper) =>
    paper.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h2 className="head-text">
        OUR <span>PUBLICATIONS</span>
        <br />
      </h2>

      {error && <p className="error-message">{error}</p>}

      <div className="search-container">
        <input
          type="text"
          placeholder="Search Papers..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="app__profiles">
        {filteredPapers.map((paper, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, type: "tween" }}
            className="app__profiles-item"
            key={paper.title + index}
          >
            <img
              key={paper.imgUrl}
              src={paper.imgUrl}
              alt={paper.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/default.svg"; // Fallback image
              }}
            />
            <h3>{paper.title}</h3>
            <p>
              <strong>Authors:</strong> {paper.authors}
            </p>
            <p>
              <strong>Published:</strong> {paper.year} in {paper.journal}
            </p>
            <p>
              {expandedPaper === index
                ? paper.description
                : `${paper.description.slice(0, 50)}...`}
            </p>
            <button className="btn" onClick={() => toggleReadMore(index)}>
              {expandedPaper === index ? "Read Less" : "Read More"}
            </button>
            <a
              href={paper.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              Read Full Paper
            </a>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Papers, "app__papers"),
  "publications",
  "app__whitebg"
);
