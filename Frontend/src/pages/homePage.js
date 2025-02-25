import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaUserPlus, FaInfoCircle, FaUserFriends, FaHandshake, } from 'react-icons/fa';
import image3 from '../images/image3-transformed.jpeg';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './homePage.css';



// Scroll function for smooth scrolling
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};


const HorizontalLine = () => (
  <div className="border-t border-maroon-600 my-8 h-1" />
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-maroon-600 to-gray-800 shadow-md fixed mx-auto w-full z-30">
      <div className="container mx-auto px-10 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl text-white font-bold">
            <a href="/" className="hover:underline">VivahBandh</a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {["home", "about-us", "Guide", "partners", "contact-us"].map((label) => (
              <button
                key={label}
                onClick={() => scrollToSection(label)}
                className="text-white hover:text-pink-400 transition duration-300"
              >
                {label.replace("-", " ").toUpperCase()}
              </button>
            ))}
          </div>

          {/* Register and Get Masika Buttons for Desktop */}
          <div className="hidden md:flex space-x-4">
            <a
              href="https://forms.gle/fyaYY23Sg5N4yWR38"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-maroon-600 font-bold text-white px-4 py-2 rounded-full hover:bg-pink-500 transition duration-300"
            >
              Register
            </a>
            <a
              href="https://forms.gle/k93HJE52zeqt5Nkz9"
              className="bg-maroon-600 font-bold text-white px-4 py-2 rounded-full hover:bg-pink-500 transition duration-300"
            >
              Get Masika
            </a>
          </div>

          {/* Hamburger Menu Icon for Mobile */}
          <div className="md:hidden flex items-center justify-end pr-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none -mr-7"
            >
              <svg
                className="h-7 w-7 fill-current"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gradient-to-r from-maroon-600 to-gray-800 shadow-md bg-opacity-100 p-4 absolute top-full left-0 right-0 z-30 overflow-auto max-h-[calc(100vh-4rem)]">
            {["home", "about-us", "Guide", "partners", "contact-us"].map((label) => (
              <button
                key={label}
                onClick={() => {
                  scrollToSection(label);
                  setIsOpen(false);
                }}
                className="block text-white hover:text-pink-400 transition duration-300 py-2 text-left w-full"
              >
                {label.replace("-", " ").toUpperCase()}
              </button>
            ))}

            {/* Register and Get Masika Buttons for Mobile */}
            <a
              href="https://forms.gle/fyaYY23Sg5N4yWR38"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-maroon-600 font-bold text-white px-4 py-2 rounded-full hover:bg-pink-500 transition duration-300 text-center w-full mt-2"
            >
              Register
            </a>
            <a
              href="https://forms.gle/k93HJE52zeqt5Nkz9"
              className="block bg-maroon-600 font-bold text-white px-4 py-2 rounded-full hover:bg-pink-500 transition duration-300 text-center w-full mt-2"
            >
              Get Masika
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};


const Hero = () => {
  // Add hooks for detecting when the text is in view
  const { ref: textInViewRef, inView: textInView } = useInView({ threshold: 0.3 });

  return (
    <div className="relative flex items-center min-h-screen bg-pink-200 pt-[64px] md:pt-[64px]" id="home">
      {/* Image Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={image3}
          alt="Indian Wedding Ceremony"
          className="w-full h-full object-cover" // Ensures the image covers the entire area
        />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-600 to-transparent opacity-70"></div>

        {/* Bottom Wave Shape */}
        <div className="absolute bottom-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block w-full h-[80px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="#FEE2E2" // Matching the pink background color
          >
            <path d="M0,0 C600,80 600,80 1200,0 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </div>

      {/* Text Content with Left-to-Right Animation */}
      <div className="relative z-10 max-w-lg text-white mx-auto text-center px-4 md:ml-[150px]">
        <motion.h3
          ref={textInViewRef}
          initial={{ opacity: 0, x: -100 }}
          animate={textInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
          transition={{ duration: 0.7 }}
          className="text-2xl md:text-3xl font-bold mb-4"
        >
          Find Your
        </motion.h3>

        <motion.h1
          initial={{ opacity: 0, x: -100 }}
          animate={textInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Life Partner
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: -100 }}
          animate={textInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-lg mb-6"
        >
          Join us to find your perfect match, because love knows no boundaries!
        </motion.p>

        <motion.p
          initial={{ opacity: 0, x: -100 }}
          animate={textInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base md:text-lg mb-6"
        >
          At VivahBandh, we believe that every individual deserves to find a companion who complements their life.
        </motion.p>

        {/* <motion.a
          href="/register"
          initial={{ opacity: 0, x: -100 }}
          animate={textInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="bg-maroon-600 font-bold text-white px-6 py-3 rounded-full hover:bg-pink-500 transition duration-300"
        >
          Get Started
        </motion.a> */}
      </div>
    </div>
  );
};


const Welcome = () => {
  const { ref: imageInViewRef, inView: imageInView } = useInView({ threshold: 0.3 });
  const { ref: textInViewRef, inView: textInView } = useInView({ threshold: 0.3 });

  return (
    <div className="container mx-auto px-6 py-12 bg-pink-200" id="welcome">
      <div className="flex flex-col md:flex-row flex-wrap items-center">
        {/* Image Sliding from Top */}
        <motion.div
          ref={imageInViewRef}
          initial={{ opacity: 0, y: -50 }}
          animate={imageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.9 }}
          className="flex-1 flex justify-center my-4 md:my-2 z-10" // Adjusting for mobile and desktop view
        >
          <img
            src="https://i.pinimg.com/736x/4c/00/36/4c00363e9a49f10eeaa584ddaf45da11.jpg"
            alt="Happy Couple"
            className="w-full max-w-[400px] md:max-w-[500px] h-auto rounded-3xl object-cover mb-6"
          />
        </motion.div>

        {/* Text Sliding from Bottom */}
        <motion.div
          ref={textInViewRef}
          initial={{ opacity: 0, y: 50 }}
          animate={textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-1/2 md:pl-8 text-center md:text-left" // Centered text on mobile, aligned left on larger screens
        >
          <h2 className="text-4xl font-bold mb-4">
            Welcome To <span className="text-maroon-600">VivahBandh.</span>
          </h2>
          <p className="mb-4">
            We connect individuals seeking life partners, ensuring they find their perfect match among millions of verified profiles.
          </p>
          <p className="mb-4">
            Our platform offers a variety of features, including advanced search options, matchmaking algorithms, and personalized recommendations tailored to your preferences.
          </p>
          <ul className="space-y-2">
            {[
              'Trustworthy and verified profiles',
              'User-friendly design',
              'Dedicated support to assist you',
              'In-depth profiles and preferences',
            ].map((item, index) => (
              <li key={index} className="flex items-center justify-center md:justify-start text-gray-700">
                <svg
                  className="w-5 h-5 text-maroon-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

const AboutUs = () => {
  const { ref: imageInViewRef, inView: imageInView } = useInView({ threshold: 0.3 });
  const { ref: textInViewRef, inView: textInView } = useInView({ threshold: 0.3 });

  return (
    <div className="container mx-auto px-6 py-12 bg-pink-200" id="about-us">
      <div className="flex flex-col md:flex-row flex-wrap items-center">
        {/* Text Sliding from Bottom */}
        <motion.div
          ref={textInViewRef}
          initial={{ opacity: 0, y: 50 }}
          animate={textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-1/2 md:pr-8 text-center md:text-left pl-4 md:pl-9" // Adjusted padding for mobile
        >
          <h2 className="text-4xl font-bold mb-4">About Us</h2>
          <p className="mb-4">
            Welcome to VivahBandh! We’re here to make your journey of finding the perfect partner a joyful and memorable experience. With years of expertise and thousands of happy couples matched, we’re dedicated to helping you connect with someone truly special.
          </p>
          <p className="mb-4">
            Our mission is simple: to provide a safe, easy, and trustworthy platform where singles can meet, connect, and start their happily-ever-after! With advanced tech and careful profile checks, we ensure that each connection is genuine, giving you peace of mind as you search for the one.
          </p>
          <p className="mb-4">
            VivahBandh is all about creating a personal, exciting experience. So why wait? Join us, and let’s bring a little more love and laughter into your life!
          </p>
        </motion.div>

        {/* Image Sliding from Top */}
        <motion.div
          ref={imageInViewRef}
          initial={{ opacity: 0, y: -50 }}
          animate={imageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.9 }}
          className="flex-1 flex justify-center my-4 md:my-2 z-0" // Adjusted for mobile view
        >
          <img
            src="https://knotsbyamp.com/wp-content/blogs.dir/1/files/jayanti-nidhish/PRA1322.JPG"
            alt="About Us"
            className="w-full max-w-[400px] md:max-w-[600px] h-auto rounded-3xl object-cover mb-6"
          />
        </motion.div>
      </div>
    </div>
  );
};

const Guide = () => {
  const steps = [
    {
      title: "Register",
      icon: <FaUserPlus className="text-white text-4xl" />,
      description: "Register to our website, fill up your profile completely, and put a beautiful image on your profile.",
      bgColor: "bg-maroon-500"
    },
    {
      title: "Get Details",
      icon: <FaInfoCircle className="text-white text-4xl" />,
      description: "Provide more information about yourself.",
      bgColor: "bg-maroon-600"
    },
    {
      title: "Find Partners",
      icon: <FaUserFriends className="text-white text-4xl" />,
      description: "Search for compatible matches.",
      bgColor: "bg-maroon-700"
    },
    {
      title: "Connect",
      icon: <FaHandshake className="text-white text-4xl" />,
      description: "Add friends, approach them, and chat with them.",
      bgColor: "bg-maroon-900"
    }
  ];

  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  return (
    <div className="py-16 bg-pink-200" id="Guide">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-8">How It Works</h2>
        <p className="text-lg text-center mb-8 text-gray-700">
          At VivahBandh, we simplify the matchmaking process for you. Follow these easy steps to connect with your ideal partner.
          Each step is designed to ensure a seamless experience while searching for meaningful relationships.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center" ref={ref}>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`shadow-xl rounded-lg p-6 mx-4 my-4 flex flex-col items-center justify-center h-[300px] w-[250px] transition-transform duration-300 ${step.bgColor} hover:scale-105`}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="mb-2 flex items-center justify-center"
              >
                {step.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-2 text-white text-center">{step.title}</h3>
              <p className="text-white text-center">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Partners = () => {
  const { ref: textRef, inView: textInView } = useInView({ threshold: 0.2 });
  const { ref: leftColumnRef, inView: leftColumnInView } = useInView({ threshold: 0.2 });
  const { ref: rightColumnRef, inView: rightColumnInView } = useInView({ threshold: 0.2 });

  return (
    <div className="py-16 bg-pink-200" id="partners">
      <div className="container mx-auto px-6 overflow-hidden"> {/* Added overflow-hidden */}

        {/* Title and Description with Smooth Animation */}
        <motion.h2
          ref={textRef}
          initial={{ opacity: 0, y: -20 }}
          animate={textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-8"
        >
          Start Looking For Your Partner
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-8"
        >
          Begin your journey of love and companionship with <strong>VivahBandh.</strong>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-4"
        >
          We offer exclusive access to a curated database of profiles featured in the monthly publication{" "}
          <strong>VivahBandh Masik</strong>, where individuals interested in finding their perfect partner are listed.
          By subscribing to our masik, you'll get the latest profiles delivered to you, making your search for
          companionship more efficient.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-4"
        >
          Explore our vast database and connect with potential matches that suit your preferences. Let love guide you to
          a fulfilling relationship! Our dedicated customer service team is always ready to assist you with any queries
          to ensure a smooth experience.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mb-4"
        >
          Don't wait any longer—subscribe to <strong>VivahBandh Masik</strong> and start your journey today. Your
          perfect partner awaits!
        </motion.p>

        {/* Call-to-Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={textInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center flex justify-center space-x-4" // Added flex and space between buttons
        >
          <button
            className="bg-maroon-600 text-white px-6 py-3 rounded-lg shadow hover:bg-maroon-700 transition duration-200"
            onClick={() => window.open("https://forms.gle/fyaYY23Sg5N4yWR38", "_blank")}
          >
            Join Now
          </button>

          <button
            className="bg-maroon-600 text-white px-6 py-3 rounded-lg shadow hover:bg-maroon-700 transition duration-200"
            onClick={() => window.open("https://forms.gle/k93HJE52zeqt5Nkz9", "_blank")} // Replace with the actual URL for "Get Masik"
          >
            Get Masika
          </button>
        </motion.div>

        {/* Testimonials Section with Smooth Animation */}
        <h3 className="text-3xl font-bold text-center mt-16 mb-8">What Our Users Say</h3>
        <div className="grid md:grid-cols-2 gap-8">

          {/* Left Column Sliding in from the Left */}
          <motion.div
            ref={leftColumnRef}
            initial={{ opacity: 0, x: -100 }}
            animate={leftColumnInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-gray-100 rounded-lg shadow-lg p-6 hover:bg-gray-200 transition duration-300"
          >
            <p className="text-gray-700 italic text-lg mb-4 leading-relaxed">
              "VivahBandh helped me find my soulmate! The profiles are genuine and the support team is fantastic."
            </p>
            <h4 className="font-semibold text-center text-xl text-maroon-600">Aisha</h4>
          </motion.div>

          {/* Right Column Sliding in from the Right */}
          <motion.div
            ref={rightColumnRef}
            initial={{ opacity: 0, x: 100 }}
            animate={rightColumnInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-gray-100 rounded-lg shadow-lg p-6 hover:bg-gray-200 transition duration-300"
          >
            <p className="text-gray-700 italic text-lg mb-4 leading-relaxed">
              "I had a great experience using VivahBandh. The matching algorithm is impressive!"
            </p>
            <h4 className="font-semibold text-center text-xl text-maroon-600">Rahul</h4>
          </motion.div>

          {/* Additional Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={leftColumnInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="bg-gray-100 rounded-lg shadow-lg p-6 hover:bg-gray-200 transition duration-300"
          >
            <p className="text-gray-700 italic text-lg mb-4 leading-relaxed">
              "Thanks to VivahBandh, I met someone who truly understands me. Highly recommend!"
            </p>
            <h4 className="font-semibold text-center text-xl text-maroon-600">Meera</h4>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={rightColumnInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="bg-gray-100 rounded-lg shadow-lg p-6 hover:bg-gray-200 transition duration-300"
          >
            <p className="text-gray-700 italic text-lg mb-4 leading-relaxed">
              "The user-friendly interface made my search so much easier. I found my perfect match!"
            </p>
            <h4 className="font-semibold text-center text-xl text-maroon-600">Karan</h4>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// New Flow Component



// const Testimonials = () => {
//   const testimonials = [
//     { quote: "I found my perfect match through VivahBandh!", name: "John Doe" },
//     { quote: "Great experience and support!", name: "Jane Smith" },
//     { quote: "I never thought it could be this easy to find love!", name: "Alice Johnson" },
//     { quote: "VivahBandh helped me connect with someone special!", name: "Mike Wilson" },
//     { quote: "The process was seamless and enjoyable!", name: "Sarah Brown" },
//     { quote: "Highly recommend to anyone looking for love!", name: "David Lee" }
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0); // Start from the first testimonial

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
//     }, 4000); // Change quote every 5 seconds

//     return () => clearInterval(interval);
//   }, [testimonials.length]);

//   const leftIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
//   const rightIndex = (currentIndex + 1) % testimonials.length;

//   return (
//     <div className="py-16 bg-pink-200" id="testimonials">
//       <div className="container mx-auto px-6">
//         <h2 className="text-4xl font-bold text-center mb-4">What Our Users Say</h2>
//         <p className="text-lg text-center mb-8 text-gray-600">
//           Discover how VivahBandh has transformed the lives of our users. Here are some of their stories!
//         </p>

//         <div className="flex justify-center items-stretch mb-6 space-x-4 max-w-5xl mx-auto">
//           {/* Left Testimonial */}
//           <div
//             key={leftIndex}
//             className="bg-pink-300 shadow-md rounded-lg p-6 flex-grow w-1/3 min-w-[250px] flex-shrink-0"
//           >
//             <p className="text-gray-600 italic">"{testimonials[leftIndex].quote}"</p>
//             <p className="mt-4 font-bold">~ {testimonials[leftIndex].name}</p>
//           </div>

//           {/* Main Testimonial */}
//           <div
//             key={currentIndex}
//             className="bg-pink-400 shadow-md rounded-lg p-6 flex-grow w-1/3 min-w-[300px] flex-shrink-0"
//           >
//             <p className="text-black font-semibold italic">"{testimonials[currentIndex].quote}"</p>
//             <p className="mt-4 text-white font-bold">~ {testimonials[currentIndex].name}</p>
//           </div>

//           {/* Right Testimonial */}
//           <div
//             key={rightIndex}
//             className="bg-pink-300 shadow-md rounded-lg p-6 flex-grow w-1/3 min-w-[250px] flex-shrink-0"
//           >
//             <p className="text-gray-600 italic">"{testimonials[rightIndex].quote}"</p>
//             <p className="mt-4 font-bold">~ {testimonials[rightIndex].name}</p>
//           </div>
//         </div>

//         <p className="text-center text-gray-600 max-w-xl mx-auto">
//           Join the community today and start your journey towards finding love with VivahBandh. Your story could be next!
//         </p>
//       </div>
//     </div>
//   );
// };



const Contact = () => {
  const { ref: formInViewRef, inView: formInView } = useInView({ threshold: 0.3 });
  const { ref: imageInViewRef, inView: imageInView } = useInView({ threshold: 0.3 });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbyoGraCC0VKzlMWRY6g-9HZnZ7M_lYwMYFRte23m0I02RSNm03zHc9qcin7fftd2Q/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData),
      });

      const result = await response.json();
      if (result.result === "Success") {
        alert("Message sent successfully!");
        e.target.reset(); // Clear form after submission
      }
    } catch (error) {
      alert("Error sending message.");
      console.error(error);
    }
  };

  return (
    <div className="py-16 bg-pink-200" id="contact-us">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-start">

        {/* Form Sliding from Left to Right */}
        <motion.div
          ref={formInViewRef}
          initial={{ opacity: 0, transform: 'translateX(-50%)' }}
          animate={formInView ? { opacity: 1, transform: 'translateX(0%)' } : { opacity: 0, transform: 'translateX(-50%)' }}
          transition={{ duration: 1, delay: 0.2 }}
          className="md:w-1/2 max-w-lg mx-auto mb-8 md:mb-0"
        >
          <h2 className="text-4xl font-bold text-center mb-8">Contact Us</h2>
          <p className="mb-4">Have any questions? We'd love to hear from you!</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
              <input type="text" id="name" className="border border-gray-300 rounded-md w-full p-2" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
              <input type="email" id="email" className="border border-gray-300 rounded-md w-full p-2" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="message">Message</label>
              <textarea id="message" className="border border-gray-300 rounded-md w-full p-2" rows="4" required></textarea>
            </div>
            <button type="submit" className="bg-maroon-600 text-white font-bold px-4 py-2 rounded-md hover:bg-pink-500 transition duration-300">
              Send Message
            </button>
          </form>
        </motion.div>

        {/* Image Sliding from Right to Left */}
        <motion.div
          ref={imageInViewRef}
          initial={{ opacity: 0, x: 50 }}
          animate={imageInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 flex justify-center"
        >
          <img
            src="https://cdn0.weddingwire.in/article/5050/3_2/960/jpg/40505-marathibride-rohitnagwekar-lead.jpeg" // Replace with your image path
            alt="Contact Us"
            className="w-full max-w-xl h-auto object-cover rounded-lg"
          />
        </motion.div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="relative bg-pink-500 text-white pt-24 pb-10 overflow-hidden">
    {/* Curved Background Shape */}
    <div className="absolute inset-0">
      <div className="absolute -top-24 left-0 w-1/2 h-64 bg-pink-500 rounded-full"></div>
      <div className="absolute -top-24 right-0 w-1/2 h-64 bg-pink-500 rounded-full transform rotate-180"></div>
    </div>

    {/* Inverted Wave Shape at Top */}
    <div className="absolute top-0 w-full overflow-hidden leading-[0]">
      <svg
        className="relative block w-full h-[80px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        fill="#FEE2E2"
      >
        <path d="M0,120 C600,40 600,40 1200,120 L1200,0 L0,0 Z"></path>
      </svg>
    </div>

    <div className="relative container mx-auto px-4 md:flex md:justify-between md:text-left text-center space-y-8 md:space-y-0">
      {/* VivahBandh Section */}
      <div className="md:w-1/4">
        <h2 className="text-3xl font-bold mb-3">VivahBandh</h2>
        <p className="text-sm mb-4 max-w-xs">
          VivahBandh helps you find your perfect soulmate. Join today and start searching for your partner right away.
        </p>
        <div className="flex justify-center md:justify-start space-x-4 mt-4">
          <a href="#" className="text-white text-2xl hover:text-black"><i className="fab fa-facebook"></i></a>
          <a href="#" className="text-white text-2xl hover:text-black"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-white text-2xl hover:text-black"><i className="fab fa-instagram"></i></a>
          {/* <a href="#" className="text-white text-2xl hover:text-gray-200"><i className="fab fa-rss"></i></a> */}
        </div>
      </div>

      {/* Quick Links */}
      <div className="md:w-1/4">
        <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
        <ul className="text-sm space-y-2">
          <li><a href="#" className="hover:underline">Testimonials</a></li>
          <li><a href="#" className="hover:underline">Blog</a></li>
          <li><a href="#" className="hover:underline">Contact Us</a></li>
        </ul>
      </div>

      {/* Contact Details */}
      <div className="md:w-1/4">
        <h3 className="text-lg font-semibold mb-3">Contact Details</h3>
        <ul className="text-sm space-y-2">
          <li><i className="fas fa-map-marker-alt mr-2"></i> Solapur, Maharashtra</li>
          <li><i className="fas fa-envelope mr-2"></i> vivahbandh0@gmail.com</li>
          <li><i className="fas fa-phone-alt mr-2"></i>+910000000000</li>
        </ul>
      </div>

      {/* Subscribe To Newsletter */}
      <div className="md:w-1/4">
        <h3 className="text-lg font-semibold mb-3">Subscribe To Newsletter</h3>
        <p className="text-sm mb-4 max-w-xs">
          Be the first one to know about our new features, updates, and many more.
        </p>
        <div className="flex">
          <input type="email" placeholder="Email Address" className="p-2 w-full rounded-l-md text-gray-800" />
          <button className="bg-white text-pink-600 px-4 rounded-r-md">
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>

    {/* Footer Bottom */}
    <div className="mt-12 border-t border-pink-400 pt-6 text-center text-sm">
      <p>Copyright © 2024 VivahBandh. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="#" className="hover:underline">FAQ</a>
        <a href="#" className="hover:underline">Privacy Policy</a>
        <a href="#" className="hover:underline">Terms & Conditions</a>
      </div>
    </div>
  </footer>
);


const App = () => (
  <motion.div
    className="bg-pink-200 min-h-screen"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <Navbar />
    <Hero />
    <Welcome />
    <HorizontalLine />
    <AboutUs />
    <HorizontalLine />
    <Guide />
    <HorizontalLine />
    <Partners />
    <HorizontalLine />
    <Contact />
    <Footer />
  </motion.div>
);

export default App;
