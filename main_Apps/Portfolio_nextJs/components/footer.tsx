import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa"; // Importing icons

export default function Footer() {
  return (
    <footer className="mb-10 px-4 text-center text-gray-500">
      {/* Copyright and Website Info */}
      <small className="mb-2 block text-xs">
        &copy; 2024 Aoulad Amar Samir. All rights reserved.
      </small> 
      {/* Social Icons */}
      <div className="flex justify-center gap-6 mb-4">
        <a
          href="https://github.com/samir20-23"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-indigo-600 transition duration-300 ease-in-out transform hover:scale-110"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/samir-aoulad-amar-a238a9334/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-110"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="https://x.com/Samir_Germany1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-110"
        >
          <FaTwitter size={24} />
        </a>
        <a
          href="mailto:aouladamarsamir@gmail.com"
          className="text-gray-600 hover:text-red-500 transition duration-300 ease-in-out transform hover:scale-110"
        >
          <FaEnvelope size={24} />
        </a>
      </div>

      {/* Disclaimer or Additional Text */}
     
    </footer>
  );
}
