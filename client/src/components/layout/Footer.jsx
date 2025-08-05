import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-10">
      <div className="container mx-auto px-6 py-4 text-center">
        <p>&copy; {new Date().getFullYear()} TravelNest. All Rights Reserved.</p>
        <p className="text-sm text-gray-400">Your adventure starts here.</p>
      </div>
    </footer>
  );
};

export default Footer;