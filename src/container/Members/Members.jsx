import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import { AppWrap, MotionWrap } from "../../wrapper";
import "./Members.scss";
import { generateDriveImageUrl } from "../../utils/utils";

const SPREADSHEET_ID = "1p7aHoR95gaTpaPH4kh5YPdgaPEQjuNBCJmRsBz5ss-A";
const RANGE = "Form Responses 1!B:AD";
const API_KEY = "AIzaSyBSDF4KF73HLzyq2Gamqx0vl46Tsc1nLNw";

const Members = () => {
    const [members, setMembers] = useState([]);
    const [isExpanded, setIsExpanded] = useState([]);

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
                const response = await axios.get(url);

                if (response.status === 200) {
                    const rows = response.data.values;
                    if (rows) {
                        const membersData = rows.slice(1).map((row, index) => {
                            if (row[0] !== "Members") return null;    
                            return {
                                id: index,
                                name: row[21] || `Member ${index + 1}`,
                                role: row[22] || "N/A",
                                description: row[23] || "N/A",
                                photo: generateDriveImageUrl(row[27] || "", API_KEY),
                                website: row[24] || "N/A",
                                email: row[25] || "N/A",
                                category: row[26] || "General",
                            };
                        }).filter(Boolean);

                        setMembers(membersData);
                        setIsExpanded(new Array(membersData.length).fill(false));
                    }
                } else {
                    console.error("Failed to fetch data from Google Sheets.");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchMemberData();
    }, []);

    const truncateText = (text, wordLimit) => {
        const words = text.split(" ");
        if (words.length > wordLimit) {
            return { truncated: words.slice(0, wordLimit).join(" "), isTruncated: true };
        }
        return { truncated: text, isTruncated: false };
    };

    const toggleExpand = (index) => {
        setIsExpanded((prevState) =>
            prevState.map((expanded, i) => (i === index ? !expanded : expanded))
        );
    };

    return (
        <div className="app__members">
            <h2 className="head-text">Our <span>Team Members</span></h2>
            <div className="app__members-list">
                {members.map((member, index) => {
                    const { truncated, isTruncated } = truncateText(member.description, 30);

                    return (
                        <motion.div
                            className="app__members-item"
                            key={member.id}
                            whileInView={{ opacity: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Foto di kiri */}
                            <div className="app__members-item-left">
                                <img
                                    src={member.photo}
                                    alt={`${member.name}`}
                                    onError={(e) => (e.target.src = "/images/default.svg")}
                                />
                            </div>
                            {/* Teks di kanan */}
                            <div className="app__members-item-right">
                                <h3 className="app__members-name">{member.name}</h3>
                                <p className="app__members-role">{member.role}</p>
                                <p className="app__members-description">
                                    {isExpanded[index] ? member.description : truncated}
                                    {isTruncated && (
                                        <button
                                            onClick={() => toggleExpand(index)}
                                            className="read-more-btn"
                                        >
                                            {isExpanded[index] ? "Show Less" : "Read More"}
                                        </button>
                                    )}
                                </p>
                                <div className="app__members-contact">
                                    {member.website !== "N/A" && (
                                        <a href={member.website} target="_blank" rel="noopener noreferrer">
                                            Visit Website
                                        </a>
                                    )}
                                    {member.email !== "N/A" && (
                                        <a href={`mailto:${member.email}`}>Send Email</a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default AppWrap(MotionWrap(Members, "members"), "members", "app__primarybg");
