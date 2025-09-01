import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from './Icon';

/**
 * PUBLIC_INTERFACE
 * Navbar - sticky top navigation with neon/cyberpunk accent placeholders
 */
export default function Navbar() {
  return (
    <header className="navbar" role="navigation" aria-label="Main">
      <div className="container nav-inner">
        <Link to="/" className="brand" aria-label="Go to Home">
          <Icon name="logo" />
          <span className="brand-text">Harish<span className="accent">.V</span></span>
        </Link>
        <nav className="nav-links">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/blog" className="nav-link">Blog</NavLink>
          <NavLink to="/contact" className="nav-link">Contact</NavLink>
          <a className="nav-link" href="/assets/resume/HarishV-Resume.pdf" download>
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
