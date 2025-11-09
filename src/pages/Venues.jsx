import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Particle component for background effects
const FloatingParticles = ({ count = 15 }) => {
  return (
    <div className="floating-particles">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 20}s`
          }}
        />
      ))}
    </div>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={countRef}>{count}+</span>;
};

export default function Venue() {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Mouse move effect for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const venues = [
    {
      id: 1,
      name: "Grand Palace Hall",
      type: "Luxury Wedding",
      capacity: "500+ guests",
      location: "Metro Cities",
      price: "Starting at ₹5L",
      image: "🏛️",
      features: ["Premium Decor", "Fine Dining", "Valet Parking"],
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 2,
      name: "Royal Convention Center",
      type: "Corporate Events",
      capacity: "300-1000 guests",
      location: "Metro Cities",
      price: "Starting at ₹3L",
      image: "🏢",
      features: ["AV Equipment", "Catering", "Business Facilities"],
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      id: 3,
      name: "Garden View Resort",
      type: "Outdoor Events",
      capacity: "200-500 guests",
      location: "Scenic Locations",
      price: "Starting at ₹2.5L",
      image: "🌿",
      features: ["Natural Scenery", "Outdoor Setup", "Photography Spots"],
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
      id: 4,
      name: "Beachfront Venue",
      type: "Destination Wedding",
      capacity: "150-400 guests",
      location: "Coastal Areas",
      price: "Starting at ₹4L",
      image: "🏖️",
      features: ["Beach Access", "Sea View", "Luxury Stay"],
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    },
    {
      id: 5,
      name: "Heritage Palace",
      type: "Royal Experience",
      capacity: "100-300 guests",
      location: "Historical Cities",
      price: "Starting at ₹6L",
      image: "🏯",
      features: ["Traditional Decor", "Cultural Performances", "Royal Treatment"],
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    },
    {
      id: 6,
      name: "Modern Rooftop",
      type: "City Events",
      capacity: "50-200 guests",
      location: "Metro Cities",
      price: "Starting at ₹1.5L",
      image: "🏙️",
      features: ["City Views", "Modern Amenities", "Party Setup"],
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
    }
  ];

  const stats = [
    { number: <AnimatedCounter end={28} />, label: "States Covered" },
    { number: <AnimatedCounter end={100} />, label: "Cities Available" },
    { number: <AnimatedCounter end={500} />, label: "Venue Partners" },
    { number: <AnimatedCounter end={98} />, label: "Client Satisfaction" }
  ];

  // States data remains the same as your original
  const states = [
    {
      name: "Andhra Pradesh",
      cities: [
        { name: "Visakhapatnam", venues: ["Grand Palace Hall", "Beachfront Venue"], famousHotels: ["Park Hotel Vizag", "Novotel Vizag", "Ritz-Carlton Placeholder 1", "Marriott Vizag", "Fortune Select Vizag"] },
        { name: "Amaravati", venues: ["Royal Convention Center"], famousHotels: ["Taj Amaravati Placeholder 1", "ITC Amaravati", "Radisson Amaravati", "Hilton Amaravati", "Hyatt Amaravati"] }
      ]
    },
    {
      name: "Karnataka",
      cities: [
        { name: "Bangalore", venues: ["Grand Palace Hall", "Modern Rooftop", "Royal Convention Center"], famousHotels: ["The Leela Palace Bangalore", "The Ritz-Carlton, Bangalore", "ITC Gardenia", "Shangri-La Bengaluru", "Conrad Bengaluru"] },
        { name: "Mysore", venues: ["Heritage Palace", "Garden View Resort"], famousHotels: ["Lalitha Mahal Palace Hotel", "Radisson Blu Mysore", "Grand Mercure Mysore", "Hotel Southern Star", "Fortune JP Palace"] }
      ]
    },
    {
      name: "Kerala",
      cities: [
        { name: "Kochi", venues: ["Beachfront Venue", "Garden View Resort"], famousHotels: ["Grand Hyatt Kochi", "Taj Malabar Resort", "Crowne Plaza Kochi", "Le Méridien Kochi", "Brunton Boatyard"] },
        { name: "Thiruvananthapuram", venues: ["Royal Convention Center"], famousHotels: ["The Leela Kovalam", "Hyatt Thiruvananthapuram", "Hilton Thiruvananthapuram", "Vivanta Thiruvananthapuram", "Mascot Hotel"] }
      ]
    },
    {
      name: "Tamil Nadu",
      cities: [
        { name: "Chennai", venues: ["Grand Palace Hall", "Royal Convention Center"], famousHotels: ["ITC Grand Chola", "The Leela Palace Chennai", "Taj Coromandel", "Hilton Chennai", "Hyatt Regency Chennai"] },
        { name: "Coimbatore", venues: ["Modern Rooftop"], famousHotels: ["The Residency Towers", "Radisson Blu Coimbatore", "Fairfield by Marriott", "Le Méridien Coimbatore", "Vivanta Coimbatore"] }
      ]
    },
    {
      name: "Telangana",
      cities: [
        { name: "Hyderabad", venues: ["Grand Palace Hall", "Royal Convention Center"], famousHotels: ["Taj Falaknuma Palace", "The Park Hyderabad", "ITC Kohenur", "Hyatt Hyderabad Gachibowli", "Novotel Hyderabad Airport"] }
      ]
    },
    {
      name: "Goa",
      cities: [
        { name: "Panaji", venues: ["Garden View Resort", "Beachfront Venue"], famousHotels: ["Goa Marriott Resort & Spa", "The Crown Goa", "Taj Cidade de Goa", "Vivanta Panaji", "DoubleTree by Hilton Panaji"] }
      ]
    },
    {
      name: "Maharashtra",
      cities: [
        { name: "Mumbai", venues: ["Grand Palace Hall", "Royal Convention Center", "Beachfront Venue"], famousHotels: ["Taj Mahal Palace", "The Oberoi, Mumbai", "Four Seasons Hotel Mumbai", "St. Regis Mumbai", "JW Marriott Mumbai Sahar"] }
      ]
    },
    {
      name: "Delhi NCR",
      cities: [
        { name: "New Delhi", venues: ["Grand Palace Hall", "Royal Convention Center", "Modern Rooftop"], famousHotels: ["The Leela Palace New Delhi", "Taj Palace, New Delhi", "ITC Maurya", "The Imperial, New Delhi", "Roseate House"] }
      ]
    }
  ];

  // --- HANDLERS ---
  const handleStateSelect = (state) => {
    setSelectedState(state);
    setSelectedCity(null);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  // Function to determine which venues are available in the selected city
  const getCityVenues = (city) => {
    return city.venues.map(venueName => {
      const venue = venues.find(v => v.name === venueName);
      return venue ? `${venueName} (${venue.type})` : venueName;
    });
  };

  // Content for the info card
  const infoCardContent = () => {
    if (selectedCity) {
      return (
        <>
          <h4>📍 {selectedCity.name}, {selectedState.name}</h4>
          <p className="info-subtitle">Available Venue Types:</p>
          <ul className="venues-list">
            {getCityVenues(selectedCity).map((venue, index) => (
              <li key={index}>• {venue.split(' ')[0]} ({venue.substring(venue.indexOf('(') + 1, venue.indexOf(')'))})</li>
            ))}
          </ul>
          <p className="info-subtitle">Top 5 Famous Hotels (Venue Options):</p>
          <ul className="venues-list">
            {selectedCity.famousHotels.map((hotel, index) => (
              <li key={`hotel-${index}`}>★ {hotel}</li>
            ))}
          </ul>
        </>
      );
    } else if (selectedState) {
      return (
        <>
          <h4>📍 {selectedState.name}</h4>
          <p className="info-subtitle">Select a City to View Venue Options:</p>
          <div className="city-selection">
            {selectedState.cities.map((city) => (
              <button
                key={city.name}
                className="city-btn glow-on-hover"
                onClick={() => handleCitySelect(city)}
              >
                {city.name} ({city.venues.length} Venues)
              </button>
            ))}
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <div className="venue-section">
      {/* Floating Particles Background */}
      <FloatingParticles count={20} />

      {/* Header */}
      <div className="venue-header animate-on-scroll">
        <h1 className="venue-title">
          <span className="title-word">Premium</span>
          <span className="title-word">Venues</span>
          <span className="title-word">Across India</span>
        </h1>
        <div className="title-underline"></div>
        <p className="venue-subtitle">
          Explore elegant and premium venues perfect for weddings, corporate events,
          private parties, and cultural celebrations. We're available across all of India!
        </p>
        <div className="availability-badge pulse">
          <span className="badge-icon">✨</span>
          Available Across All India
        </div>
      </div>

      {/* Animated Stats */}
      <div className="stats-grid animate-on-scroll">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card stagger-animate">
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="venue-content">
        {/* State Selection Section */}
        <div className="state-section animate-on-scroll">
          <div className="state-container">
            <h3 className="state-title">🗺️ Our Presence Across India</h3>

            {/* State Selection */}
            <div className="state-selection">
              <h4 className="selection-title">Select a State/UT to Explore Venues</h4>
              <div className="states-grid">
                {states.map((state) => (
                  <button
                    key={state.name}
                    className={`state-btn glow-on-hover ${selectedState?.name === state.name ? 'active' : ''}`}
                    onClick={() => handleStateSelect(state)}
                  >
                    {state.name}
                  </button>
                ))}
              </div>
            </div>

            {/* State/City Info Card */}
            {(selectedState || selectedCity) && (
              <div className="state-info-card stagger-animate">
                {infoCardContent()}
                <button className="inquire-btn glow">
                  Inquire for {selectedCity ? selectedCity.name : selectedState.name}
                </button>
                {selectedCity && (
                  <button
                    className="back-btn"
                    onClick={() => setSelectedCity(null)}
                  >
                    ← Back to {selectedState.name} Cities
                  </button>
                )}
              </div>
            )}
            {/* Initial Prompt */}
            {!selectedState && (
              <div className="state-info-card initial-prompt stagger-animate">
                <div className="prompt-icon">🗺️</div>
                <p>Click on an Indian State or Union Territory above to see available cities and venue options!</p>
              </div>
            )}
          </div>
        </div>

        {/* Venues Grid */}
        <div className="venues-grid-section animate-on-scroll">
          <h2 className="section-title">✨ Featured Venue Styles</h2>
          <div className="venues-grid">
            {venues.map((venue) => (
              <div key={venue.id} className="venue-card stagger-animate">
                <div 
                  className="venue-image"
                  style={{ background: venue.gradient }}
                >
                  <div className="venue-icon">{venue.image}</div>
                  <div className="image-overlay">
                    <span></span>
                  </div>
                </div>
                <div className="venue-content">
                  <h3 className="venue-name">{venue.name}</h3>
                  <span className="venue-type">{venue.type}</span>
                  <div className="venue-details">
                    <div className="detail-item">
                      <span className="detail-icon">👥</span>
                      {venue.capacity}
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📍</span>
                      {venue.location}
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">💰</span>
                      {venue.price}
                    </div>
                  </div>
                  <div className="venue-features">
                    {venue.features.map((feature, index) => (
                      <span key={index} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                  <div className="venue-actions">
                    <button className="book-btn glow">Book Now</button>
                    <button className="details-btn">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section animate-on-scroll">
        <div className="cta-background"></div>
        <div className="cta-content">
          <h2>Ready to Book Your Perfect Venue?</h2>
          <p>We're available across all India states with premium venues and complete event planning services.</p>
          <div className="cta-buttons">
            <Link to="/contact">
              <button className="cta-primary glow">Book My Venue</button>
            </Link>
            <button className="cta-secondary">Get Free Consultation</button>
          </div>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <div>
                <div>Call Us</div>
                <div>+91 98765 43210</div>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">💬</span>
              <div>
                <div>WhatsApp</div>
                <div>+91 98765 43210</div>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <div>
                <div>Email</div>
                <div>hello@ayushaura.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* --- ENHANCED STYLES WITH ANIMATIONS --- */
        .venue-section {
          padding: 80px 20px;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        /* Floating Particles */
        .floating-particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(102, 126, 234, 0.6);
          border-radius: 50%;
          animation: float 20s infinite linear;
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        .venue-header {
          text-align: center;
          margin-bottom: 60px;
          position: relative;
          z-index: 2;
        }

        .venue-title {
          font-size: 4rem;
          font-weight: 800;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .title-word {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: title-float 3s ease-in-out infinite;
        }

        .title-word:nth-child(2) {
          animation-delay: 0.5s;
        }

        .title-word:nth-child(3) {
          animation-delay: 1s;
        }

        @keyframes title-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .title-underline {
          width: 120px;
          height: 6px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          margin: 0 auto 30px;
          border-radius: 3px;
          animation: underline-grow 2s ease-out;
        }

        @keyframes underline-grow {
          from { width: 0px; opacity: 0; }
          to { width: 120px; opacity: 1; }
        }

        .venue-subtitle {
          font-size: 1.3rem;
          color: #cbd5e1;
          max-width: 800px;
          margin: 0 auto 30px;
          line-height: 1.6;
        }

        .availability-badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          padding: 16px 32px;
          border-radius: 50px;
          font-weight: 600;
          box-shadow: 0 8px 32px rgba(16, 185, 129, 0.4);
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .pulse {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
          max-width: 1000px;
          margin: 0 auto 60px;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          padding: 30px 20px;
          border-radius: 20px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-10px);
        }

        .stat-number {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }

        .stat-label {
          color: #cbd5e1;
          font-size: 1rem;
          font-weight: 500;
        }

        .venue-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 40px;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* --- Enhanced State Section Styles --- */
        .state-section {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          padding: 40px 30px;
          border-radius: 25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          height: fit-content;
          position: sticky;
          top: 100px;
        }

        .state-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: white;
          margin-bottom: 25px;
          text-align: center;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .selection-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: white;
          margin-bottom: 20px;
          text-align: center;
        }

        .states-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-bottom: 25px;
        }

        .state-btn {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          border: 1.5px solid rgba(255, 255, 255, 0.1);
          color: #e2e8f0;
          padding: 10px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .glow-on-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }

        .state-btn:hover {
          background: rgba(102, 126, 234, 0.2);
          border-color: rgba(102, 126, 234, 0.5);
        }

        .state-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-color: transparent;
          transform: scale(1.05);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .state-info-card {
          margin-top: 25px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          padding: 25px;
          border-radius: 16px;
          border-left: 4px solid #10b981;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .initial-prompt {
          text-align: center;
          padding: 40px 25px;
          border-left: 4px solid #f97316;
        }

        .prompt-icon {
          font-size: 3rem;
          margin-bottom: 15px;
          opacity: 0.8;
        }

        .state-info-card h4 {
          margin: 0 0 15px 0;
          color: white;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .info-subtitle {
          margin: 20px 0 12px 0;
          color: #cbd5e1;
          font-weight: 600;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 8px;
          font-size: 1rem;
        }

        .city-selection {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin: 20px 0 25px 0;
        }

        .city-btn {
          background: rgba(186, 230, 253, 0.2);
          border: 1px solid rgba(125, 211, 252, 0.3);
          color: #e0f2fe;
          padding: 10px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .city-btn:hover {
          background: rgba(56, 189, 248, 0.4);
          color: white;
          transform: translateY(-2px);
        }

        .venues-list {
          margin: 12px 0 25px 0;
          padding-left: 0;
          list-style: none;
        }

        .venues-list li {
          color: #e2e8f0;
          margin: 8px 0;
          font-size: 0.9rem;
          padding-left: 15px;
          position: relative;
        }

        .venues-list li:before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 6px;
          background: #10b981;
          border-radius: 50%;
        }

        .inquire-btn {
          width: 100%;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          border: none;
          padding: 14px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 12px;
          font-size: 1rem;
        }

        .glow:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
        }

        .back-btn {
          width: 100%;
          background: rgba(226, 232, 240, 0.1);
          color: #cbd5e1;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 10px;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .back-btn:hover {
          background: rgba(226, 232, 240, 0.2);
        }

        /* --- Enhanced Venues Grid Styles --- */
        .venues-grid-section {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          padding: 50px 40px;
          border-radius: 25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: white;
          margin-bottom: 40px;
          text-align: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .venues-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
        }

        .venue-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .venue-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(102, 126, 234, 0.3);
        }

        .venue-image {
          height: 160px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .venue-icon {
          font-size: 4rem;
          z-index: 2;
          position: relative;
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          color: white;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .venue-card:hover .image-overlay {
          opacity: 1;
        }

        .venue-content {
          padding: 30px;
        }

        .venue-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin: 0 0 12px 0;
        }

        .venue-type {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 20px;
        }

        .venue-details {
          margin: 20px 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #e2e8f0;
          font-size: 0.95rem;
        }

        .detail-icon {
          font-size: 1.1rem;
          width: 20px;
          text-align: center;
        }

        .venue-features {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 20px 0;
        }

        .feature-tag {
          background: rgba(255, 255, 255, 0.1);
          color: #e2e8f0;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.8rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .venue-actions {
          display: flex;
          gap: 12px;
          margin-top: 25px;
        }

        .book-btn {
          flex: 1;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 14px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
        }

        .details-btn {
          flex: 1;
          background: transparent;
          color: #667eea;
          border: 2px solid #667eea;
          padding: 12px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .details-btn:hover {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
        }

        /* --- Enhanced CTA Section Styles --- */
        .cta-section {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          margin-top: 80px;
          padding: 80px 40px;
          border-radius: 25px;
          text-align: center;
          color: white;
          max-width: 1400px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .cta-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(102, 126, 234, 0.2) 0%, transparent 70%);
          animation: background-pulse 4s ease-in-out infinite;
        }

        @keyframes background-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .cta-content {
          position: relative;
          z-index: 2;
        }

        .cta-content h2 {
          font-size: 3rem;
          margin-bottom: 20px;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cta-content p {
          font-size: 1.3rem;
          margin-bottom: 40px;
          color: #e2e8f0;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-bottom: 50px;
        }

        .cta-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 18px 35px;
          border-radius: 15px;
          font-weight: 700;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.6);
        }

        .cta-secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
          padding: 16px 32px;
          border-radius: 15px;
          font-weight: 700;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cta-secondary:hover {
          background: white;
          color: #667eea;
          transform: translateY(-3px);
        }

        .contact-info {
          display: flex;
          justify-content: center;
          gap: 50px;
          flex-wrap: wrap;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 15px;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.1);
          padding: 20px 25px;
          border-radius: 15px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .contact-icon {
          font-size: 2rem;
        }

        .contact-item div {
          text-align: left;
        }

        .contact-item div div:first-child {
          font-size: 0.9rem;
          color: #cbd5e1;
          margin-bottom: 4px;
        }

        .contact-item div div:last-child {
          font-size: 1.1rem;
          font-weight: 600;
        }

        /* Scroll Animations */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }

        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .stagger-animate {
          animation: card-enter 0.6s ease-out;
        }

        @keyframes card-enter {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* --- Responsive Design --- */
        @media (max-width: 1024px) {
          .venue-content {
            grid-template-columns: 1fr;
          }

          .state-section {
            position: static;
          }

          .states-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (max-width: 768px) {
          .venue-title {
            font-size: 3rem;
          }

          .venues-grid {
            grid-template-columns: 1fr;
          }

          .states-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .contact-info {
            flex-direction: column;
            gap: 20px;
          }

          .venue-actions {
            flex-direction: column;
          }

          .cta-content h2 {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 480px) {
          .venue-section {
            padding: 60px 16px;
          }

          .venue-title {
            font-size: 2.5rem;
          }

          .state-section,
          .venues-grid-section {
            padding: 30px 20px;
          }

          .states-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .cta-section {
            padding: 60px 25px;
          }

          .cta-content h2 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}