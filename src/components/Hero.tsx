/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, ArrowDown, Lock, MessageCircle, BookOpen, Compass, Sun } from 'lucide-react';

interface HeroProps {
  onStartConversation: () => void;
  onExploreDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartConversation, onExploreDemo }) => {
  const [activeTab, setActiveTab] = useState<'talk' | 'write' | 'explore'>('talk');

  const cardStates = {
    talk: {
      quote: "“I don’t know where to begin.”",
      sub: "That’s a perfectly good place to begin.",
      note: "Nothing here needs to be perfect.",
    },
    write: {
      quote: "“Some thoughts feel too tangled to say out loud.”",
      sub: "Write unhurried notes in your private unshared sanctuary.",
      note: "Your drafts remain 100% in your local browser.",
    },
    explore: {
      quote: "“I’m not sure what I need, just quiet presence.”",
      sub: "Browse shared lived experiences at your own pace.",
      note: "Zero obligation to respond or connect.",
    },
  };

  const current = cardStates[activeTab];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#F7F5EE]">
      {/* Background warm ambiance rings */}
      <div className="absolute right-0 top-1/4 w-[600px] h-[600px] rounded-full bg-[#E5EDE6]/40 blur-3xl pointer-events-none -mr-40" />
      <div className="absolute right-1/4 top-1/3 w-[450px] h-[450px] rounded-full border border-[#DFD8CA]/60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Top Tagline Pill matching screenshot */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E8E2D5] text-xs font-medium text-[#5C5A55] shadow-xs mb-8">
              <span className="w-2 h-2 rounded-full bg-[#C27C5A]" />
              <span>A private place to be where you are</span>
            </div>

            {/* Main Headline with Fraunces serif and terracotta italic */}
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-[72px] font-normal tracking-tight text-[#28483E] leading-[1.08] mb-6 [text-wrap:balance]">
              You don&apos;t have to <br />
              <span className="italic text-[#C27C5A] font-normal">have it figured out.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#5C5A55] leading-relaxed mb-8 max-w-xl">
              Some things are hard to say out loud. Sunlo gives you a gentler place to start &mdash; at your pace, in your own words.
            </p>

            {/* Action Buttons matching screenshot */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 w-full sm:w-auto mb-10">
              <button
                onClick={onStartConversation}
                className="inline-flex items-center justify-center gap-2.5 bg-[#28483E] hover:bg-[#1E3830] text-[#F7F5EE] font-medium text-base px-7 py-3.5 rounded-full transition-all transform active:scale-95 shadow-md shadow-[#28483E]/10"
              >
                <span>Find your starting point</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreDemo}
                className="inline-flex items-center justify-center gap-1.5 text-[#28483E] hover:text-[#C27C5A] font-medium text-base px-4 py-3.5 transition-colors"
              >
                <span>Take a look</span>
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom micro-trust matching screenshot */}
            <div className="flex items-center gap-2 text-xs text-[#5C5A55]">
              <Lock className="w-3.5 h-3.5 text-[#5C5A55]" />
              <span>Private by default. No pressure to share.</span>
            </div>
          </div>

          {/* Right Column: Interactive "A Moment for You" Card matching screenshot */}
          <div className="lg:col-span-5 relative">
            {/* Soft decorative concentric circles */}
            <div className="absolute -top-12 -right-8 w-80 h-80 rounded-full border border-[#DFD8CA]/80 pointer-events-none" />
            <div className="absolute top-10 -right-20 w-96 h-96 rounded-full bg-[#E5EDE6]/60 blur-xl pointer-events-none" />

            {/* The Main Porcelain Card */}
            <div className="relative bg-[#FFFFFF] rounded-3xl p-7 sm:p-8 border border-[#E8E2D5] shadow-xl shadow-[#28483E]/5 transition-all">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold tracking-wider text-[#7C7870] uppercase">
                  A MOMENT FOR YOU
                </span>
                <div className="w-8 h-8 rounded-full bg-[#FAF8F3] border border-[#E8E2D5] flex items-center justify-center text-[#28483E]">
                  <Sun className="w-4 h-4" />
                </div>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#28483E] mb-6">
                How is it, really?
              </h2>

              {/* Inner Quote Card */}
              <div className="bg-[#FAF8F3] rounded-2xl p-5 border border-[#E8E2D5]/80 mb-5">
                <p className="font-serif text-base sm:text-lg font-medium text-[#28483E] mb-1">
                  {current.quote}
                </p>
                <p className="text-xs sm:text-sm text-[#5C5A55]">
                  {current.sub}
                </p>
              </div>

              {/* Reassurance bullet */}
              <div className="flex items-center gap-2 text-xs text-[#5C5A55] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C27C5A]" />
                <span>{current.note}</span>
              </div>

              {/* 3 Action Tabs matching screenshot: Talk, Write, Explore */}
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('talk');
                    onStartConversation();
                  }}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                    activeTab === 'talk'
                      ? 'bg-[#FAF8F3] border-[#28483E] text-[#28483E] shadow-xs'
                      : 'bg-[#FFFFFF] border-[#E8E2D5] text-[#5C5A55] hover:border-[#28483E]/40'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 text-[#28483E]" />
                  <span className="text-xs font-medium">Talk</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('write')}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                    activeTab === 'write'
                      ? 'bg-[#FAF8F3] border-[#28483E] text-[#28483E] shadow-xs'
                      : 'bg-[#FFFFFF] border-[#E8E2D5] text-[#5C5A55] hover:border-[#28483E]/40'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-[#28483E]" />
                  <span className="text-xs font-medium">Write</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('explore');
                    onExploreDemo();
                  }}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                    activeTab === 'explore'
                      ? 'bg-[#FAF8F3] border-[#28483E] text-[#28483E] shadow-xs'
                      : 'bg-[#FFFFFF] border-[#E8E2D5] text-[#5C5A55] hover:border-[#28483E]/40'
                  }`}
                >
                  <Compass className="w-4 h-4 text-[#28483E]" />
                  <span className="text-xs font-medium">Explore</span>
                </button>
              </div>
            </div>

            {/* Floating sage pill at bottom right matching screenshot */}
            <div className="mt-4 flex justify-end">
              <span className="inline-block bg-[#D4E2D5] text-[#28483E] text-xs font-medium px-4 py-2 rounded-full shadow-sm">
                A small step still counts.
              </span>
            </div>
          </div>
        </div>

        {/* 4-Zone Editorial Strip with updated theme */}
        <div className="mt-20 pt-10 border-t border-[#E5DFD3] grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <span className="text-xs text-[#7C7870] block mb-1">Identity Policy</span>
            <p className="font-serif text-base font-medium text-[#28483E]">100% Pseudonymous</p>
            <p className="text-xs text-[#5C5A55] mt-1 leading-normal">
              No profiles, public followers, or identity verification required.
            </p>
          </div>
          <div>
            <span className="text-xs text-[#7C7870] block mb-1">Conversation Rhythm</span>
            <p className="font-serif text-base font-medium text-[#28483E]">Paced &amp; Unrushed</p>
            <p className="text-xs text-[#5C5A55] mt-1 leading-normal">
              Take minutes or hours to reflect before sending your thoughts.
            </p>
          </div>
          <div>
            <span className="text-xs text-[#7C7870] block mb-1">Listener Philosophy</span>
            <p className="font-serif text-base font-medium text-[#28483E]">Quiet Understanding</p>
            <p className="text-xs text-[#5C5A55] mt-1 leading-normal">
              Trained peers who listen to hear, not to prescribe quick fixes.
            </p>
          </div>
          <div>
            <span className="text-xs text-[#7C7870] block mb-1">Session Lifecycle</span>
            <p className="font-serif text-base font-medium text-[#28483E]">Zero Digital Trace</p>
            <p className="text-xs text-[#5C5A55] mt-1 leading-normal">
              One tap wipes the room and clears temporary logs permanently.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
