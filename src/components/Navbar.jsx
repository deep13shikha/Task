import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getLinkStyle = (path) => {
    return {
      ...linkStyle,
      ...(isActive(path) && activeLinkStyle)
    };
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "15px 5%",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        background: isScrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.98)",
        zIndex: 1000,
        boxShadow: isScrolled ? "0 4px 20px rgba(0, 0, 0, 0.1)" : "none",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        borderBottom: isScrolled ? "1px solid #e2e8f0" : "none",
      }}
    >
      {/* Logo Section */}
      <Link to="/" style={{ display: "flex", alignItems: "center", zIndex: 1001, textDecoration: "none" }}>
        <img
          src="/image/image.png"
          alt="Ayush Aura Logo"
          style={{ 
            width: "180px", 
            height: "auto",
            maxWidth: "100%",
            transition: "all 0.3s ease"
          }}
          onError={(e) => {
            e.target.src = "/logo.png"; // Fallback if image.png doesn't exist
          }}
        />
      </Link>

      {/* Desktop Menu */}
      {!isMobile && (
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: "30px",
            fontSize: "15px",
            fontWeight: "600",
            color: "#1e293b",
            letterSpacing: "0.5px",
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <Link to="/" style={getLinkStyle("/")}>
              HOME
            </Link>
          </li>
          <li>
            <Link to="/about" style={getLinkStyle("/about")}>
              ABOUT US
            </Link>
          </li>
          <li>
            <Link to="/venues" style={getLinkStyle("/venues")}>
              VENUES
            </Link>
          </li>
          <li>
            <Link to="/process" style={getLinkStyle("/process")}>
              SERVICES
            </Link>
          </li>
          <li>
            <Link to="/contact" style={getLinkStyle("/contact")}>
              CONTACT US
            </Link>
          </li>
        </ul>
      )}

      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={toggleMenu}
          style={{
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "6px",
            zIndex: 1001,
            color: "#1e293b",
            transition: "all 0.3s ease",
          }}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      )}

      {/* Mobile Menu Overlay */}
      {isMobile && isMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 20px 40px",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              fontSize: "18px",
              fontWeight: "600",
              color: "#1e293b",
              textAlign: "center",
              margin: 0,
              padding: 0,
              width: "100%",
              maxWidth: "300px",
            }}
          >
            <li style={{ width: "100%" }}>
              <Link 
                to="/" 
                style={{
                  ...getLinkStyle("/"),
                  display: "block",
                  padding: "16px 24px",
                  borderRadius: "12px",
                  backgroundColor: isActive("/") ? "rgba(102, 126, 234, 0.1)" : "transparent",
                  border: isActive("/") ? "2px solid #667eea" : "2px solid transparent",
                }}
                onClick={closeMenu}
              >
                HOME
              </Link>
            </li>
            <li style={{ width: "100%" }}>
              <Link 
                to="/about" 
                style={{
                  ...getLinkStyle("/about"),
                  display: "block",
                  padding: "16px 24px",
                  borderRadius: "12px",
                  backgroundColor: isActive("/about") ? "rgba(102, 126, 234, 0.1)" : "transparent",
                  border: isActive("/about") ? "2px solid #667eea" : "2px solid transparent",
                }}
                onClick={closeMenu}
              >
                ABOUT US
              </Link>
            </li>
            <li style={{ width: "100%" }}>
              <Link 
                to="/venues" 
                style={{
                  ...getLinkStyle("/venues"),
                  display: "block",
                  padding: "16px 24px",
                  borderRadius: "12px",
                  backgroundColor: isActive("/venues") ? "rgba(102, 126, 234, 0.1)" : "transparent",
                  border: isActive("/venues") ? "2px solid #667eea" : "2px solid transparent",
                }}
                onClick={closeMenu}
              >
                VENUES
              </Link>
            </li>
            <li style={{ width: "100%" }}>
              <Link 
                to="/process" 
                style={{
                  ...getLinkStyle("/process"),
                  display: "block",
                  padding: "16px 24px",
                  borderRadius: "12px",
                  backgroundColor: isActive("/process") ? "rgba(102, 126, 234, 0.1)" : "transparent",
                  border: isActive("/process") ? "2px solid #667eea" : "2px solid transparent",
                }}
                onClick={closeMenu}
              >
                SERVICES
              </Link>
            </li>
            <li style={{ width: "100%" }}>
              <Link 
                to="/contact" 
                style={{
                  ...getLinkStyle("/contact"),
                  display: "block",
                  padding: "16px 24px",
                  borderRadius: "12px",
                  backgroundColor: isActive("/contact") ? "rgba(102, 126, 234, 0.1)" : "transparent",
                  border: isActive("/contact") ? "2px solid #667eea" : "2px solid transparent",
                }}
                onClick={closeMenu}
              >
                CONTACT US
              </Link>
            </li>
          </ul>

          {/* Close button for mobile */}
          <button
            onClick={closeMenu}
            style={{
              position: "absolute",
              top: "25px",
              right: "25px",
              background: "rgba(255, 255, 255, 0.9)",
              border: "2px solid #e2e8f0",
              fontSize: "20px",
              cursor: "pointer",
              padding: "10px 12px",
              borderRadius: "8px",
              color: "#1e293b",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#667eea";
              e.target.style.color = "white";
              e.target.style.borderColor = "#667eea";
            }}
            onMouseLeave={(e) => {
              if (isMenuOpen) {
                e.target.style.background = "rgba(255, 255, 255, 0.9)";
                e.target.style.color = "#1e293b";
                e.target.style.borderColor = "#e2e8f0";
              }
            }}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
      )}

      <style jsx>{`
        /* Global styles for the navbar */
        @media (max-width: 768px) {
          nav {
            padding: 12px 20px !important;
          }
          
          .mobile-menu-link {
            padding: 16px 20px !important;
            font-size: 18px !important;
            text-align: center;
            width: 100%;
            transition: all 0.3s ease;
          }
          
          .mobile-menu-link:hover {
            background: rgba(102, 126, 234, 0.1) !important;
            transform: translateX(5px);
          }
        }
        
        @media (max-width: 480px) {
          nav {
            padding: 10px 16px !important;
          }
          
          .logo-img {
            width: 150px !important;
          }
          
          .mobile-menu-link {
            padding: 14px 18px !important;
            font-size: 16px !important;
          }
        }
        
        @media (max-width: 360px) {
          .mobile-menu-link {
            padding: 12px 16px !important;
            font-size: 15px !important;
          }
          
          .logo-img {
            width: 130px !important;
          }
        }
      `}</style>
    </nav>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#64748b",
  transition: "all 0.3s ease",
  padding: "10px 16px",
  borderRadius: "8px",
  fontWeight: "600",
  display: "block",
  position: "relative",
};

const activeLinkStyle = {
  color: "#667eea",
  backgroundColor: "rgba(102, 126, 234, 0.1)",
  fontWeight: "700",
};

const hoverStyle = `
  nav ul li a:hover {
    color: #667eea;
    background-color: rgba(102, 126, 234, 0.05);
    transform: translateY(-1px);
  }
  
  nav ul li a::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }
  
  nav ul li a:hover::after {
    width: 80%;
  }
  
  nav ul li a.active::after {
    width: 80%;
  }
`;

// Add hover styles to document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = hoverStyle;
  document.head.appendChild(styleSheet);
}