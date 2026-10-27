/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { UserX, Clock, Users, ShieldAlert } from 'lucide-react';

interface HowItWorksProps {
  onStartConversation: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartConversation }) => {
  const steps = [
    {
      number: '01',
      title: 'Arrive without an identity',
      icon: UserX,
      description:
        'You never need a real name, phone number, or photo. Select a quiet pseudonym like "Gentle Harbor" or "Quiet Pine". Your real-world identity remains entirely yours.',
      highlight: 'Zero profile linking or phonebook sync',
    },
    {
      number: '02',
      title: 'Matched with lived experience',
      icon: Users,
      description:
        'Tell us what sits on your chest—workplace burnout, filial obligations, unspoken doubts, or quiet loneliness. We pair you with a trained peer listener who has walked through that exact valley.',
      highlight: 'Empathetic peers, not diagnosing clinicians',
    },
    {
      number: '03',
      title: 'Exchange at your natural pace',
      icon: Clock,
      description:
        'Take ten seconds or two hours to draft your thoughts. There are no read receipts, no typing indicators pressuring you, and no expectation to sustain constant momentum.',
      highlight: 'No notification pings or urgent badges',
    },
    {
      number: '04',
      title: 'Leave no digital footprints',
      icon: ShieldAlert,
      description:
        'Whenever you feel lighter, end the conversation. Your session keys are immediately discarded and messages purged from active memory. Nothing lingers in a searchable public archive.',
      highlight: 'Zero-trace session closure',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#F7F5EE]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#C27C5A] tracking-wide mb-3">
            <span>HOW IT WORKS</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#5C5A55]">The Gentle Process</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#28483E] leading-tight mb-4 [text-wrap:balance]">
            Designed for the conversations you cannot have <span className="italic text-[#C27C5A]">anywhere else.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#5C5A55] leading-relaxed">
            Traditional social platforms demand performance and speed. Sunlo is built in the opposite direction: intentional slowness, radical privacy, and pure human attentiveness.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#28483E]/40 transition-colors shadow-xs group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-semibold text-[#C27C5A]">
                      {step.number}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-[#FAF8F3] border border-[#E8E2D5] flex items-center justify-center text-[#28483E] group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-medium text-[#28483E] mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm text-[#5C5A55] leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8E2D5]/70">
                  <span className="text-xs text-[#5C5A55] font-medium">
                    {step.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom invitation note */}
        <div className="mt-14 p-6 sm:p-8 bg-[#FAF8F3] border border-[#E8E2D5] rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
          <div className="max-w-2xl">
            <h4 className="font-serif text-lg font-medium text-[#28483E] mb-1">
              Ready to unburden without making an account?
            </h4>
            <p className="text-sm text-[#5C5A55] leading-relaxed">
              You can start in under 30 seconds. No email required to initiate your first room.
            </p>
          </div>
          <button
            onClick={onStartConversation}
            className="bg-[#28483E] hover:bg-[#1E3830] text-[#F7F5EE] font-medium text-sm px-6 py-3 rounded-full transition-all shrink-0 active:scale-95 shadow-xs"
          >
            Find your starting point
          </button>
        </div>
      </div>
    </section>
  );
};
