/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Phone, MessageSquare, Globe, Heart, ShieldAlert } from 'lucide-react';

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({ isOpen, onClose }) => {
  const [selectedRegion, setSelectedRegion] = useState<'us' | 'uk' | 'ca' | 'au' | 'intl'>('us');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="crisis-title"
    >
      <div className="bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#5C5A55] hover:text-[#28483E] p-1.5 rounded-full transition-colors"
          aria-label="Close crisis resources"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#FAF8F3] border border-[#E8E2D5] flex items-center justify-center text-[#C27C5A]">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 id="crisis-title" className="font-serif text-2xl font-normal text-[#28483E]">
              Immediate Crisis &amp; Safety Resources
            </h3>
            <span className="text-xs text-[#5C5A55]">Free, confidential, available 24 hours every day</span>
          </div>
        </div>

        {/* Empathy Note */}
        <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D5] text-xs text-[#5C5A55] leading-relaxed mb-6">
          <div className="flex items-center gap-2 text-[#28483E] font-semibold mb-1">
            <Heart className="w-3.5 h-3.5 text-[#C27C5A] fill-current" />
            <span>You do not have to carry acute crisis alone</span>
          </div>
          If you are in acute distress, thinking about ending your life, or feel unable to keep yourself safe, please reach out to trained crisis counselors immediately. They are ready to support you right now.
        </div>

        {/* Region Selector (functional buttons) */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-[#FAF8F3] rounded-full border border-[#E8E2D5] mb-6">
          {[
            { id: 'us', label: 'United States' },
            { id: 'uk', label: 'United Kingdom' },
            { id: 'ca', label: 'Canada' },
            { id: 'au', label: 'Australia' },
            { id: 'intl', label: 'International' },
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRegion(r.id as any)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors ${
                selectedRegion === r.id
                  ? 'bg-[#28483E] text-[#F7F5EE] shadow-xs'
                  : 'text-[#5C5A55] hover:text-[#28483E]'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Hotlines based on region */}
        <div className="space-y-3.5 mb-8">
          {selectedRegion === 'us' && (
            <>
              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D5]">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#C27C5A]" />
                    <span className="font-serif text-sm font-medium text-[#28483E]">
                      988 Suicide &amp; Crisis Lifeline
                    </span>
                  </div>
                  <a
                    href="tel:988"
                    className="bg-[#28483E] text-[#F7F5EE] font-medium text-xs px-3.5 py-1.5 rounded-full hover:bg-[#1E3830]"
                  >
                    Call 988
                  </a>
                </div>
                <p className="text-xs text-[#5C5A55]">
                  Toll-free 24/7 call and text support across the United States.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D5]">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#C27C5A]" />
                    <span className="font-serif text-sm font-medium text-[#28483E]">Crisis Text Line</span>
                  </div>
                  <span className="text-xs font-mono text-[#28483E] bg-[#FFFFFF] px-2.5 py-1 rounded-full border border-[#E8E2D5]">
                    Text HOME to 741741
                  </span>
                </div>
                <p className="text-xs text-[#5C5A55]">
                  Free, 24/7 confidential crisis support by text message.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D5]">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <span className="font-serif text-sm font-medium text-[#28483E]">The Trevor Project (LGBTQ+)</span>
                  <a
                    href="tel:1-866-488-7386"
                    className="text-xs text-[#C27C5A] hover:underline"
                  >
                    1-866-488-7386
                  </a>
                </div>
                <p className="text-xs text-[#5C5A55]">
                  24/7 confidential suicide prevention for LGBTQ young people.
                </p>
              </div>
            </>
          )}

          {selectedRegion === 'uk' && (
            <>
              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D5]">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#C27C5A]" />
                    <span className="font-serif text-sm font-medium text-[#28483E]">Samaritans UK</span>
                  </div>
                  <a
                    href="tel:116123"
                    className="bg-[#28483E] text-[#F7F5EE] font-medium text-xs px-3.5 py-1.5 rounded-full hover:bg-[#1E3830]"
                  >
                    Call 116 123
                  </a>
                </div>
                <p className="text-xs text-[#5C5A55]">
                  Free 24/7 listening service for anyone who needs to talk.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D5]">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <span className="font-serif text-sm font-medium text-[#28483E]">NHS Mental Health Line</span>
                  <a href="tel:111" className="text-xs text-[#C27C5A] hover:underline">
                    Call 111
                  </a>
                </div>
                <p className="text-xs text-[#5C5A55]">
                  Urgent medical advice and crisis assessment.
                </p>
              </div>
            </>
          )}

          {selectedRegion === 'ca' && (
            <>
              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D5]">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#C27C5A]" />
                    <span className="font-serif text-sm font-medium text-[#28483E]">988 Suicide Crisis Helpline Canada</span>
                  </div>
                  <a
                    href="tel:988"
                    className="bg-[#28483E] text-[#F7F5EE] font-medium text-xs px-3.5 py-1.5 rounded-full hover:bg-[#1E3830]"
                  >
                    Call 988
                  </a>
                </div>
                <p className="text-xs text-[#5C5A55]">
                  Available in English and French 24/7 across Canada.
                </p>
              </div>
            </>
          )}

          {selectedRegion === 'au' && (
            <>
              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D5]">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#C27C5A]" />
                    <span className="font-serif text-sm font-medium text-[#28483E]">Lifeline Australia</span>
                  </div>
                  <a
                    href="tel:131114"
                    className="bg-[#28483E] text-[#F7F5EE] font-medium text-xs px-3.5 py-1.5 rounded-full hover:bg-[#1E3830]"
                  >
                    Call 13 11 14
                  </a>
                </div>
                <p className="text-xs text-[#5C5A55]">
                  24 hour crisis support and suicide prevention services.
                </p>
              </div>
            </>
          )}

          {selectedRegion === 'intl' && (
            <>
              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D5]">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#C27C5A]" />
                    <span className="font-serif text-sm font-medium text-[#28483E]">Befrienders Worldwide</span>
                  </div>
                  <span className="text-xs text-[#5C5A55]">Global Network</span>
                </div>
                <p className="text-xs text-[#5C5A55]">
                  Directory of free emotional support helplines in over 32 countries.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D5]">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <span className="font-serif text-sm font-medium text-[#28483E]">International Association for Suicide Prevention (IASP)</span>
                  <span className="text-xs text-[#5C5A55]">Global</span>
                </div>
                <p className="text-xs text-[#5C5A55]">
                  Comprehensive international crisis center locator directory.
                </p>
              </div>
            </>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#FAF8F3] hover:bg-[#F7F5EE] text-[#28483E] border border-[#E8E2D5] font-medium py-3 rounded-full text-sm transition-colors"
        >
          Close Crisis Resources
        </button>
      </div>
    </div>
  );
};
