import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPinIcon, 
  StarIcon, 
  UserGroupIcon, 
  ShieldCheckIcon,
  PhoneIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070",
      title: "Discover Amazing Destinations",
      subtitle: "Explore the world's most beautiful places with our expert guides"
    },
    {
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2070",
      title: "Adventure Awaits You",
      subtitle: "Create unforgettable memories with our carefully crafted tour packages"
    },
    {
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070",
      title: "Experience Local Culture",
      subtitle: "Immerse yourself in authentic local experiences and traditions"
    }
  ];

  const features = [
    {
      icon: UserGroupIcon,
      title: "Expert Local Guides",
      description: "Our experienced guides provide authentic insights and ensure your safety throughout the journey.",
      color: "text-blue-600"
    },
    {
      icon: StarIcon,
      title: "Premium Quality",
      description: "Carefully selected accommodations and activities to ensure the highest quality experience.",
      color: "text-orange-500"
    },
    {
      icon: ShieldCheckIcon,
      title: "Safe & Secure",
      description: "Your safety is our priority. All tours are fully insured with 24/7 emergency support.",
      color: "text-green-600"
    },
    {
      icon: PhoneIcon,
      title: "24/7 Support",
      description: "Round-the-clock customer support to assist you before, during, and after your trip.",
      color: "text-purple-600"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Travelers" },
    { number: "500+", label: "Tour Packages" },
    { number: "50+", label: "Destinations" },
    { number: "15+", label: "Years Experience" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000); // Changed to 4 seconds for better user experience
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Manual navigation functions
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => prev === 0 ? heroSlides.length - 1 : prev - 1);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Slideshow */}
      <div className="relative h-screen">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url('${slide.image}')` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded z-20"
          aria-label="Previous slide"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded z-20"
          aria-label="Next slide"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Dots Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-110' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center text-white px-6 max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed">
              {heroSlides[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/tours" 
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded text-lg"
              >
                Explore Tours
              </Link>
              <Link 
                to="/contact" 
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-8 rounded text-lg"
              >
                Plan Your Trip
              </Link>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide 
                  ? 'bg-white' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TravelNest?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide exceptional travel experiences with attention to every detail, 
              ensuring your journey is memorable and hassle-free.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded shadow text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-500 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of satisfied travelers who have discovered amazing destinations with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/tours" 
              className="bg-white text-orange-500 hover:bg-gray-100 font-bold py-4 px-8 rounded text-lg"
            >
              Browse Tours
            </Link>
            <Link 
              to="/contact" 
              className="border-2 border-white text-white hover:bg-white hover:text-orange-500 font-bold py-4 px-8 rounded text-lg"
            >
              Get Custom Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;