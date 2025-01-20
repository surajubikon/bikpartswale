import React, { useState } from 'react';
import logo from '../assets/logobiike.png';
import Search from './Search';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser, FaShoppingCart } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { useSelector } from 'react-redux';
import { useGlobalContext } from '../provider/GlobalProvider';
import DisplayCartItem from './DisplayCartItem';
import UserMenu from './UserMenu';
// import { GoTriangleUp, GoTriangleDown } from 'react-icons/go';  
import { FaUserCircle } from 'react-icons/fa'; // Example icon, replace with your preferred one  

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state?.user);
    const cartItem = useSelector((state) => state.cartItem.cart);
    const { totalPrice, totalQty } = useGlobalContext();
    const [openCartSection, setOpenCartSection] = useState(false);
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const redirectToLoginPage = () => {
        navigate('/login');
    };

    const handleUserMenuToggle = () => {
        setOpenUserMenu((prev) => !prev);
    };

    const handleMobileMenuToggle = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <header className="h-28 lg:h-24 lg:shadow-md sticky top-0 z-40 flex flex-col bg-white">
            {/* Main Header */}
            <div className="container mx-auto flex items-center justify-between px-4">
                {/* Logo */}
                <div className="h-full">
                    <Link to="/" className="h-full flex justify-center items-center">
                        <img
                            src={logo}
                            width={170}
                            height={60}
                            alt="logo"
                            className="hidden lg:block"
                        />
                        <img
                            src={logo}
                            width={120}
                            height={60}
                            alt="logo"
                            className="lg:hidden"
                        />
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="hidden lg:block flex-1 px-4">
                    <Search />
                </div>

                {/* Icons and Hamburger */}
                <div className="flex items-center gap-6">
                    {/* Account Section */}
                    {user?._id ? (
                        <div className="relative">
                         

                            <button
                                onClick={handleUserMenuToggle}
                                className="flex items-center gap-1 text-gray-700 cursor-pointer"
                            >
                                <FaUserCircle size={20} /> {/* Replace with your desired icon */}
                                {openUserMenu ? <GoTriangleUp size={20} /> : <GoTriangleDown size={20} />}
                            </button>
                            {openUserMenu && (
                                <div className="absolute right-0 top-10 bg-white rounded shadow-lg p-4 min-w-[150px]">
                                    <UserMenu close={() => setOpenUserMenu(false)} />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <FaRegUser
                                className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
                                size={24}
                            />
                            <button
                                onClick={redirectToLoginPage}
                                className="bg-red-500 text-white font-medium py-1.5 px-3 rounded-md shadow hover:bg-red-800 transition-all duration-200"
                            >
                                Login
                            </button>
                        </div>
                    )}

                    {/* Cart Section */}
                    <button
                        onClick={() => setOpenCartSection(true)}
                        className="flex items-center gap-2"
                    >
                        <FaShoppingCart
                            className="text-red-500 hover:text-red-600 transition-colors duration-200"
                            size={24}
                        />
                        <div className="text-sm bg-red-500 text-white px-3 py-1 rounded-md">
                            {cartItem.length ? (
                                <div>
                                    <p>{totalQty} Items</p>
                                    <p>{`₹${totalPrice}`}</p>
                                </div>
                            ) : (
                                <p>My Cart</p>
                            )}
                        </div>
                    </button>

                    {/* Hamburger Menu */}
                    <button onClick={handleMobileMenuToggle} className="lg:hidden">
                        <GiHamburgerMenu size={28} className="text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Marquee */}
            <div className="bg-gray-900 text-white h-10 flex items-center overflow-hidden whitespace-nowrap font-bold">
                <div className="animate-marquee flex space-x-10">
                    <span className="px-10">🚴 Premium Quality Parts | 🔧 Discounts Available | 🏍️ Exclusive Deals on Accessories! Shop Now!</span>
                </div>
            </div>

            {/* Mobile Search */}
            <div className="container mx-auto px-2 lg:hidden">
                <Search />
            </div>

            {/* Cart Section */}
            {openCartSection && <DisplayCartItem close={() => setOpenCartSection(false)} />}
            {/** Mobile Menu */}
            {isMenuOpen && (
                <div className="absolute top-20 right-0 w-full bg-white shadow-md z-50">
                    <ul className="flex flex-col items-start py-4 pl-4"> {/* Changed items-center to items-start and added pl-4 */}
                        <li className="w-full">
                            <button
                                onClick={() => { navigate('/about-us'); setIsMenuOpen(false); }}
                                className="text-gray-700 hover:text-blue-500 w-full text-right pr-4">
                                About Us
                            </button>
                        </li>
                        <li className="w-full">
                            <button
                                onClick={() => { navigate('/blogs'); setIsMenuOpen(false); }}
                                className="text-gray-700 hover:text-blue-500 w-full text-right pr-4">
                                Blogs
                            </button>
                        </li>
                        <li className="w-full">
                            <button
                                onClick={() => { navigate('/faqs'); setIsMenuOpen(false); }}
                                className="text-gray-700 hover:text-blue-500 w-full text-right pr-4">
                                FAQs
                            </button>
                        </li>
                        <li className="w-full">
                            <button
                                onClick={() => { navigate('/contact'); setIsMenuOpen(false); }}
                                className="text-gray-700 hover:text-blue-500 w-full text-right pr-4">
                                Contact
                            </button>
                        </li>
                        <li className="w-full">
                            <button
                                onClick={() => { navigate('/return-exchanges'); setIsMenuOpen(false); }}
                                className="text-gray-700 hover:text-blue-500 w-full text-right pr-4">
                                Returns & Exchanges
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;
