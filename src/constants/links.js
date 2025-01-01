import { BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";

// Navbar links
const navbar_links = [
  "home",
  "papers",
  "alumni",
  "lab",
  "testimonial",
  "contact",
];

// Contact links
const contact_links = {
  email: "contactme@usk.ac.id",
  phone: "+1 (123) 456-789",
};

// Social links
const social_links = [
  {
    name: "Twitter",
    icon: <BsTwitter />,
    url: "http://twitter.com",
  },
  {
    name: "Facebook",
    icon: <FaFacebookF />,
    url: "http://facebook.com",
  },
  {
    name: "Github",
    icon: <AiFillGithub />,
    url: "http://github.com",
  },
];

// Source code
const source_code = "#";

// links
const links = {
  navbar_links,
  contact_links,
  social_links,
  source_code,
};

export default links;
