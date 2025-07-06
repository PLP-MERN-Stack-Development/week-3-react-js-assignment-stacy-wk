import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-2 text-white text-center mt-auto">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-gray-300">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300">Contact Us</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;