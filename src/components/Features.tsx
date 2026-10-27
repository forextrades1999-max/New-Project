/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { EyeOff, Sparkles, BookOpen, Volume2, Shield, Heart } from 'lucide-react';

export const Features: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'listening' | 'pacing' | 'privacy'>('listening');

  return (
    <section id="features" className="py-24 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#C27C5A] tracking-wide mb-3">
            <span>PURPOSE-BUILT ARCHITECTURE</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#5C5A55]">Intimate Features</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#28483E] leading-tight mb-4 [text-wrap:balance]">
            Every detail shaped to lower your <span className="italic text-[#C27C5A]">emotional guard.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#5C5A55] leading-relaxed">
            Most technology wants you alert, reactive, and hooked. Sunlo is engineered for stillness: quiet interfaces, deliberate pacing, and deep mutual respect.
          </p>
        </div>

        {/* Feature Segmented Controls */}
        <div className="flex items-center gap-2.5 mb-10 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('listening')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all border whitespace-nowrap ${
              activeTab === 'listening'
                ? 'bg-[#28483E] text-[#F7F5EE] border-[#28483E] shadow-xs'
                : 'bg-[#FFFFFF] text-[#5C5A55] border-[#E8E2D5] hover:text-[#28483E]'
            }`}
          >
            Reflective Listening Standards
          </button>
          <button
            onClick={() => setActiveTab('pacing')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all border whitespace-nowrap ${
              activeTab === 'pacing'
                ? 'bg-[#28483E] text-[#F7F5EE] border-[#28483E] shadow-xs'
                : 'bg-[#FFFFFF] text-[#5C5A55] border-[#E8E2D5] hover:text-[#28483E]'
            }`}
          >
            Intentional Slowness &amp; Pacing
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all border whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'bg-[#28483E] text-[#F7F5EE] border-[#28483E] shadow-xs'
                : 'bg-[#FFFFFF] text-[#5C5A55] border-[#E8E2D5] hover:text-[#28483E]'
            }`}
          >
            Radical Discretion &amp; Privacy
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Bento Card 1 (Span 7): Deep listening pledge */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#5C5A55] mb-3">
                <Heart className="w-3.5 h-3.5 text-[#C27C5A]" />
                <span>The Core Grounding Principle</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#28483E] mb-4">
                Listening without fixing, advising, or judging.
              </h3>
              <p className="text-sm text-[#5C5A55] leading-relaxed mb-6">
                When you share a worry with friends, their reflex is often to propose solutions, minimize your feeling with toxic positivity, or turn the conversation back to themselves. Sunlo peer listeners undergo structured training on holding gentle space: validating feelings without rushing to prescribe fixes.
              </p>

              {/* 3 Pillars List */}
              <div className="space-y-3.5 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E5EDE6] text-[#28483E] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[#28483E] block">Zero Unsolicited Advice</span>
                    <span className="text-xs text-[#5C5A55]">Listeners reflect your thoughts back to you rather than telling you what to do.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E5EDE6] text-[#28483E] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[#28483E] block">No Toxic Positivity</span>
                    <span className="text-xs text-[#5C5A55]">Heavy feelings are allowed to exist as they are. No one will tell you to &ldquo;just look on the bright side.&rdquo;</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E5EDE6] text-[#28483E] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[#28483E] block">Safe Topic Filters</span>
                    <span className="text-xs text-[#5C5A55]">You define what you wish to discuss and what remains completely off-limits.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D5] flex items-center justify-between text-xs text-[#5C5A55]">
              <span>Peer Listener Vetting Rate</span>
              <span className="font-semibold text-[#28483E]">Top 8% of empathetic applicants accepted</span>
            </div>
          </div>

          {/* Bento Card 2 (Span 5): Image Spotlight - Quiet Stillness */}
          <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl overflow-hidden flex flex-col shadow-xs">
            <div className="aspect-[4/3] relative overflow-hidden">
              <img
                src="/src/assets/images/calm_evening_reflection_1793077021517.jpg"
                alt="Quiet evening notebook and warm tea still life"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-transparent to-transparent" />
            </div>

            <div className="p-7 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs text-[#C27C5A] font-medium block mb-1">UNHURRIED SPACES</span>
                <h4 className="font-serif text-xl font-normal text-[#28483E] mb-2">
                  The Quiet Unshared Notepad
                </h4>
                <p className="text-xs sm:text-sm text-[#5C5A55] leading-relaxed">
                  Before you send a word to another human, you have a private drafting room. Jot down what feels disjointed, reread it, or discard it at will. You are always in control of what crosses the threshold.
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-[#E8E2D5] flex items-center justify-between text-xs text-[#5C5A55]">
                <span>Encrypted local buffer</span>
                <span className="text-[#28483E] font-medium">Never leaves your browser</span>
              </div>
            </div>
          </div>

          {/* Bento Card 3 (Span 4): Pacing Modes */}
          <div className="lg:col-span-4 bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl p-7 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#FAF8F3] border border-[#E8E2D5] flex items-center justify-center text-[#28483E] mb-5">
                <Volume2 className="w-5 h-5 text-[#C27C5A]" />
              </div>
              <h4 className="font-serif text-lg font-medium text-[#28483E] mb-2">
                Slow &amp; Asynchronous Modes
              </h4>
              <p className="text-sm text-[#5C5A55] leading-relaxed mb-4">
                Choose between real-time presence or asynchronous letters. In slow mode, replies take hours or days, allowing you to reflect deeply between notes without conversational friction.
              </p>
            </div>
            <div className="text-xs text-[#5C5A55] pt-4 border-t border-[#E8E2D5]">
              Zero typing indicators or read receipts
            </div>
          </div>

          {/* Bento Card 4 (Span 4): Ghost Privacy Protocol */}
          <div className="lg:col-span-4 bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl p-7 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#FAF8F3] border border-[#E8E2D5] flex items-center justify-center text-[#28483E] mb-5">
                <EyeOff className="w-5 h-5 text-[#C27C5A]" />
              </div>
              <h4 className="font-serif text-lg font-medium text-[#28483E] mb-2">
                Quick-Mask Panic Safety
              </h4>
              <p className="text-sm text-[#5C5A55] leading-relaxed mb-4">
                If someone walks into your room or glances over your shoulder, pressing the Escape key instantly replaces your screen with a neutral weather or document screen, freezing message audio.
              </p>
            </div>
            <div className="text-xs text-[#5C5A55] pt-4 border-t border-[#E8E2D5]">
              One-tap disguise shortcut active at all times
            </div>
          </div>

          {/* Bento Card 5 (Span 4): Community Standards */}
          <div className="lg:col-span-4 bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl p-7 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#FAF8F3] border border-[#E8E2D5] flex items-center justify-center text-[#28483E] mb-5">
                <Shield className="w-5 h-5 text-[#C27C5A]" />
              </div>
              <h4 className="font-serif text-lg font-medium text-[#28483E] mb-2">
                Pure Peer Support
              </h4>
              <p className="text-sm text-[#5C5A55] leading-relaxed mb-4">
                Not a dating app, not social media, not a medical clinic. An honest sanctuary where two humans meet on equal ground to soften the weight of being alive.
              </p>
            </div>
            <div className="text-xs text-[#5C5A55] pt-4 border-t border-[#E8E2D5]">
              Strictly enforced zero-tolerance boundaries
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
