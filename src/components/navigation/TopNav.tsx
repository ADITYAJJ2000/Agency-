import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CTAButton from '../common/CTAButton';

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Why Us', href: '/why-us' },
  { label: 'Team', href: '/team' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

const TopNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <header className="nav">
        <Link to="/" className="nav__brand" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span className="nav__logo">NOVA</span>
          <span className="nav__tagline">Full-Service Digital & Tech</span>
        </Link>
        <nav className="nav__links">
          {navLinks.map((item) => (
            <Link key={item.label} to={item.href} onClick={closeMenu}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nav__cta">
          <CTAButton label="Get Free Consultation" size="small" />
        </div>
        <button
          className={`mobile-menu-toggle ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={isMenuOpen ? 'open' : ''}></span>
          <span className={isMenuOpen ? 'open' : ''}></span>
          <span className={isMenuOpen ? 'open' : ''}></span>
        </button>
      </header>
      {isMenuOpen && (
        <>
          <div className="mobile-menu__overlay" onClick={closeMenu}></div>
          <div className={`mobile-menu ${isMenuOpen ? 'mobile-menu--open' : ''}`}>
            <nav className="mobile-menu__nav">
              {navLinks.map((item) => (
                <Link key={item.label} to={item.href} onClick={closeMenu}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mobile-menu__cta">
              <CTAButton label="Get Free Consultation" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TopNav;

