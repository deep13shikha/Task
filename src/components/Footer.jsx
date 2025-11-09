import React, { useState } from "react";

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic can be added here
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const socialLinks = [
    { 
      name: "Facebook", 
      icon: "/image/facebook-app-symbol.png", 
      url: "",
      // color: "#1877F2"
    },
    { 
      name: "Instagram", 
      icon: "/image/instagram.png", 
      url: "",
      // color: "#E4405F"
    },
    { 
      name: "Twitter", 
      icon: "/image/twitter.png", 
      url: "",
      // color: "#1DA1F2"
    },
   
    
   
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Venues", path: "/venues" },
    { name: "Services", path: "/process" },
    { name: "Contact", path: "/contact" }
  ];

  const services = [
    "Wedding Planning",
    "Corporate Events",
    "Private Parties",
    "Cultural Events",
    "Decoration Services",
    "Event Coordination"
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Contact Form Section */}
        <div className="contact-form-section">
          <h3 className="form-title">Get In Touch</h3>
          <p className="form-subtitle">Ready to plan your perfect event? Send us a message!</p>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
                className="form-textarea"
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>

        {/* Company Info & Links */}
        <div className="footer-sections">
          {/* Company Info */}
          <div className="footer-section">
            <div className="logo-section">
              {/* <img 
                // src="/image.png" 
                // alt="Ayush Aura Logo" 
                className="footer-logo"
                onError={(e) => {
                  e.target.src = "/logo.png";
                }}
              /> */}
            </div>
            <p className="company-description">
              Creating unforgettable moments with flawless event planning and management. 
              From intimate gatherings to grand celebrations across India.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+91 98765 43210</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span>hello@ayushaura.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>Available Across All India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="section-title">Quick Links</h4>
            <ul className="links-list">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.path} className="footer-link">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h4 className="section-title">Our Services</h4>
            <ul className="links-list">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="service-item">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="footer-section">
            <h4 className="section-title">Follow Us</h4>
            <p className="social-description">
              Stay connected for event inspiration and updates
            </p>
            <div className="social-icons">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  style={{ backgroundColor: social.color }}
                >
                  <img 
                    src={social.icon} 
                    alt={`${social.name} icon`}
                    className="social-icon-img"
                  />
                </a>
              ))}
            </div>
            
            {/* Newsletter Signup */}
            <div className="newsletter">
              <h5 className="newsletter-title">Newsletter</h5>
              <p className="newsletter-text">Get event tips and offers</p>
              <div className="newsletter-input-group">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="newsletter-input"
                />
                <button className="newsletter-button">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">
            © 2025 Ayush Aura Event Planning & Management. All rights reserved.
          </p>
          <div className="footer-links">
            <a href="/privacy" className="footer-bottom-link">Privacy Policy</a>
            <a href="/terms" className="footer-bottom-link">Terms of Service</a>
            <a href="/cookies" className="footer-bottom-link">Cookie Policy</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          color: white;
          margin-top: 80px;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 20px 40px;
        }

        /* Contact Form Section */
        .contact-form-section {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          padding: 40px;
          border-radius: 20px;
          margin-bottom: 50px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .form-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .form-subtitle {
          color: #cbd5e1;
          margin-bottom: 30px;
          font-size: 1.1rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-input,
        .form-textarea {
          padding: 15px 20px;
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          color: white;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: #94a3b8;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #667eea;
          background: rgba(255, 255, 255, 0.1);
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 16px 30px;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        /* Footer Sections */
        .footer-sections {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 40px;
          margin-bottom: 40px;
        }

        .footer-section {
          display: flex;
          flex-direction: column;
        }

        .footer-logo {
          width: 180px;
          height: auto;
          margin-bottom: 20px;
          filter: brightness(0) invert(1);
        }

        .company-description {
          color: #cbd5e1;
          line-height: 1.6;
          margin-bottom: 25px;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #cbd5e1;
        }

        .contact-icon {
          font-size: 1.2rem;
        }

        .section-title {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 20px;
          color: white;
        }

        .links-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-link,
        .service-item {
          color: #cbd5e1;
          text-decoration: none;
          transition: color 0.3s ease;
          cursor: pointer;
        }

        .footer-link:hover {
          color: #667eea;
        }

        .service-item {
          cursor: default;
        }

        .social-description {
          color: #cbd5e1;
          margin-bottom: 20px;
          font-size: 0.9rem;
        }

        .social-icons {
          display: flex;
          gap: 12px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .social-icon {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          overflow: hidden;
          position: relative;
        }

        .social-icon-img {
          width: 24px;
          height: 24px;
          object-fit: contain;
          filter: brightness(0) invert(1);
          transition: transform 0.3s ease;
        }

        .social-icon:hover {
          transform: translateY(-3px);
          border-color: white;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .social-icon:hover .social-icon-img {
          transform: scale(1.1);
        }

        .newsletter {
          margin-top: 20px;
        }

        .newsletter-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: white;
        }

        .newsletter-text {
          color: #cbd5e1;
          font-size: 0.9rem;
          margin-bottom: 15px;
        }

        .newsletter-input-group {
          display: flex;
          gap: 8px;
        }

        .newsletter-input {
          flex: 1;
          padding: 12px 15px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          color: white;
          font-size: 0.9rem;
        }

        .newsletter-input::placeholder {
          color: #94a3b8;
        }

        .newsletter-button {
          background: #667eea;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .newsletter-button:hover {
          background: #5a6fd8;
        }

        /* Footer Bottom */
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 25px 20px;
        }

        .footer-bottom-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .copyright {
          color: #94a3b8;
          font-size: 0.9rem;
        }

        .footer-links {
          display: flex;
          gap: 25px;
        }

        .footer-bottom-link {
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }

        .footer-bottom-link:hover {
          color: #667eea;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .footer-sections {
            grid-template-columns: 1fr 1fr;
            gap: 40px 30px;
          }
        }

        @media (max-width: 768px) {
          .footer-content {
            padding: 40px 20px 30px;
          }

          .contact-form-section {
            padding: 30px 25px;
          }

          .form-title {
            font-size: 1.7rem;
          }

          .footer-sections {
            grid-template-columns: 1fr;
            gap: 35px;
          }

          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
            gap: 15px;
          }

          .footer-links {
            justify-content: center;
          }

          .newsletter-input-group {
            flex-direction: column;
          }

          .social-icons {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .contact-form-section {
            padding: 25px 20px;
          }

          .form-title {
            font-size: 1.5rem;
          }

          .footer-logo {
            width: 150px;
          }

          .social-icon {
            width: 40px;
            height: 40px;
          }

          .social-icon-img {
            width: 20px;
            height: 20px;
          }
        }
      `}</style>
    </footer>
  );
}