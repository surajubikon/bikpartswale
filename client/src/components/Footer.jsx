import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { SlSocialFacebook } from "react-icons/sl";
import { RiTwitterXFill } from "react-icons/ri";
import { AiOutlineYoutube } from "react-icons/ai";
import logo2 from '../assets/logofooter.png';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-8">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <a href="/">
              <img src={logo2} alt="Logo" className="w-48 object-contain" />
            </a>
          </div>

          {/* Main Menu */}
          <div>
            <h3 className="font-bold text-lg mb-4">Main Menu</h3>
            <ul className="space-y-2">
              <li><a href="/about-us" className="hover:text-red-500">About Us</a></li>
              <li><a href="/return-policy" className="hover:text-red-500">Return Policy</a></li>
            </ul>
          </div>

          {/* Return and Exchanges */}
          <div>
            <h3 className="font-bold text-lg mb-4">Return and Exchanges</h3>
            <a href="/return-exchanges" className="text-blue-400 hover:text-blue-600 underline">
              Click to Return and Exchanges
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4 text-2xl">
              <a href="https://www.instagram.com" className="hover:text-red-500" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://twitter.com" className="hover:text-red-500" target="_blank" rel="noopener noreferrer"><RiTwitterXFill /></a>
              <a href="https://www.facebook.com" className="hover:text-red-500" target="_blank" rel="noopener noreferrer"><SlSocialFacebook /></a>
              <a href="https://www.youtube.com" className="hover:text-red-500" target="_blank" rel="noopener noreferrer"><AiOutlineYoutube /></a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-6 py-4 text-center text-gray-400 text-sm">
          © 2024 All rights reserved. Crafted by &nbsp;
          <a
            href="https://www.ubikon.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600"
          >
            Ubikon Technologies Pvt Ltd
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
