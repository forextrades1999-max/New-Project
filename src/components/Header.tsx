/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SunloLogo } from './SunloLogo';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onStartConversation: () => void;
  onSignIn: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onStartConversation, onSignIn }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Safety', href: '#safety' },
    { label: 'About', href: '#about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F7F5EE]/95 backdrop-blur-md border-b border-[#E5DFD3] py-3.5 shadow-sm shadow-[#28483E]/5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Sunlo Logo Wordmark */}
          <a
            href="#"
            className="flex items-center gap-2 group transition-opacity hover:opacity-90 whitespace-nowrap shrink-0"
            aria-label="sunlo Home"
          >
            <SunloLogo size="md" />
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5C5A55]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#28483E] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C27C5A] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Sign In & Primary Action */}
          <div className="hidden md:flex items-center gap-5 shrink-0">
            <button
              onClick={onSignIn}
              className="text-sm font-medium text-[#5C5A55] hover:text-[#28483E] transition-colors whitespace-nowrap"
            >
              Sign in
            </button>
            <button
              onClick={onStartConversation}
              className="bg-[#28483E] hover:bg-[#1E3830] text-[#F7F5EE] font-medium text-sm px-5 py-2.5 rounded-full transition-all transform active:scale-95 whitespace-nowrap shadow-sm hover:shadow-[#28483E]/15"
            >
              Make a little space
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={onStartConversation}
              className="bg-[#28483E] text-[#F7F5EE] font-medium text-xs px-3.5 py-2 rounded-full whitespace-nowrap"
            >
              Make space
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#5C5A55] hover:text-[#28483E] focus:outline-none focus:ring-1 focus:ring-[#E5DFD3] rounded-lg"
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F3] border-b border-[#E5DFD3] px-6 py-6 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4 text-base font-medium text-[#5C5A55]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 hover:text-[#28483E] border-b border-[#E5DFD3]/60"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onSignIn();
                }}
                className="w-full text-left py-2 text-[#5C5A55] hover:text-[#28483E]"
              >
                Sign in
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onStartConversation();
                }}
                className="w-full bg-[#28483E] text-[#F7F5EE] font-medium py-3 rounded-full text-center"
              >
                Make a little space
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
