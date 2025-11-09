import React, { useState, useEffect, useRef } from "react";

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

// Constants
const MAIN_SLIDER_IMAGES = [
  "/image/91.jpeg",
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

const SERVICES = [
  {
    id: 1,
    icon: "💍",
    title: "Wedding Planning",
    description: "Complete wedding planning from venue selection to ceremony execution",
    features: ["Venue Selection", "Decor & Theme", "Catering", "Photography", "Entertainment"],
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    id: 2,
    icon: "🏢",
    title: "Corporate Events",
    description: "Professional corporate event management for businesses",
    features: ["Conferences", "Seminars", "Product Launches", "Team Building", "Award Ceremonies"],
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    id: 3,
    icon: "🎉",
    title: "Private Parties",
    description: "Memorable private celebrations and social gatherings",
    features: ["Birthdays", "Anniversaries", "Baby Showers", "House Parties", "Theme Parties"],
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    id: 4,
    icon: "🎭",
    title: "Cultural Events",
    description: "Traditional and cultural event celebrations",
    features: ["Festivals", "Religious Ceremonies", "Cultural Shows", "Traditional Weddings", "Community Events"],
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
  },
  {
    id: 5,
    icon: "🎨",
    title: "Decoration",
    description: "Creative and beautiful event decoration services",
    features: ["Theme Decoration", "Floral Arrangements", "Lighting", "Stage Setup", "Venue Transformation"],
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  },
  {
    id: 6,
    icon: "🤝",
    title: "Coordination",
    description: "End-to-end event coordination and management",
    features: ["Vendor Management", "Timeline Planning", "Guest Management", "Logistics", "On-site Coordination"],
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
  }
];

const PROCESS_STEPS = [
  {
    id: 1,
    step: "01",
    title: "Consultation & Vision",
    description: "We begin with understanding your vision, requirements, and budget to create a personalized event plan. Our team listens carefully to your ideas and transforms them into actionable strategies.",
    icon: "💬",
    color: "#667eea"
  },
  {
    id: 2,
    step: "02",
    title: "Planning & Design",
    description: "Our team creates detailed event plans, themes, and designs tailored to your preferences. We focus on every detail to ensure your vision comes to life perfectly.",
    icon: "📋",
    color: "#764ba2"
  },
  {
    id: 3,
    step: "03",
    title: "Vendor Coordination",
    description: "We coordinate with trusted vendors for catering, decor, entertainment, and other services. Our network ensures quality and reliability for your event.",
    icon: "🤝",
    color: "#10b981"
  },
  {
    id: 4,
    step: "04",
    title: "Execution & Management",
    description: "On the event day, our team manages everything ensuring smooth execution and guest experience. We handle all logistics so you can enjoy your special day.",
    icon: "⚡",
    color: "#f97316"
  },
  {
    id: 5,
    step: "05",
    title: "Post-Event Support",
    description: "We provide post-event support including feedback collection and memory preservation. Our relationship continues even after the event concludes.",
    icon: "✅",
    color: "#3b82f6"
  }
];

export default function ProcessAndServices() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
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

  // Fullscreen Slider Auto-rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % MAIN_SLIDER_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Gallery Slider Auto-rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setGalleryIndex((prev) => (prev + 3) % GALLERY_IMAGES.length);
    }, 3000);
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

  const stats = [
    { number: <AnimatedCounter end={500} />, label: "Events Executed" },
    { number: <AnimatedCounter end={98} />, label: "Client Satisfaction" },
    { number: <AnimatedCounter end={50} />, label: "Cities Covered" },
    { number: <AnimatedCounter end={24} />, label: "Hours Support" }
  ];

  return (
    <div className="process-services-section">
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
      </div>

      {/* Main Header */}
      <div className="main-header animate-on-scroll">
        <h1 className="main-title">
          <span className="title-word">Our</span>
          <span className="title-word">Process</span>
          <span className="title-word">& Services</span>
        </h1>
        <div className="title-underline"></div>
        <p className="main-subtitle">
          "Transforming your vision into unforgettable experiences through our proven process and comprehensive services"
        </p>
        <div className="availability-badge pulse">
          <span className="badge-icon">✨</span>
          End-to-End Event Solutions
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

      {/* Process Section */}
      <section className="process-section animate-on-scroll">
        <div className="process-container">
          <h2 className="section-title">Our 5-Step Process</h2>
          <p className="section-subtitle">
            We follow a structured approach to ensure every event is executed flawlessly
          </p>
          
          <div className="process-timeline">
            {PROCESS_STEPS.map((step, index) => (
              <div key={step.id} className="process-step stagger-animate">
                <div className="step-content">
                  <div className="step-indicator">
                    <div 
                      className="step-circle"
                      style={{ 
                        background: step.color,
                        boxShadow: `0 8px 25px ${step.color}40`
                      }}
                    >
                      <span className="step-number">{step.step}</span>
                      <div className="step-icon">{step.icon}</div>
                    </div>
                    {index < PROCESS_STEPS.length - 1 && (
                      <div 
                        className="step-connector"
                        style={{ background: step.color }}
                      ></div>
                    )}
                  </div>
                  
                  <div className="step-details">
                    <div 
                      className="step-header"
                      style={{ borderLeftColor: step.color }}
                    >
                      <h3 className="step-title">{step.title}</h3>
                      <div 
                        className="step-accent"
                        style={{ background: step.color }}
                      ></div>
                    </div>
                    <p className="step-description">{step.description}</p>
                    
                    {/* Step Features */}
                    <div className="step-features">
                      <div className="feature-bullet" style={{ background: step.color }}></div>
                      <span className="feature-text">Personalized Consultation</span>
                    </div>
                    <div className="step-features">
                      <div className="feature-bullet" style={{ background: step.color }}></div>
                      <span className="feature-text">Detailed Planning</span>
                    </div>
                    <div className="step-features">
                      <div className="feature-bullet" style={{ background: step.color }}></div>
                      <span className="feature-text">Professional Execution</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section animate-on-scroll">
        <div className="services-container">
          <h2 className="section-title">Our Comprehensive Services</h2>
          <p className="section-subtitle">
            From intimate gatherings to grand celebrations, we offer complete event solutions
          </p>
          
          <div className="services-grid">
            {SERVICES.map((service) => (
              <div key={service.id} className="service-card stagger-animate">
                <div className="service-header">
                  <div className="service-icon" style={{ background: service.gradient }}>
                    {service.icon}
                  </div>
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-features">
                  {service.features.map((feature, index) => (
                    <span key={index} className="feature-tag">{feature}</span>
                  ))}
                </div>
                <button className="service-button glow">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section animate-on-scroll">
        <div className="why-choose-container">
          <h2 className="section-title">Why Choose Ayush Aura?</h2>
          <div className="features-grid">
            <div className="feature-item stagger-animate">
              <div className="feature-icon">🎯</div>
              <h3>Personalized Approach</h3>
              <p>Every event is unique and we tailor our services to match your specific vision and requirements.</p>
            </div>
            <div className="feature-item stagger-animate">
              <div className="feature-icon">⚡</div>
              <h3>Experienced Team</h3>
              <p>Our professional team has years of experience in creating memorable events across various scales.</p>
            </div>
            <div className="feature-item stagger-animate">
              <div className="feature-icon">💰</div>
              <h3>Transparent Pricing</h3>
              <p>No hidden costs. We provide detailed quotes and work within your budget constraints.</p>
            </div>
            <div className="feature-item stagger-animate">
              <div className="feature-icon">🕒</div>
              <h3>Timely Execution</h3>
              <p>We respect your time and ensure all events are executed as per the scheduled timeline.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Slider Section */}
      <div className="gallery-section animate-on-scroll">
        <h2 className="section-title">Our Event Portfolio</h2>
        <p className="section-subtitle">Glimpses of our successfully executed events</p>
        <div className="gallery-slider">
          {visibleGalleryImages.map((src, index) => (
            <div key={index} className="gallery-item stagger-animate">
              <img
                src={src}
                alt={`Event gallery ${index + 1}`}
                className="gallery-image"
              />
              <div className="gallery-overlay">
                <span>View Event</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <section className="cta-section animate-on-scroll">
        <div className="cta-background"></div>
        <div className="cta-content">
          <h2>Ready to Plan Your Perfect Event?</h2>
          <p>Let's discuss your vision and create something extraordinary together</p>
          <div className="cta-buttons">
            <button className="cta-primary glow">Start Planning</button>
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
      </section>

      <style jsx>{`
        /* --- ENHANCED STYLES WITH ANIMATIONS --- */
        .process-services-section {
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

        /* Enhanced Navigation Buttons */
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

        /* Main Header */
        .main-header {
          text-align: center;
          margin: 80px 20px 60px;
          position: relative;
          z-index: 2;
        }

        .main-title {
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

        .main-subtitle {
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

        /* Section Titles */
        .section-title {
          font-size: 3rem;
          font-weight: 800;
          color: white;
          margin-bottom: 20px;
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

        .section-subtitle {
          font-size: 1.2rem;
          color: #cbd5e1;
          text-align: center;
          max-width: 600px;
          margin: 40px auto 60px;
          line-height: 1.6;
        }

        /* Process Section */
        .process-section {
          padding: 100px 20px;
          background: rgba(255, 255, 255, 0.02);
          margin: 60px 20px;
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
          overflow: hidden;
        }

        .process-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 30% 20%, rgba(102, 126, 234, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .process-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* Process Timeline */
        .process-timeline {
          display: flex;
          flex-direction: column;
          gap: 60px;
          margin-top: 80px;
          position: relative;
        }

        .process-timeline::before {
          content: '';
          position: absolute;
          left: 60px;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          opacity: 0.3;
          border-radius: 10px;
        }

        .process-step {
          position: relative;
          transition: all 0.3s ease;
        }

        .process-step:hover {
          transform: translateX(10px);
        }

        .step-content {
          display: flex;
          align-items: flex-start;
          gap: 40px;
          position: relative;
        }

        .step-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .step-circle {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: all 0.3s ease;
          border: 3px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .process-step:hover .step-circle {
          transform: scale(1.1);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3) !important;
        }

        .step-number {
          font-size: 1.8rem;
          font-weight: 800;
          color: white;
          margin-bottom: 5px;
        }

        .step-icon {
          font-size: 2rem;
          opacity: 0.9;
        }

        .step-connector {
          width: 3px;
          height: 80px;
          background: linear-gradient(180deg, currentColor 0%, transparent 100%);
          opacity: 0.5;
          margin-top: 20px;
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .process-step:hover .step-connector {
          opacity: 0.8;
          transform: scaleY(1.1);
        }

        .step-details {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          padding: 40px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .process-step:hover .step-details {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .step-details::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
          pointer-events: none;
        }

        .step-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-left: 20px;
          border-left: 4px solid;
          position: relative;
        }

        .step-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: white;
          margin: 0;
          background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .step-accent {
          width: 8px;
          height: 40px;
          border-radius: 4px;
          opacity: 0.7;
          animation: pulse-accent 2s ease-in-out infinite;
        }

        @keyframes pulse-accent {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(1.1); }
        }

        .step-description {
          font-size: 1.1rem;
          color: #e2e8f0;
          line-height: 1.7;
          margin-bottom: 25px;
          font-weight: 500;
        }

        .step-features {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          padding: 8px 0;
        }

        .feature-bullet {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
          60% { transform: translateY(-2px); }
        }

        .feature-text {
          color: #cbd5e1;
          font-size: 1rem;
          font-weight: 500;
        }

        /* Alternate layout for even steps */
        .process-step:nth-child(even) .step-content {
          flex-direction: row-reverse;
          text-align: right;
        }

        .process-step:nth-child(even) .step-header {
          padding-left: 0;
          padding-right: 20px;
          border-left: none;
          border-right: 4px solid;
          justify-content: flex-end;
        }

        .process-step:nth-child(even) .step-header .step-accent {
          order: -1;
        }

        /* Services Section */
        .services-section {
          padding: 100px 20px;
          background: rgba(255, 255, 255, 0.02);
          margin: 60px 20px;
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .services-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 40px;
          margin-top: 60px;
        }

        .service-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 25px;
          padding: 50px 35px;
          text-align: center;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .service-card:hover {
          transform: translateY(-15px);
          box-shadow: 0 25px 50px rgba(102, 126, 234, 0.3);
        }

        .service-header {
          margin-bottom: 30px;
        }

        .service-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          margin: 0 auto 25px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .service-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: white;
          margin-bottom: 20px;
        }

        .service-description {
          font-size: 1.1rem;
          color: #e2e8f0;
          line-height: 1.6;
          margin-bottom: 25px;
        }

        .service-features {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-bottom: 30px;
        }

        .feature-tag {
          background: rgba(255, 255, 255, 0.1);
          color: #e2e8f0;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .service-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 14px 35px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
        }

        .glow:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        /* Why Choose Us Section */
        .why-choose-section {
          padding: 100px 20px;
          background: rgba(255, 255, 255, 0.02);
          margin: 60px 20px;
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .why-choose-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          margin-top: 60px;
        }

        .feature-item {
          text-align: center;
          padding: 40px 30px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.3s ease;
        }

        .feature-item:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.2);
        }

        .feature-icon {
          font-size: 3.5rem;
          margin-bottom: 25px;
        }

        .feature-item h3 {
          font-size: 1.4rem;
          font-weight: 700;
          color: white;
          margin-bottom: 20px;
        }

        .feature-item p {
          font-size: 1.05rem;
          color: #e2e8f0;
          line-height: 1.6;
        }

        /* Gallery Section */
        .gallery-section {
          padding: 100px 20px;
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
          margin-top: 60px;
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

        .gallery-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 20px;
          color: white;
          font-weight: 600;
          font-size: 1.2rem;
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        /* CTA Section */
        .cta-section {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          margin: 60px 20px;
          padding: 100px 40px;
          border-radius: 30px;
          text-align: center;
          color: white;
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
          font-size: 3.5rem;
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

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .process-timeline::before {
            left: 30px;
          }
          
          .step-content {
            flex-direction: column !important;
            gap: 25px;
            text-align: center;
          }
          
          .step-circle {
            width: 100px;
            height: 100px;
          }
          
          .step-number {
            font-size: 1.5rem;
          }
          
          .step-icon {
            font-size: 1.8rem;
          }
          
          .step-details {
            padding: 30px 25px;
          }
          
          .step-header {
            padding-left: 0;
            border-left: none;
            justify-content: center;
            flex-direction: column;
            gap: 15px;
          }
          
          .step-title {
            font-size: 1.5rem;
          }
          
          .step-accent {
            display: none;
          }
          
          .step-connector {
            height: 40px;
          }
          
          .process-step:nth-child(even) .step-header {
            padding-right: 0;
            border-right: none;
          }

          .main-title {
            font-size: 3rem;
          }

          .section-title {
            font-size: 2.5rem;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .gallery-item {
            min-width: 100%;
          }

          .nav-button {
            padding: 15px;
            width: 50px;
            height: 50px;
            font-size: 20px;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .contact-info {
            flex-direction: column;
            gap: 20px;
          }

          .cta-content h2 {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 480px) {
          .main-title {
            font-size: 2.5rem;
          }

          .main-header {
            margin: 60px 16px 40px;
          }

          .process-section,
          .services-section,
          .why-choose-section,
          .gallery-section,
          .cta-section {
            margin: 40px 16px;
            padding: 60px 25px;
          }

          .service-card {
            padding: 40px 25px;
          }

          .cta-section {
            padding: 60px 25px;
          }

          .cta-content h2 {
            font-size: 2rem;
          }

          .step-circle {
            width: 80px;
            height: 80px;
          }
          
          .step-number {
            font-size: 1.3rem;
          }
          
          .step-icon {
            font-size: 1.5rem;
          }
          
          .step-details {
            padding: 25px 20px;
          }
          
          .step-title {
            font-size: 1.3rem;
          }
          
          .step-description {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}