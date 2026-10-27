/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, ShieldCheck, Heart } from 'lucide-react';

interface CtaSectionProps {
  onStartConversation: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onStartConversation }) => {
  return (
    <section className="py-24 bg-[#FAF8F3] border-t border-[#E5DFD3] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10">
        <div className="w-12 h-12 rounded-full bg-[#FFFFFF] border border-[#E8E2D5] flex items-center justify-center mx-auto mb-6 text-[#C27C5A] shadow-xs">
          <Heart className="w-5 h-5 fill-current" />
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#28483E] leading-tight mb-6 [text-wrap:balance]">
          You have carried it on your own <span className="italic text-[#C27C5A]">long enough.</span>
        </h2>

        <p className="text-base sm:text-xl text-[#5C5A55] leading-relaxed mb-10 max-w-2xl mx-auto">
          No sign-up forms demanding your identity. No algorithms ranking your thoughts. Just an unhurried, respectful conversation with someone who is ready to listen.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button
            onClick={onStartConversation}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#28483E] hover:bg-[#1E3830] text-[#F7F5EE] font-medium text-base px-8 py-4 rounded-full transition-all transform active:scale-95 shadow-md shadow-[#28483E]/10"
          >
            <span>Find your starting point</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-[#5C5A55]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#2E6850]" />
            <span>Takes under 30 seconds to begin</span>
          </span>
          <span aria-hidden="true">·</span>
          <span>No credit card</span>
          <span aria-hidden="true">·</span>
          <span>100% free peer support</span>
          <span aria-hidden="true">·</span>
          <span>Private and ephemeral</span>
        </div>
      </div>
    </section>
  );
};
