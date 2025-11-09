import React, { useState, useEffect, useRef } from "react";

// Constants
const MAIN_SLIDER_IMAGES = [
  "/image/7.jpg",
  "/image/2.jpg",
  "/image/3.jpg",
  "/image/4.jpg",
  "/image/5.jpg",
  "/image/6.jpg",
  "/image/1.jpg",
];

const GALLERY_IMAGES = [
  "/image/7.jpg",
  "/image/2.jpg",
  "/image/3.jpg",
  "/image/4.jpg",
  "/image/5.jpg",
  "/image/6.jpg",
  "/image/1.jpg",
  "/image/4.jpg",
  "/image/5.jpg",
];

const RATINGS_DATA = [
  { platform: "Google", rating: 4.9, stars: 5, color: "#4285F4", icon: "🔍" },
  { platform: "Facebook", rating: 4.7, stars: 5, color: "#1877F2", icon: "📘" },
  { platform: "Instagram", rating: 5.0, stars: 5, color: "#E4405F", icon: "📷" },
  { platform: "WeddingWire", rating: 4.8, stars: 5, color: "#FF6B6B", icon: "💒" },
];

const SERVICES = [
  "Wedding Planning",
  "Corporate Events",
  "Private Parties",
  "Cultural Events",
  "Decoration",
  "Coordination"
];

const CUSTOMER_REVIEWS = [
  {
    id: 1,
    name: "Sarah Johnson",
    event: "Wedding Ceremony",
    rating: 5,
    message: `Absolutely phenomenal service from start to finish! The team at Ayush Aura made our wedding day absolutely magical. Every detail was perfectly executed, from the floral arrangements to the timeline coordination.`,
    avatar: "👰",
    location: "New Delhi"
  },
  {
    id: 2,
    name: "Michael Chen",
    event: "Corporate Conference",
    rating: 5,
    message: `Professional, punctual, and absolutely brilliant! Our annual corporate conference was handled with exceptional expertise. The logistics, venue setup, and technical arrangements were flawless.`,
    avatar: "💼",
    location: "Mumbai"
  },
  {
    id: 3,
    name: "Priya Sharma",
    event: "Baby Shower",
    rating: 5,
    message: `Such a wonderful experience planning my baby shower with Ayush Aura! The decorations were exactly as I envisioned - soft, elegant, and beautiful. They coordinated with all vendors seamlessly.`,
    avatar: "👶",
    location: "Bangalore"
  },
  {
    id: 4,
    name: "Robert Davis",
    event: "Birthday Party",
    rating: 5,
    message: `Incredible work on my daughter's 16th birthday party! The team transformed our backyard into a magical wonderland. The theme execution was perfect, and the entertainment kept everyone engaged.`,
    avatar: "🎂",
    location: "Hyderabad"
  },
  {
    id: 5,
    name: "Emily Williams",
    event: "Anniversary Celebration",
    rating: 5,
    message: `Outstanding service for our 25th anniversary! Ayush Aura captured our love story beautifully through the decor and ambiance. Every element was thoughtfully planned and executed.`,
    avatar: "💖",
    location: "Chennai"
  }
];

const PROMOTIONAL_MESSAGES = [
  {
    id: 1,
    title: "💒 Wedding Package",
    description: "Complete wedding planning with premium decoration, photography, and coordination services",
    discount: "15% OFF",
    validUntil: "Valid until Dec 2024",
    buttonText: "Book Now",
    themeColor: "#FF6B9D",
    icon: "💒"
  },
  {
    id: 2,
    title: "🏢 Corporate Event",
    description: "End-to-end corporate event management with venue booking and technical support",
    discount: "10% OFF",
    validUntil: "For March 2024 events",
    buttonText: "Get Quote",
    themeColor: "#4D8AF0",
    icon: "🏢"
  },
  {
    id: 3,
    title: "🎂 Birthday Bash",
    description: "Themed birthday parties with decoration, catering, and entertainment packages",
    discount: "20% OFF",
    validUntil: "Weekday special",
    buttonText: "Plan Party",
    themeColor: "#FFA726",
    icon: "🎂"
  },
  {
    id: 4,
    title: "💫 Anniversary",
    description: "Romantic anniversary celebrations with custom themes and premium dining",
    discount: "25% OFF",
    validUntil: "10+ years celebration",
    buttonText: "Celebrate Love",
    themeColor: "#AB47BC",
    icon: "💖"
  }
];

const ORGANIZER_PROMISES = [
  {
    id: 1,
    icon: "🤝",
    title: "Our Commitment to You",
    promises: [
      "100% personalized event planning tailored to your vision",
      "Transparent pricing with no hidden costs",
      "Dedicated event manager from start to finish",
      "Quality assurance on all vendors and services"
    ],
    signature: "Ayush Sharma, Founder & CEO"
  },
  {
    id: 2,
    icon: "⭐",
    title: "Quality Promise",
    promises: [
      "Premium quality materials and decorations",
      "Professional and experienced event staff",
      "Timely execution as per scheduled timeline",
      "Clean and safe setup for all guests"
    ],
    signature: "Priya Patel, Head of Operations"
  },
  {
    id: 3,
    icon: "💫",
    title: "Experience Guarantee",
    promises: [
      "Stress-free planning process for you",
      "Creative and innovative event solutions",
      "Attention to every small detail",
      "Memorable experiences for all attendees"
    ],
    signature: "Rohan Mehta, Creative Director"
  }
];

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

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [currentReview, setCurrentReview] = useState(0);
  const [currentPromo, setCurrentPromo] = useState(0);
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

  // Auto-rotation effects
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % MAIN_SLIDER_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setGalleryIndex((prev) => (prev + 3) % GALLERY_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % CUSTOMER_REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % PROMOTIONAL_MESSAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % MAIN_SLIDER_IMAGES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + MAIN_SLIDER_IMAGES.length) % MAIN_SLIDER_IMAGES.length);
  };

  const visibleGalleryImages = [
    GALLERY_IMAGES[galleryIndex],
    GALLERY_IMAGES[(galleryIndex + 1) % GALLERY_IMAGES.length],
    GALLERY_IMAGES[(galleryIndex + 2) % GALLERY_IMAGES.length],
  ];

  const handleReviewDotClick = (index) => {
    setCurrentReview(index);
  };

  const handlePromoDotClick = (index) => {
    setCurrentPromo(index);
  };

  const handlePromoButtonClick = () => {
    alert(`Thank you for your interest in "${PROMOTIONAL_MESSAGES[currentPromo].title}"! Our team will contact you shortly.`);
  };

  const stats = [
    { number: <AnimatedCounter end={500} />, label: "Events Organized" },
    { number: <AnimatedCounter end={50} />, label: "Cities Across India" },
    { number: <AnimatedCounter end={98} />, label: "Client Satisfaction" },
    { number: <AnimatedCounter end={24} />, label: "Hours Support" }
  ];

  return (
    <div className="home-section">
      {/* Floating Particles Background */}
      <FloatingParticles count={20} />

      {/* Fullscreen Slider Section */}
      <div className="fullscreen-slider">
        {MAIN_SLIDER_IMAGES.map((src, index) => (
          <div
            key={index}
            className={`slider-image-container ${currentSlide === index ? 'active' : ''}`}
            style={{
              transform: `translateX(${mousePosition.x * 0.01}px) translateY(${mousePosition.y * 0.01}px)`
            }}
          >
            <img
              src={src}
              alt={`Event showcase ${index + 1}`}
              className="slider-image"
            />
            <div className="slider-overlay"></div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="nav-button nav-button-left"
          aria-label="Previous image"
        >
          <span className="button-icon">❮</span>
        </button>
        
        <button
          onClick={nextSlide}
          className="nav-button nav-button-right"
          aria-label="Next image"
        >
          <span className="button-icon">❯</span>
        </button>

        {/* Slider Progress Bar */}
        <div className="slider-progress">
          <div 
            className="progress-bar" 
            style={{ width: `${((currentSlide + 1) / MAIN_SLIDER_IMAGES.length) * 100}%` }}
          ></div>
        </div>

        {/* Slide Indicators */}
        <div className="slide-indicators">
          {MAIN_SLIDER_IMAGES.map((_, index) => (
            <button
              key={index}
              className={`indicator ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Main Header */}
      <div className="home-header animate-on-scroll">
        <div className="title-container">
          <h1 className="home-title">
            <span className="title-word">Event</span>
            <span className="title-word">Planning</span>
          </h1>
          <div className="title-underline"></div>
          <p className="home-subtitle">
            "Every celebration deserves flawless planning.<br />
            We transform your vision into extraordinary moments."
          </p>
          <div className="availability-badge pulse">
            <span className="badge-icon">✨</span>
            Available Across All India
          </div>
        </div>

        {/* Animated Stats */}
        <div className="stats-grid animate-on-scroll">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Client Message */}
      <div className="client-message animate-on-scroll">
        <div className="message-icon">💫</div>
        <p>
          Thank you for choosing us. Our team is dedicated to delivering a seamless, 
          beautiful, and stress-free event experience customized to your needs.
        </p>
      </div>

      {/* Event Sample Image */}
      <div className="event-image-container animate-on-scroll">
        <img
          src="/image/3.jpg"
          alt="Event sample"
          className="event-image"
        />
        {/* <div className="image-overlay">
          <div className="overlay-content">
            <span className="overlay-icon">🌟</span>
            <span>View Gallery</span>
          </div>
        </div> */}
      </div>

      {/* Enhanced Ratings Section - Single Line Layout */}
      <div className="ratings-section animate-on-scroll">
        <h2 className="section-title">Our Client Ratings</h2>
        <div className="ratings-line">
          {RATINGS_DATA.map((rating, index) => (
            <div key={index} className="rating-item">
              <div className="rating-platform">
                <span className="rating-icon">{rating.icon}</span>
                {rating.platform}
              </div>
              <div className="stars" style={{ color: rating.color }}>
                {"★".repeat(rating.stars)}
              </div>
              <div className="rating-value" style={{ color: rating.color }}>
                {rating.rating}<span className="rating-max">/5</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Slider Section */}
      <div className="gallery-section animate-on-scroll">
        <h2 className="section-title">Our Event Highlights</h2>
        <div className="gallery-slider">
          {visibleGalleryImages.map((src, index) => (
            <div key={index} className="gallery-item">
              <img
                src={src}
                alt={`Event gallery ${index + 1}`}
                className="gallery-image"
              />
              <div className="gallery-caption">
                <span>Event {index + 1}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="gallery-dots">
          {[0, 3, 6].map((position, index) => (
            <button
              key={index}
              className={`gallery-dot ${galleryIndex === position ? 'active' : ''}`}
              onClick={() => setGalleryIndex(position)}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Customer Reviews Section */}
      <section className="reviews-section animate-on-scroll">
        <h2 className="section-title">What Our Clients Say</h2>
        
        <div className="review-main-container">
          <div className="review-card">
            <div className="review-header">
              <div className="review-avatar bounce">
                {CUSTOMER_REVIEWS[currentReview].avatar}
              </div>
              <div className="reviewer-info">
                <div className="reviewer-name">
                  {CUSTOMER_REVIEWS[currentReview].name}
                </div>
                <div className="reviewer-event">
                  {CUSTOMER_REVIEWS[currentReview].event}
                </div>
                <div className="reviewer-location">
                  📍 {CUSTOMER_REVIEWS[currentReview].location}
                </div>
              </div>
            </div>
            
            <div className="review-content">
              <div className="quote-mark">"</div>
              <p className="review-text">
                {CUSTOMER_REVIEWS[currentReview].message}
              </p>
            </div>
            
            <div className="review-footer">
              <div className="review-rating">
                {"★".repeat(CUSTOMER_REVIEWS[currentReview].rating)}
              </div>
              <div className="verified-badge">
                ✅ Verified Client
              </div>
            </div>
          </div>

          {/* Review Navigation Dots */}
          <div className="review-dots">
            {CUSTOMER_REVIEWS.map((_, index) => (
              <button
                key={index}
                className={`review-dot ${index === currentReview ? 'active' : ''}`}
                onClick={() => handleReviewDotClick(index)}
                aria-label={`Show review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Promotional Messages Section */}
      <section className="promo-section animate-on-scroll">
        <h2 className="section-title">Special Offers & Deals</h2>
        
        <div className="promo-main-container">
          <div className="promo-card-active">
            <div className="promo-badge" style={{ backgroundColor: PROMOTIONAL_MESSAGES[currentPromo].themeColor }}>
              <span className="promo-icon">{PROMOTIONAL_MESSAGES[currentPromo].icon}</span>
              <span className="promo-discount">{PROMOTIONAL_MESSAGES[currentPromo].discount}</span>
            </div>
            
            <div className="promo-content">
              <h3 className="promo-title" style={{ color: PROMOTIONAL_MESSAGES[currentPromo].themeColor }}>
                {PROMOTIONAL_MESSAGES[currentPromo].title}
              </h3>
              
              <p className="promo-description">
                {PROMOTIONAL_MESSAGES[currentPromo].description}
              </p>
              
              <div className="promo-features">
                <div className="feature-item">✅ Premium Quality</div>
                <div className="feature-item">✅ Professional Team</div>
                <div className="feature-item">✅ On-time Delivery</div>
              </div>
              
              <div className="promo-footer">
                <div className="validity" style={{ color: PROMOTIONAL_MESSAGES[currentPromo].themeColor }}>
                  ⏰ {PROMOTIONAL_MESSAGES[currentPromo].validUntil}
                </div>
                <button 
                  className="promo-button"
                  style={{ backgroundColor: PROMOTIONAL_MESSAGES[currentPromo].themeColor }}
                  onClick={handlePromoButtonClick}
                >
                  {PROMOTIONAL_MESSAGES[currentPromo].buttonText}
                  <span className="button-arrow">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Promo Navigation Dots */}
          <div className="promo-dots">
            {PROMOTIONAL_MESSAGES.map((_, index) => (
              <button
                key={index}
                className={`promo-dot ${index === currentPromo ? 'active' : ''}`}
                onClick={() => handlePromoDotClick(index)}
                aria-label={`Show promotion ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Organizer Promise Section */}
      <section className="promise-section animate-on-scroll">
        <div className="promise-container">
          <h2 className="section-title">Our Promise to You</h2>
          
          <div className="promise-cards-grid">
            {ORGANIZER_PROMISES.map((promise, index) => (
              <div key={promise.id} className="promise-card stagger-animate">
                <div className="promise-header">
                  <div className="promise-icon bounce">{promise.icon}</div>
                  <h3 className="promise-title">{promise.title}</h3>
                </div>
                <div className="promise-list">
                  {promise.promises.map((item, itemIndex) => (
                    <div key={itemIndex} className="promise-item">
                      <span className="check-icon">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="promise-signature">
                  — {promise.signature}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero-section animate-on-scroll">
        <div className="hero-background"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Ayush Aura Event Planning & Management
          </h1>
          <p className="hero-text">
            We create seamless, beautiful, and memorable events that exceed your expectations.
            From intimate gatherings to grand celebrations, we bring your vision to life.
          </p>
          <div className="hero-buttons">
            <button className="cta-button primary">Get Started</button>
            <button className="cta-button secondary">View Portfolio</button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section animate-on-scroll">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">✨</div>
              <div className="service-name">{service}</div>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        /* --- ENHANCED STYLES WITH ANIMATIONS --- */
        .home-section {
          padding: 0;
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

        /* Enhanced Fullscreen Slider */
        .fullscreen-slider {
          width: 100%;
          height: 100vh;
          position: relative;
          overflow: hidden;
          perspective: 1000px;
        }

        .slider-image-container {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          transform: scale(1.1);
          transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .slider-image-container.active {
          opacity: 1;
          transform: scale(1);
        }

        .slider-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.8);
        }

        .slider-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            45deg,
            rgba(15, 23, 42, 0.4) 0%,
            rgba(102, 126, 234, 0.2) 100%
          );
        }

        /* Navigation Buttons */
        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.2);
          padding: 20px;
          font-size: 24px;
          cursor: pointer;
          border-radius: 50%;
          z-index: 10;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
        }

        .nav-button:hover {
          background: rgba(102, 126, 234, 0.8);
          transform: translateY(-50%) scale(1.1);
          border-color: rgba(102, 126, 234, 0.8);
        }

        .nav-button-left {
          left: 30px;
        }

        .nav-button-right {
          right: 30px;
        }

        /* Slider Progress Bar */
        .slider-progress {
          position: absolute;
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 4px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #667eea, #764ba2);
          transition: width 0.3s ease;
          border-radius: 2px;
        }

        /* Slide Indicators */
        .slide-indicators {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.5);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: white;
          border-color: white;
          transform: scale(1.2);
        }

        /* Enhanced Header Section */
        .home-header {
          text-align: center;
          margin: 80px 20px 60px;
          position: relative;
          z-index: 2;
        }

        .title-container {
          margin-bottom: 60px;
        }

        .home-title {
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

        .home-subtitle {
          font-size: 1.3rem;
          color: #cbd5e1;
          max-width: 800px;
          margin: 0 auto 30px;
          line-height: 1.6;
          font-style: italic;
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
          margin: 0 auto;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.1);
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

        /* Enhanced Client Message */
        .client-message {
          text-align: center;
          margin: 40px auto;
          padding: 40px;
          max-width: 800px;
          font-size: 1.2rem;
          color: #e2e8f0;
          line-height: 1.6;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
        }

        .message-icon {
          font-size: 3rem;
          margin-bottom: 20px;
          animation: bounce 2s infinite;
        }

        /* Enhanced Event Image */
        .event-image-container {
          position: relative;
          width: 80%;
          max-width: 900px;
          margin: 60px auto;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
        }

        .event-image {
          width: 100%;
          height: auto;
          border-radius: 20px;
          transition: transform 0.3s ease;
        }

        .event-image-container:hover .event-image {
          transform: scale(1.05);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(102, 126, 234, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 20px;
        }

        .event-image-container:hover .image-overlay {
          opacity: 1;
        }

        .overlay-content {
          color: white;
          text-align: center;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .overlay-icon {
          display: block;
          font-size: 2rem;
          margin-bottom: 10px;
        }

        /* Enhanced Ratings Section - Single Line */
        .ratings-section {
          padding: 80px 20px;
          background: rgba(255, 255, 255, 0.02);
          margin: 60px 20px;
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .ratings-line {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 60px;
          flex-wrap: wrap;
          max-width: 1200px;
          margin: 0 auto;
        }

        .rating-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 30px 20px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          min-width: 180px;
        }

        .rating-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }

        .rating-platform {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          color: white;
        }

        .rating-icon {
          font-size: 1.3rem;
        }

        .stars {
          font-size: 1.8rem;
          letter-spacing: 2px;
        }

        .rating-value {
          font-size: 2rem;
          font-weight: 800;
        }

        .rating-max {
          font-size: 1.2rem;
          color: #cbd5e1;
          font-weight: 400;
        }

        /* Enhanced Gallery Section */
        .gallery-section {
          padding: 80px 20px;
          background: rgba(255, 255, 255, 0.02);
          margin: 60px 20px;
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .gallery-slider {
          display: flex;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }

        .gallery-item {
          position: relative;
          flex: 1;
          min-width: 300px;
          max-width: 400px;
          border-radius: 20px;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .gallery-item:hover {
          transform: translateY(-10px);
        }

        .gallery-image {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 20px;
          transition: transform 0.3s ease;
        }

        .gallery-item:hover .gallery-image {
          transform: scale(1.1);
        }

        .gallery-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          color: white;
          padding: 20px;
          text-align: center;
          font-weight: 600;
        }

        .gallery-dots {
          display: flex;
          justify-content: center;
          gap: 15px;
        }

        .gallery-dot {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.3);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .gallery-dot.active {
          background: #667eea;
          border-color: #667eea;
          transform: scale(1.2);
        }

        /* Enhanced Customer Reviews Section */
        .reviews-section {
          background: rgba(255, 255, 255, 0.02);
          padding: 80px 20px;
          margin: 60px 20px;
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .review-main-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .review-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 25px;
          padding: 50px 40px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }

        .review-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(135deg, #667eea, #764ba2);
        }

        .review-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 30px;
        }

        .review-avatar {
          font-size: 4rem;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(102, 126, 234, 0.1);
          border-radius: 50%;
          border: 3px solid rgba(102, 126, 234, 0.3);
        }

        .bounce {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        .reviewer-info {
          flex: 1;
        }

        .reviewer-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 5px;
        }

        .reviewer-event {
          font-size: 1.1rem;
          color: #cbd5e1;
          font-style: italic;
          margin-bottom: 5px;
        }

        .reviewer-location {
          font-size: 0.9rem;
          color: #94a3b8;
        }

        .review-content {
          position: relative;
          margin-bottom: 30px;
        }

        .quote-mark {
          position: absolute;
          top: -20px;
          left: -10px;
          font-size: 5rem;
          color: rgba(102, 126, 234, 0.3);
          font-family: serif;
          line-height: 1;
        }

        .review-text {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #e2e8f0;
          font-style: italic;
          margin-left: 30px;
        }

        .review-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .review-rating {
          color: #fbbf24;
          font-size: 1.5rem;
          letter-spacing: 2px;
        }

        .verified-badge {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .review-dots {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 40px;
        }

        .review-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .review-dot.active {
          background: #667eea;
          transform: scale(1.2);
          border-color: rgba(255, 255, 255, 0.5);
        }

        /* Enhanced Promotional Messages Section */
        .promo-section {
          padding: 80px 20px;
          margin: 60px 20px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .promo-main-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .promo-card-active {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 25px;
          padding: 0;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          position: relative;
        }

        .promo-badge {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 25px 40px;
          color: white;
          font-weight: 700;
        }

        .promo-icon {
          font-size: 2.5rem;
        }

        .promo-discount {
          font-size: 1.5rem;
          background: rgba(255, 255, 255, 0.2);
          padding: 8px 20px;
          border-radius: 25px;
          backdrop-filter: blur(10px);
        }

        .promo-content {
          padding: 40px;
        }

        .promo-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .promo-description {
          font-size: 1.2rem;
          color: #e2e8f0;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .promo-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 30px;
        }

        .feature-item {
          background: rgba(255, 255, 255, 0.05);
          padding: 12px 20px;
          border-radius: 10px;
          color: #cbd5e1;
          font-size: 0.95rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .promo-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .validity {
          font-size: 1rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .promo-button {
          color: white;
          border: none;
          padding: 15px 35px;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .promo-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .button-arrow {
          transition: transform 0.3s ease;
        }

        .promo-button:hover .button-arrow {
          transform: translateX(5px);
        }

        .promo-dots {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 40px;
        }

        .promo-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .promo-dot.active {
          background: #667eea;
          transform: scale(1.2);
          border-color: rgba(255, 255, 255, 0.5);
        }

        /* Enhanced Promise Section */
        .promise-section {
          padding: 100px 20px;
          background: rgba(255, 255, 255, 0.02);
          margin: 60px 20px;
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .promise-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .promise-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 40px;
          margin-top: 60px;
        }

        .promise-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 25px;
          padding: 50px 40px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
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

        .promise-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.2);
        }

        .promise-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 35px;
        }

        .promise-icon {
          font-size: 3rem;
        }

        .promise-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin: 0;
        }

        .promise-list {
          flex: 1;
          margin-bottom: 35px;
        }

        .promise-item {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 15px;
          color: #e2e8f0;
          padding: 12px 0;
        }

        .check-icon {
          color: #10b981;
          font-weight: bold;
          font-size: 1.2rem;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .promise-signature {
          font-size: 1rem;
          font-style: italic;
          color: #94a3b8;
          text-align: right;
          padding-top: 25px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: auto;
        }

        /* Enhanced Hero Section */
        .hero-section {
          text-align: center;
          padding: 120px 20px;
          margin: 60px 20px;
          border-radius: 30px;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
          animation: background-pulse 4s ease-in-out infinite;
        }

        @keyframes background-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-title {
          font-size: 3.5rem;
          margin-bottom: 30px;
          color: white;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-text {
          font-size: 1.3rem;
          color: #cbd5e1;
          line-height: 1.7;
          margin-bottom: 40px;
        }

        .hero-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-button {
          padding: 18px 35px;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .cta-button.primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .cta-button.secondary {
          background: transparent;
          color: #667eea;
          border-color: #667eea;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        /* Enhanced Services Section */
        .services-section {
          margin: 80px 20px;
          padding: 80px 40px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .service-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          padding: 40px 30px;
          border-radius: 20px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .service-card:hover {
          transform: translateY(-10px) scale(1.05);
          background: rgba(102, 126, 234, 0.1);
        }

        .service-icon {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .service-name {
          font-size: 1.2rem;
          font-weight: 600;
          color: white;
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

        /* Enhanced Section Titles */
        .section-title {
          font-size: 3rem;
          font-weight: 800;
          color: white;
          margin-bottom: 50px;
          text-align: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 2px;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .ratings-line {
            gap: 30px;
          }
          
          .rating-item {
            min-width: 160px;
          }
        }

        @media (max-width: 768px) {
          .home-title {
            font-size: 2.5rem;
          }

          .section-title {
            font-size: 2.2rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .nav-button {
            padding: 15px;
            width: 50px;
            height: 50px;
            font-size: 20px;
          }

          .nav-button-left {
            left: 15px;
          }

          .nav-button-right {
            right: 15px;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .ratings-line {
            gap: 20px;
          }

          .rating-item {
            min-width: 140px;
            padding: 20px 15px;
          }

          .promise-cards-grid {
            grid-template-columns: 1fr;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }

          .cta-button {
            width: 200px;
          }

          .promo-footer {
            flex-direction: column;
            text-align: center;
          }

          .review-header {
            flex-direction: column;
            text-align: center;
            gap: 15px;
          }

          .review-text {
            margin-left: 0;
            text-align: center;
          }

          .quote-mark {
            left: 50%;
            transform: translateX(-50%);
          }
        }

        @media (max-width: 480px) {
          .home-title {
            font-size: 2rem;
          }

          .section-title {
            font-size: 1.8rem;
          }

          .hero-title {
            font-size: 2rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }

          .ratings-line {
            gap: 15px;
          }

          .rating-item {
            min-width: 120px;
            padding: 15px 10px;
          }

          .gallery-item {
            min-width: 100%;
          }

          .review-card,
          .promo-content {
            padding: 30px 20px;
          }

          .promo-features {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}