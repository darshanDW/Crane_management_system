/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react';
import { ClipboardList, Package, Users, PenToolIcon as Tool, ArrowRight, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Menu as MuiMenu, MenuItem } from '@mui/material';
import { Menu as MenuIcon, ArrowForward, Email, Person, Message } from '@mui/icons-material';
import { motion } from 'framer-motion';

const Homepage = () => {
    const featuresRef = useRef(null);
    const aboutRef = useRef(null);
    const contactRef = useRef(null);

    const [openMenu, setOpenMenu] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState(null);

    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/get-started');
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <Header
                scrollToSection={scrollToSection}
                featuresRef={featuresRef}
                aboutRef={aboutRef}
                contactRef={contactRef}
                handleGetStarted={handleGetStarted}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                menuAnchor={menuAnchor}
                setMenuAnchor={setMenuAnchor}
            />

            <HeroSection handleGetStarted={handleGetStarted} />
            <FeaturesSection featuresRef={featuresRef} />
            <AboutSection aboutRef={aboutRef} />
            <ContactSection contactRef={contactRef} />
            <Footer />
        </div>
    );
};
const Header = ({ scrollToSection, featuresRef, aboutRef, contactRef, handleGetStarted, openMenu, setOpenMenu, menuAnchor, setMenuAnchor }) => (
    <motion.header
        className="bg-white text-gray-900 shadow-md fixed w-full z-20 top-0 left-0"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            {/* Logo Section */}
            <div className="flex items-center">
                <img
                    src="/crane.svg"
                    alt="Crane Logo"
                    className="h-9 w-8 object-contain mr-3"
                />
                <h1
                    className="text-2xl font-extrabold tracking-wide text-blue-600 cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    CraneRent Pro
                </h1>


            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
                {['Features', 'About', 'Contact'].map((item, index) => (
                    <motion.button
                        key={item}
                        onClick={() => scrollToSection([featuresRef, aboutRef, contactRef][index])}
                        className="text-lg font-medium hover:text-blue-600 transition duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {item}
                    </motion.button>
                ))}
                <motion.button
                    onClick={handleGetStarted}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-lg font-semibold hover:bg-blue-500 transition duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Get Started
                </motion.button>
            </nav>

            {/* Mobile Navigation */}
            <div className="md:hidden">
                <IconButton
                    onClick={(event) => {
                        setOpenMenu(!openMenu);
                        setMenuAnchor(event.currentTarget);
                    }}
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                >
                    <MenuIcon />
                </IconButton>
                <MuiMenu
                    anchorEl={menuAnchor}
                    open={openMenu}
                    onClose={() => setOpenMenu(false)}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    {['Features', 'About', 'Contact', 'Get Started'].map((item, index) => (
                        <MenuItem
                            key={item}
                            onClick={() => {
                                setOpenMenu(false);
                                if (index < 3) {
                                    scrollToSection([featuresRef, aboutRef, contactRef][index]);
                                } else {
                                    handleGetStarted();
                                }
                            }}
                            className="text-gray-800 hover:bg-gray-200 transition duration-300"
                        >
                            {item}
                        </MenuItem>
                    ))}
                </MuiMenu>
            </div>
        </div>
    </motion.header>
);

const HeroSection = ({ handleGetStarted }) => (
    <section className="bg-gradient-to-r text-white py-32 md:py-48 flex items-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img src="/crange_bg.jpg" alt="Crane" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black opacity-40" />
        </div>
        <motion.div
            className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="max-w-lg text-left">
                <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">Crane Rental Management System</h2>
                <p className="text-xl mb-8 leading-relaxed">
                    Streamline your crane rental operations with our comprehensive management solution. Manage contracts, inventory, customers, and maintenance all in one place.
                </p>
                <motion.button
                    onClick={handleGetStarted}
                    className="bg-white text-blue-600 px-6 py-3 rounded-md font-bold transition duration-300 flex items-center hover:bg-blue-500 hover:text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Get Started
                    <ArrowRight className="ml-2" />
                </motion.button>
            </div>

        </motion.div>
    </section>
);

const FeaturesSection = ({ featuresRef }) => (
    <section ref={featuresRef} className="py-20 md:py-40 bg-gray-100">
        <div className="container mx-auto px-4">
            <h3 className="text-3xl md:text-5xl font-extrabold text-center mb-12">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { icon: <ClipboardList className="h-12 w-12 text-blue-600" />, title: "Quoting & Contracts", description: "Streamline quoting process and manage contracts efficiently" },
                    { icon: <Package className="h-12 w-12 text-blue-600" />, title: "Inventory Management", description: "Keep track of your crane fleet and equipment inventory" },
                    { icon: <Users className="h-12 w-12 text-blue-600" />, title: "Customer Relations", description: "Enhance customer satisfaction with effective communication" },
                    { icon: <Tool className="h-12 w-12 text-blue-600" />, title: "Maintenance Tracking", description: "Monitor maintenance schedules and service history" }
                ].map((feature, index) => (
                    <FeatureCard key={index} {...feature} index={index} />
                ))}
            </div>
        </div>
    </section>
);

const FeatureCard = ({ icon, title, description, index }) => (
    <motion.div
        className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -5 }}
    >
        <div className="flex justify-center mb-4">{icon}</div>
        <h4 className="text-xl font-bold mb-2">{title}</h4>
        <p className="text-gray-600">{description}</p>
    </motion.div>
);

const AboutSection = ({ aboutRef }) => (
    <section ref={aboutRef} className="bg-white py-20 md:py-40">
        <motion.div
            className="container mx-auto px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
        >
            <h3 className="text-3xl md:text-5xl font-extrabold text-center mb-8">About CraneRent Pro</h3>
            <p className="text-gray-700 text-center max-w-3xl mx-auto text-lg">
                CraneRent Pro is a cutting-edge Crane Rental Management System designed to revolutionize the way crane rental companies operate. Our comprehensive solution addresses key challenges in the industry, providing efficient tools for quoting, contract management, inventory tracking, customer relations, and maintenance scheduling.
            </p>
        </motion.div>
    </section>
);

const ContactSection = ({ contactRef }) => (
    <section ref={contactRef} className="bg-gray-200 py-20 md:py-32">
        <div className="container mx-auto px-4">
            <h3 className="text-3xl md:text-5xl font-extrabold text-center mb-8">Contact Us</h3>
            <motion.div
                className="max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <form className="space-y-6">
                    {[
                        { icon: <Person className="text-gray-500" />, type: "text", placeholder: "Name" },
                        { icon: <Email className="text-gray-500" />, type: "email", placeholder: "Email" },
                        { icon: <Message className="text-gray-500" />, type: "textarea", placeholder: "Message", rows: 4 }
                    ].map((field, index) => (
                        <div key={index} className="flex items-center space-x-4">
                            {field.icon}
                            {field.type === "textarea" ? (
                                <textarea
                                    placeholder={field.placeholder}
                                    rows={field.rows}
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            ) : (
                                <input
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            )}
                        </div>
                    ))}
                    <motion.button
                        type="submit"
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Send Message
                    </motion.button>
                </form>
            </motion.div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
            <p>&copy; 2023 CraneRent Pro. All rights reserved.</p>
            <div className="mt-4">
                {['Privacy Policy', 'Terms of Service', 'Contact Us'].map((item, index) => (
                    <a key={index} href="#" className="text-gray-400 hover:text-white mx-2 transition duration-300">
                        {item}
                    </a>
                ))}
            </div>
        </div>
    </footer>
);

export default Homepage;
