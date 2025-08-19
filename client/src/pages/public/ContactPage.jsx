import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ClockIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    tourType: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: MapPinIcon,
      title: "Visit Us",
      details: ["123 Travel Street, Udhna, Surat, Gujarat 394210"],
      color: "text-blue-600"
    },
    {
      icon: PhoneIcon,
      title: "Call Us",
      details: ["+91 6354176595", "+91 9106991645", "+91 8106342823", "Toll Free: 1800-123-456"],
      color: "text-green-600"
    },
    {
      icon: EnvelopeIcon,
      title: "Email Us",
      details: ["info@travelnest.com", "bookings@travelnest.com", "support@travelnest.com"],
      color: "text-orange-500"
    },
    {
      icon: ClockIcon,
      title: "Working Hours",
      details: ["Mon - Fri: 9:00 AM - 8:00 PM", "Saturday: 9:00 AM - 6:00 PM", "Sunday: 10:00 AM - 4:00 PM"],
      color: "text-purple-600"
    }
  ];

  const tourTypes = [
    "Adventure Tours",
    "Cultural Tours",
    "Beach Holidays",
    "Mountain Expeditions",
    "City Breaks",
    "Wildlife Safari",
    "Pilgrimage Tours",
    "Honeymoon Packages",
    "Group Tours",
    "Custom Tours"
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      // Here you would normally send the form data to your backend
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      setTimeout(() => {
        toast.success('Thank you for your inquiry! We will get back to you within 24 hours.', {
          duration: 4000,
          position: 'top-center',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          tourType: ''
        });
        setIsSubmitting(false);
      }, 2000);
    } catch (error) {
      toast.error('Something went wrong. Please try again later.', {
        duration: 4000,
        position: 'top-center',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-600 py-20">
        <div className="container mx-auto px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get In Touch
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Have questions about our tours? Need a custom travel plan? 
            We're here to help you create unforgettable memories.
          </p>
        </div>
      </div>

      {/* Contact Information Cards */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
                  <info.icon className={`w-8 h-8 ${info.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{info.title}</h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Contact Form
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-8">
                <ChatBubbleLeftRightIcon className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Send Us a Message</h3>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tour Type
                    </label>
                    <select
                      name="tourType"
                      value={formData.tourType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select tour type</option>
                      {tourTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="What can we help you with?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your travel plans, preferences, or any questions you have..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-orange-500 text-white font-bold py-4 px-8 rounded-lg hover:from-blue-700 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending Message...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              {/* Google Map */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-center mb-6">
                  <MapPinIcon className="w-8 h-8 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">Find Us</h3>
                </div>
                <div className="aspect-w-16 aspect-h-12 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.0070548201693!2d72.83673507508445!3d21.152117530528248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be051d82ea7b8f7%3A0x4a9f93f07cb95765!2sBhedwad%2C%20Kalyan%20Kutir%2C%20Udhana%2C%20Surat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1754904788167!5m2!1sen!2sin"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                    title="Office Location Map"
                  ></iframe>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-orange-500 p-8 rounded-lg text-white">
                <div className="flex items-center mb-6">
                  <GlobeAltIcon className="w-8 h-8 mr-3" />
                  <h3 className="text-2xl font-bold">Quick Contact</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <PhoneIcon className="w-5 h-5 mr-3 opacity-80" />
                    <span>Call us now: +91 63541 76595</span>
                  </div>
                  <div className="flex items-center">
                    <EnvelopeIcon className="w-5 h-5 mr-3 opacity-80" />
                    <span>Email: jayeshpatil0244@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 mr-3 opacity-80" />
                    <span>Response time: Within 2 hours</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-sm opacity-90">
                    For immediate assistance with bookings or travel emergencies, 
                    please call our 24/7 helpline.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about our tours and services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How do I book a tour?",
                answer: "You can book directly through our website, call us, or visit our office. We accept online payments and provide instant confirmation."
              },
              {
                question: "What's included in tour packages?",
                answer: "Our packages typically include accommodation, meals, transportation, guided tours, and entry fees. Specific inclusions are listed for each tour."
              },
              {
                question: "Can I customize my tour?",
                answer: "Absolutely! We specialize in creating custom itineraries based on your preferences, budget, and travel dates."
              },
              {
                question: "What's your cancellation policy?",
                answer: "Cancellation terms vary by tour type. Generally, we offer full refunds for cancellations made 30+ days before departure."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <h4 className="font-bold text-gray-900 mb-3">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
