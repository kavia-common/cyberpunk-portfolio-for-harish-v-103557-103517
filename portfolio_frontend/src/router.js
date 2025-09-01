import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Layout components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

/**
 * PUBLIC_INTERFACE
 * AppRouter sets up client-side routing for the application.
 * Routes:
 * - /            -> Home
 * - /blog        -> Blog list
 * - /blog/:slug  -> Blog post detail (markdown to be rendered later)
 * - /contact     -> Contact page
 * - *            -> NotFound
 */
export default function AppRouter() {
  return (
    <BrowserRouter>
      <div className="layout layout-shell">
        <Navbar />
        <main className="content" role="main" aria-live="polite">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
