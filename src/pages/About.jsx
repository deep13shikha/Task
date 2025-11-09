import React, { useState, useEffect, useRef } from "react";

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

export default function About() {
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

  const stats = [
    { number: <AnimatedCounter end={500} />, label: "Successful Events" },
    { number: <AnimatedCounter end={98} />, label: "Client Satisfaction" },
    { number: <AnimatedCounter end={50} />, label: "Cities Across India" },
    { number: <AnimatedCounter end={24} />, label: "Hours Support" }
  ];

  return (
    <section className="about-section">
      {/* Floating Particles Background */}
      <FloatingParticles count={20} />
      
      <div className="about-container">
        {/* Header Section */}
        <div className="about-header animate-on-scroll">
          <h2 className="about-title">
            <span className="title-word">About</span>
            <span className="title-word">Ayush Aura</span>
          </h2>
          <div className="title-underline"></div>
          <p className="about-subtitle">
            Crafting Unforgettable Moments, One Event at a Time
          </p>
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

        {/* Main Content */}
        <div className="about-content">
          <div className="about-text">
            {/* Main About Section with Image */}
            <div className="main-about-section animate-on-scroll stagger-animate">
              <div className="about-image-container">
                <img 
                  src="/image/1.jpg" 
                  alt="Event Management by Ayush Aura"
                  className="about-image"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80";
                  }}
                />
                <div className="image-overlay">
                  <div className="overlay-text">
                    <span className="overlay-icon">✨</span>
                    <span>Creating Magical Experiences</span>
                  </div>
                </div>
              </div>
              
              <div className="about-description">
                <h3 className="text-title">About Event Planning & Management</h3>
                <p className="about-paragraph">
                  At <strong>Ayush Aura</strong>, we believe that every celebration deserves a 
                  magical touch.
                </p>
                <p className="about-paragraph">
                  We are a creative event planning and management company dedicated to 
                  transforming your ideas into unforgettable experiences. From elegant 
                  weddings and corporate gatherings to intimate celebrations and cultural 
                  events, we plan, design, and execute with perfection.
                </p>
                <p className="about-paragraph">
                  Our goal is simple: to make every event stress-free, beautiful, and full of joy.
                </p>
                <p className="about-paragraph">
                  With a passionate team and an eye for detail, we handle everything from 
                  venue setup and décor to guest coordination and entertainment—ensuring 
                  every moment reflects your unique style and vision.
                </p>
              </div>
            </div>

            {/* Inspirational Quote 1 */}
            <div className="quote-card animate-on-scroll stagger-animate">
              <div className="quote-icon">❝</div>
              <blockquote className="quote-text">
                "The details are not the details. They make the design."
              </blockquote>
              <cite className="quote-author">- Charles Eames</cite>
            </div>

            <div className="features-grid animate-on-scroll">
              <div className="feature-item stagger-animate">
                <div className="feature-icon">🎯</div>
                <h4>Precision Planning</h4>
                <p>Meticulous attention to every detail</p>
              </div>
              <div className="feature-item stagger-animate">
                <div className="feature-icon">✨</div>
                <h4>Creative Excellence</h4>
                <p>Innovative designs that wow your guests</p>
              </div>
              <div className="feature-item stagger-animate">
                <div className="feature-icon">🤝</div>
                <h4>Personal Service</h4>
                <p>Dedicated support throughout your journey</p>
              </div>
            </div>

            {/* Client Testimonial Quote */}
            <div className="testimonial-quote animate-on-scroll stagger-animate">
              <div className="testimonial-content">
                <div className="quote-icon bounce">🌟</div>
                <blockquote className="testimonial-text">
                  "Ayush Aura turned our wedding into a fairy tale! Their attention to detail 
                  and creative vision exceeded all our expectations. Truly magical!"
                </blockquote>
                <div className="client-info">
                  <div className="client-avatar">SR</div>
                  <div className="client-details">
                    <strong>Sarah & Ryan</strong>
                    <span>Wedding Clients, 2024</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Motivational Quote */}
            <div className="quote-card motivational animate-on-scroll stagger-animate">
              <div className="quote-icon">💫</div>
              <blockquote className="quote-text">
                "We don't just plan events; we create memories that last a lifetime. 
                Every celebration is a new story waiting to be told."
              </blockquote>
              <cite className="quote-author">- Ayush Aura Team Philosophy</cite>
            </div>
          </div>

          {/* Visual Element */}
          <div className="about-visual">
            <div className="visual-card animate-on-scroll stagger-animate">
              <div className="card-content">
                <h4>Why Choose Ayush Aura?</h4>
                <ul className="benefits-list">
                  <li>✓ <AnimatedCounter end={500} /> Successful Events</li>
                  <li>✓ <AnimatedCounter end={98} />% Client Satisfaction</li>
                  <li>✓ <AnimatedCounter end={24} />/7 Support</li>
                  <li>✓ Custom Solutions</li>
                  <li>✓ Premium Vendors</li>
                </ul>
                
                {/* Sidebar Quote */}
                <div className="sidebar-quote">
                  <div className="sidebar-quote-icon">💭</div>
                  <p className="sidebar-quote-text">
                    "Great events don't happen by accident. They happen by appointment."
                  </p>
                </div>
              </div>
            </div>

            {/* Industry Quote */}
            <div className="industry-quote animate-on-scroll stagger-animate">
              <div className="industry-quote-content">
                <p>"The success of your event isn't just in the planning, but in the passion behind it."</p>
                <span>- Event Industry Proverb</span>
              </div>
            </div>

            {/* Services Highlights */}
            <div className="services-highlight animate-on-scroll stagger-animate">
              <h4>Our Expertise</h4>
              <div className="services-list">
                <div className="service-tag">💒 Wedding Planning</div>
                <div className="service-tag">🏢 Corporate Events</div>
                <div className="service-tag">🎂 Private Parties</div>
                <div className="service-tag">🎨 Cultural Events</div>
                <div className="service-tag">✨ Decoration</div>
                <div className="service-tag">📋 Coordination</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quotes Section */}
        <div className="quotes-section animate-on-scroll">
          <h3 className="quotes-title">Words We Live By</h3>
          <div className="quotes-grid">
            <div className="mini-quote stagger-animate">
              <div className="mini-quote-icon">🎨</div>
              <p>"Creativity is intelligence having fun."</p>
              <span>- Albert Einstein</span>
            </div>
            <div className="mini-quote stagger-animate">
              <div className="mini-quote-icon">❤️</div>
              <p>"People will forget what you said, but never how you made them feel."</p>
              <span>- Maya Angelou</span>
            </div>
            <div className="mini-quote stagger-animate">
              <div className="mini-quote-icon">⚡</div>
              <p>"The magic is in the details."</p>
              <span>- Event Planning Wisdom</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-section {
          padding: 80px 20px;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
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

        .about-container {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          position: relative;
          z-index: 2;
        }

        .about-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .about-title {
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

        .about-subtitle {
          font-size: 1.3rem;
          color: #cbd5e1;
          font-weight: 500;
          max-width: 600px;
          margin: 0 auto;
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

        .about-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 60px;
          align-items: start;
          margin-bottom: 80px;
        }

        .about-text {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        /* Main About Section with Image */
        .main-about-section {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .main-about-section:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.2);
        }

        .about-image-container {
          position: relative;
          width: 100%;
          height: 300px;
          overflow: hidden;
        }

        .about-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .main-about-section:hover .about-image {
          transform: scale(1.05);
        }

        .image-overlay {
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
        }

        .main-about-section:hover .image-overlay {
          opacity: 1;
        }

        .overlay-text {
          color: white;
          text-align: center;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .overlay-icon {
          display: block;
          font-size: 2.5rem;
          margin-bottom: 10px;
        }

        .about-description {
          padding: 40px;
        }

        .text-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: white;
          margin-bottom: 25px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .about-paragraph {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #e2e8f0;
          margin-bottom: 20px;
        }

        .about-paragraph strong {
          color: white;
          font-weight: 700;
        }

        /* Quote Cards */
        .quote-card {
          background: rgba(255, 249, 219, 0.1);
          backdrop-filter: blur(20px);
          padding: 40px 32px;
          border-radius: 20px;
          border: 1px solid rgba(245, 159, 0, 0.3);
          position: relative;
          transition: transform 0.3s ease;
        }

        .quote-card:hover {
          transform: translateY(-5px);
        }

        .quote-card.motivational {
          background: rgba(227, 242, 253, 0.1);
          border: 1px solid rgba(25, 118, 210, 0.3);
        }

        .quote-icon {
          font-size: 3rem;
          color: #fbbf24;
          margin-bottom: 20px;
          opacity: 0.8;
        }

        .quote-card.motivational .quote-icon {
          color: #60a5fa;
        }

        .quote-text {
          font-size: 1.3rem;
          font-style: italic;
          line-height: 1.6;
          color: white;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .quote-author {
          font-size: 1rem;
          color: #cbd5e1;
          font-weight: 600;
          font-style: normal;
        }

        /* Testimonial Quote */
        .testimonial-quote {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          padding: 40px 32px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease;
        }

        .testimonial-quote:hover {
          transform: translateY(-5px);
        }

        .testimonial-content {
          text-align: center;
        }

        .bounce {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        .testimonial-text {
          font-size: 1.2rem;
          line-height: 1.6;
          color: #e2e8f0;
          font-style: italic;
          margin: 20px 0;
        }

        .client-info {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: 30px;
        }

        .client-avatar {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 1.2rem;
          border: 3px solid rgba(255, 255, 255, 0.2);
        }

        .client-details {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .client-details strong {
          color: white;
          font-size: 1.1rem;
        }

        .client-details span {
          color: #cbd5e1;
          font-size: 0.9rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 20px;
        }

        .feature-item {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          padding: 30px 24px;
          border-radius: 16px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature-item:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.2);
          background: rgba(102, 126, 234, 0.1);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .feature-item h4 {
          font-size: 1.2rem;
          font-weight: 600;
          color: white;
          margin-bottom: 12px;
        }

        .feature-item p {
          font-size: 0.95rem;
          color: #cbd5e1;
          line-height: 1.5;
        }

        .about-visual {
          position: sticky;
          top: 100px;
        }

        .visual-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 32px;
          border-radius: 25px;
          color: white;
          box-shadow: 0 25px 50px rgba(102, 126, 234, 0.4);
          margin-bottom: 30px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: transform 0.3s ease;
        }

        .visual-card:hover {
          transform: translateY(-5px);
        }

        .card-content h4 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 30px;
          text-align: center;
        }

        .benefits-list {
          list-style: none;
          padding: 0;
          margin: 0 0 30px 0;
        }

        .benefits-list li {
          padding: 15px 0;
          font-size: 1.1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
          font-weight: 500;
        }

        .benefits-list li:last-child {
          border-bottom: none;
        }

        /* Services Highlight */
        .services-highlight {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          padding: 30px 25px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 30px;
        }

        .services-highlight h4 {
          font-size: 1.3rem;
          font-weight: 600;
          color: white;
          margin-bottom: 20px;
          text-align: center;
        }

        .services-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .service-tag {
          background: rgba(102, 126, 234, 0.2);
          padding: 12px 16px;
          border-radius: 10px;
          color: #e2e8f0;
          font-size: 0.9rem;
          text-align: center;
          border: 1px solid rgba(102, 126, 234, 0.3);
          transition: all 0.3s ease;
        }

        .service-tag:hover {
          background: rgba(102, 126, 234, 0.4);
          transform: translateY(-2px);
        }

        /* Sidebar Quote */
        .sidebar-quote {
          background: rgba(255, 255, 255, 0.2);
          padding: 25px 20px;
          border-radius: 16px;
          margin-top: 30px;
          text-align: center;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .sidebar-quote-icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }

        .sidebar-quote-text {
          font-style: italic;
          line-height: 1.5;
          font-size: 1.05rem;
          font-weight: 500;
        }

        /* Industry Quote */
        .industry-quote {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          padding: 30px 24px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
          transition: transform 0.3s ease;
        }

        .industry-quote:hover {
          transform: translateY(-5px);
        }

        .industry-quote-content p {
          font-style: italic;
          color: #e2e8f0;
          font-size: 1.1rem;
          margin-bottom: 15px;
          line-height: 1.5;
          font-weight: 500;
        }

        .industry-quote-content span {
          color: #cbd5e1;
          font-size: 0.9rem;
          font-weight: 500;
        }

        /* Bottom Quotes Section */
        .quotes-section {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          padding: 80px 40px;
          border-radius: 25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          text-align: center;
        }

        .quotes-title {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 50px;
        }

        .quotes-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .mini-quote {
          padding: 40px 25px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          transition: transform 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mini-quote:hover {
          transform: translateY(-8px);
          background: rgba(102, 126, 234, 0.1);
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.2);
        }

        .mini-quote-icon {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }

        .mini-quote p {
          font-style: italic;
          color: #e2e8f0;
          line-height: 1.5;
          margin-bottom: 15px;
          font-size: 1.05rem;
          font-weight: 500;
        }

        .mini-quote span {
          color: #cbd5e1;
          font-size: 0.9rem;
          font-weight: 500;
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

        /* Responsive Design */
        @media (max-width: 1024px) {
          .about-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .quotes-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .about-visual {
            position: static;
          }

          .services-list {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .about-section {
            padding: 60px 16px;
          }

          .about-title {
            font-size: 3rem;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .quotes-grid {
            grid-template-columns: 1fr;
          }

          .about-description {
            padding: 30px 24px;
          }

          .visual-card {
            padding: 30px 24px;
          }

          .quote-text {
            font-size: 1.1rem;
          }

          .testimonial-text {
            font-size: 1.1rem;
          }

          .quotes-title {
            font-size: 2rem;
          }

          .services-list {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .about-title {
            font-size: 2.5rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .about-content {
            gap: 30px;
          }

          .about-description {
            padding: 25px 20px;
          }

          .visual-card {
            padding: 25px 20px;
          }

          .quotes-section {
            padding: 60px 25px;
          }

          .mini-quote {
            padding: 30px 20px;
          }

          .services-list {
            grid-template-columns: 1fr;
          }

          .about-image-container {
            height: 250px;
          }
        }
      `}</style>
    </section>
  );
}