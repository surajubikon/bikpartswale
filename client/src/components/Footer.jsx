import React from 'react'

import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { SlSocialFacebook } from "react-icons/sl";
import { RiTwitterXFill } from "react-icons/ri";
import { AiOutlineYoutube } from "react-icons/ai";



import googleplay from "../assets/store.png";
import logo2 from '../assets/logobiike.png'




const Footer = () => {
  return (
    <footer className="bg-black2 text-white pt-8"> 
        <div className='container mx-auto px-8'>
            <div className="flex gap-4 mb-6">
                <a href="#" className="">
                    <img
                    width={200}  
                    src={logo2}
                    alt="Google Play"
                    className="object-contain"
                    />
                </a>
            </div>

            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            

                {/* Main Menu */}
                <div>
                <h3 className="font-bold text-lg mb-4">Main Menu</h3>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:text-red-500">About Us</a></li>
                    <li><a href="#" className="hover:text-red-500">Contact Us</a></li>
                    <li><a href="#" className="hover:text-red-500">Wholesale Prices</a></li>
                    <li><a href="#" className="hover:text-red-500">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-red-500">Return Policy</a></li>
                    <li><a href="#" className="hover:text-red-500">Shipping Policy</a></li>
                </ul>
                </div>

                {/* Spares Category */}
                <div>
                <h3 className="font-bold text-lg mb-4">Spares Category</h3>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:text-red-500">Brake Parts</a></li>
                    <li><a href="#" className="hover:text-red-500">Bike Body Parts</a></li>
                    <li><a href="#" className="hover:text-red-500">Electrical & Control System</a></li>
                    <li><a href="#" className="hover:text-red-500">Engine Parts & Fuel System</a></li>
                    <li><a href="#" className="hover:text-red-500">Transmission Parts</a></li>
                </ul>
                </div>

                {/* Spares By Bike Brands */}
                <div>
                <h3 className="font-bold text-lg mb-4">Spares By Bike Brands</h3>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:text-red-500">Hero</a></li>
                    <li><a href="#" className="hover:text-red-500">Bajaj</a></li>
                    <li><a href="#" className="hover:text-red-500">Honda</a></li>
                    <li><a href="#" className="hover:text-red-500">TVS</a></li>
                    <li><a href="#" className="hover:text-red-500">Suzuki</a></li>
                    <li><a href="#" className="hover:text-red-500">KTM</a></li>
                    <li><a href="#" className="hover:text-red-500">Royal Enfield</a></li>
                </ul>
                </div>

                {/* Return and Exchanges */}
                <div className="space-y-4">
                <h3 className="font-bold text-lg mb-4">Return and Exchanges</h3>
                <a href="#" className="text-blue-400 hover:text-blue-600 underline">
                    Click to Return and Exchanges
                </a>

                {/* App Download Links */}

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
                <div className="flex gap-4 mt-4 text-2xl socile">
                    <a href="#" className="hover:text-red-500"><FaInstagram /></a>
                    <a href="#" className="hover:text-red-500"><RiTwitterXFill /></a>
                    <a href="#" className="hover:text-red-500"><SlSocialFacebook /></a>
                    <a href="#" className="hover:text-red-500"><AiOutlineYoutube /></a>
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



export default Footer
