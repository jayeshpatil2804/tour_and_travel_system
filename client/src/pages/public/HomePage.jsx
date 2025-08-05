import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="text-center">
      <div className="relative bg-cover bg-center h-[60vh]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-5xl font-extrabold mb-4">Discover Your Next Adventure</h1>
          <p className="text-xl mb-8">Book unique tours and travel packages with TravelNest.</p>
          <Link to="/tours" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition duration-300">
            Explore Tours
          </Link>
        </div>
      </div>
       <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 shadow-lg rounded-lg bg-white">
                <h3 className="text-xl font-semibold mb-2">Expert-Led Tours</h3>
                <p>Our tours are curated and led by local experts who know the best spots.</p>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-white">
                <h3 className="text-xl font-semibold mb-2">Competitive Pricing</h3>
                <p>Get the best value for your money with our transparent and fair pricing.</p>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-white">
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p>We are here for you anytime, anywhere. Our support team is always ready.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;