import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from './Icon';

/**
 * PUBLIC_INTERFACE
 * Navbar - sticky top navigation with neon/cyberpunk accent placeholders
 * - Responsive with hamburger menu on small screens
 * - Uses NavLink for active link styling
 */
export default function Navbar() {
  const [open, setOpen] = React.useState(false);

  // Close menu on route change hash clicks or window resize up
  React.useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768 && open) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [open]);

  const getNavClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;

  return (
    <header className="navbar" role="navigation" aria-label="Main">
      <div className="container nav-inner">
        <Link to="/" className="brand" aria-label="Go to Home" onClick={() => setOpen(false)}>
          <Icon name="logo" />
          <span className="brand-text">Harish<span className="accent">.V</span></span>
        </Link>

        {/* Mobile hamburger */}
        <button
          className="icon-button nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open ? 'true' : 'false'}
          onClick={() => setOpen(v => !v)}
        >
          {/* simple hamburger icon */}
          <span aria-hidden="true">☰</span>
        </button>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <NavLink to="/" className={getNavClass} onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/blog" className={getNavClass} onClick={() => setOpen(false)}>Blog</NavLink>
          <NavLink to="/contact" className={getNavClass} onClick={() => setOpen(false)}>Contact</NavLink>
          <a className="nav-link" href="/assets/resume/HarishV-Resume.pdf" onClick={() => setOpen(false)} download>
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
