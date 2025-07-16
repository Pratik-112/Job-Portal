import React from "react";
import {Outlet} from "react-router-dom";
import OnBoarding from "@/pages/onboarding";
import Header from "@/components/header"
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const AppLayout = function(){
     // grid-background is custom class.
    return(
        <>
            <div className = "grid-background"></div>     
            <div className = "min-h-screen container">
                <Header/>
                <Outlet/>
                <footer className="bg-gray-900 text-white py-6">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
                
                <div>
                    <h2 className="text-xl font-bold">Steganography Tool</h2>
                    <p className="text-gray-400 mt-2">Securely hide and extract messages from media files.</p>
                </div>

                {/* Privacy & Security Message */}
                <div className="flex flex-col justify-center">
                    <p className="text-gray-400 text-sm">
                        Empowering secure communication &mdash; Your privacy, our priority.
                    </p>
                    <p className="text-gray-400 text-sm mt-4">
                        Confidentiality in every bit.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold">Quick Links</h3>
                    <ul className="mt-2 space-y-2">
                        <li><NavLink to="/about" className="hover:text-blue-400">About Us</NavLink></li>
                        <li><NavLink to="/contact" className="hover:text-blue-400">Contact</NavLink></li>
                        <li><NavLink to="/privacy-policy" className="hover:text-blue-400">Privacy Policy</NavLink></li>
                    </ul>
                </div>

                {/* Social Media Links */}
                <div>
                    <h3 className="text-lg font-semibold">Follow Us</h3>
                    <div className="flex justify-center md:justify-start space-x-4 mt-2">
                        <a href="#" target="_blank" className="text-blue-400 hover:text-blue-500">
                            <FontAwesomeIcon icon={faFacebook} className="text-4xl" />
                        </a>
                        <a href="#" target="_blank" className="text-blue-300 hover:text-blue-400">
                            <FontAwesomeIcon icon={faTwitter} className="text-4xl" />
                        </a>
                        <a href="#" target="_blank" className="text-pink-500 hover:text-pink-600">
                            <FontAwesomeIcon icon={faInstagram} className="text-4xl" />
                        </a>
                        <a href="#" target="_blank" className="text-blue-600 hover:text-blue-700">
                            <FontAwesomeIcon icon={faLinkedin} className="text-4xl" />
                        </a>
                    </div>
                </div>

            </div>

            {/* Copyright Section */}
            <div className="text-center text-gray-500 mt-6 border-t border-gray-700 pt-4">
                &copy; {new Date().getFullYear()} Steganography Tool. All rights reserved.
            </div>
        </footer>
            </div>   
            
        </>
    )
};

export default AppLayout;