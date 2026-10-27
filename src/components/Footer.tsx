/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SunloLogo } from './SunloLogo';
import { Heart, Shield } from 'lucide-react';

interface FooterProps {
  onOpenCrisisModal: () => void;
  onStartConversation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCrisisModal, onStartConversation }) => {
  return (
    <footer className="bg-[#F7F5EE] border-t border-[#E5DFD3] text-[#5C5A55] text-xs">
      {/* Crisis Warning Banner */}
      <div className="bg-[#EFECE3] border-b border-[#E5DFD3] py-3.5 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-xs">
            <Shield className="w-4 h-4 text-[#C27C5A] shrink-0" />
            <span className="text-[#28483E] font-medium">Important Safety Disclosure:</span>
            <span>Sunlo is non-clinical peer support and is not equipped for acute psychiatric crises or emergencies.</span>
          </div>
          <button
            onClick={onOpenCrisisModal}
            className="text-[#C27C5A] hover:underline font-semibold whitespace-nowrap shrink-0"
          >
            Immediate Crisis Hotlines &rarr;
          </button>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col items-start">
            <SunloLogo size="md" className="mb-4" />
            <p className="font-serif text-base text-[#28483E] font-medium mb-1">
              A private place to be where you are.
            </p>
            <p className="text-xs text-[#5C5A55] max-w-sm leading-relaxed mb-6">
              A private conversation and peer-support platform for people who find it difficult to share personal problems, feelings, and questions with others.
            </p>
            <div className="text-[11px] text-[#7C7870] flex items-center gap-1.5">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-[#C27C5A] fill-current" />
              <span>for anyone carrying quiet burdens</span>
            </div>
          </div>

          {/* Links Column 1: Navigation */}
          <div className="md:col-span-2">
            <span className="text-xs font-semibold text-[#28483E] uppercase tracking-wider block mb-4">
              Explore
            </span>
            <ul className="space-y-2.5">
              <li>
                <a href="#how-it-works" className="hover:text-[#28483E] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-[#28483E] transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#safety" className="hover:text-[#28483E] transition-colors">
                  Safety Architecture
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#28483E] transition-colors">
                  About Sunlo
                </a>
              </li>
              <li>
                <a href="#demo" className="hover:text-[#28483E] transition-colors">
                  Interactive Preview
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Community & Care */}
          <div className="md:col-span-2">
            <span className="text-xs font-semibold text-[#28483E] uppercase tracking-wider block mb-4">
              Community
            </span>
            <ul className="space-y-2.5">
              <li>
                <a href="#safety" className="hover:text-[#28483E] transition-colors">
                  Listener Constitution
                </a>
              </li>
              <li>
                <a href="#safety" className="hover:text-[#28483E] transition-colors">
                  Zero Advice Pledge
                </a>
              </li>
              <li>
                <button
                  onClick={onStartConversation}
                  className="hover:text-[#28483E] transition-colors text-left"
                >
                  Start a Room
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCrisisModal}
                  className="hover:text-[#28483E] transition-colors text-left"
                >
                  Crisis Directory
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Trust & Boundaries */}
          <div className="md:col-span-3">
            <span className="text-xs font-semibold text-[#28483E] uppercase tracking-wider block mb-4">
              Ethical Architecture
            </span>
            <p className="text-xs text-[#5C5A55] leading-relaxed mb-4">
              Sunlo collects zero commercial ad profiles. Session data is scrubbed upon room termination.
            </p>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium text-[#28483E]">100% Pseudonymous by Design</span>
              <span className="text-xs text-[#5C5A55]">End-to-End Ephemeral Encrypted Rooms</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-14 pt-8 border-t border-[#E5DFD3] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7C7870]">
          <div>
            &copy; {new Date().getFullYear()} Sunlo Community. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Private by Default</span>
            <span aria-hidden="true">·</span>
            <span>Non-Judgmental Listening</span>
            <span aria-hidden="true">·</span>
            <span>No Algorithmic Feeds</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
