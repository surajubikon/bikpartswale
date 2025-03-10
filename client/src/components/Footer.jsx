import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { SlSocialFacebook } from "react-icons/sl";
import { RiTwitterXFill } from "react-icons/ri";
import { AiOutlineYoutube } from "react-icons/ai";
import googleplay from "../assets/store.png";
import logo2 from '../assets/logofooter.png';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-8">
      <div className='container mx-auto px-4 sm:px-8'>
        <div className="flex flex-col items-start self-start mb-6">
          <a href="/" className="">
            <img
              width={200}
              src={logo2}
              alt="Logo"
              className="object-contain"
              style={{ position: "relative", top: "-60px", left: "-40px" }}
            />

          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Main Menu</h3>
            <ul className="space-y-2">
              <li><a href="/about-us" className="hover:text-red-500">About Us</a></li>
              <li><a href="/return-policy" className="hover:text-red-500">Return Policy</a></li>

            </ul>
          </div>

          {/* <div>  
            <h3 className="font-bold text-lg mb-4">Spares Category</h3>  
            <ul className="space-y-2">  
              <li><a href="/brake-parts" className="hover:text-red-500">Brake Parts</a></li>  
              <li><a href="/bike-body-parts" className="hover:text-red-500">Bike Body Parts</a></li>  
              <li><a href="/electrical-control-system" className="hover:text-red-500">Electrical & Control System</a></li>  
              <li><a href="/engine-parts-fuel-system" className="hover:text-red-500">Engine Parts & Fuel System</a></li>  
              <li><a href="/transmission-parts" className="hover:text-red-500">Transmission Parts</a></li>  
            </ul>  
          </div>   */}

          {/* <div>  
            <h3 className="font-bold text-lg mb-4">Spares By Bike Brands</h3>  
            <ul className="space-y-2">  
              <li><a href="/spares-hero" className="hover:text-red-500">Hero</a></li>  
              <li><a href="/spares-bajaj" className="hover:text-red-500">Bajaj</a></li>  
              <li><a href="/spares-honda" className="hover:text-red-500">Honda</a></li>  
              <li><a href="/spares-tvs" className="hover:text-red-500">TVS</a></li>  
              <li><a href="/spares-suzuki" className="hover:text-red-500">Suzuki</a></li>  
              <li><a href="/spares-ktm" className="hover:text-red-500">KTM</a></li>  
              <li><a href="/spares-royal-enfield" className="hover:text-red-500">Royal Enfield</a></li>  
            </ul>  
          </div>   */}

          <div className="space-y-4">

            <h3 className="font-bold text-lg mb-4">Return and Exchanges</h3>
            <a href="/return-exchanges" className="text-blue-400 hover:text-blue-600 underline">
              Click to Return and Exchanges
            </a>

            {/* App Download Links */}
            {/* Uncomment if needed */}
            {/* <div className="flex gap-4">  
                <a href="#">  
                    <img  
                      src={googleplay}  
                      alt="Google Play"  
                      className="w-32"  
                    />  
                </a>  
                <a href="#">  
                    <img  
                      src={appleeplay}  
                      alt="App Store"  
                      className="w-32"  
                    />  
                </a>  
            </div> */}

            {/* Social Media Icons */}
            <div className="flex gap-4 mt-4 text-2xl">
              <a href="https://www.instagram.com" className="hover:text-red-500" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://twitter.com" className="hover:text-red-500" target="_blank" rel="noopener noreferrer"><RiTwitterXFill /></a>
              <a href="https://www.facebook.com" className="hover:text-red-500" target="_blank" rel="noopener noreferrer"><SlSocialFacebook /></a>
              <a href="https://www.youtube.com" className="hover:text-red-500" target="_blank" rel="noopener noreferrer"><AiOutlineYoutube /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-8 py-4 text-center text-gray-400 text-sm">
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
    </footer>
  );
};

export default Footer;