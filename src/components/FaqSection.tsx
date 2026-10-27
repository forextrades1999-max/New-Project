/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'Is Sunlo truly anonymous? Can anyone trace what I say?',
      answer:
        'Yes. You never provide your real name, phone number, address, or social media links. When you enter a conversation, you are assigned a gentle pseudonym (e.g., "Quiet Willow"). Conversations are encrypted in transit, and when a room is terminated, session keys and local memory are cleared. We do not sell data, track you across the web, or build advertising profiles.',
    },
    {
      question: 'Who are the peer listeners, and how are they vetted?',
      answer:
        'Sunlo peer listeners are everyday people with demonstrated empathy and lived experience navigating personal challenges such as workplace burnout, family friction, grief, or chronic loneliness. Before being admitted to the network, every listener completes training in non-violent communication, reflective active listening, and our strict zero-advice policy, followed by a simulated evaluation.',
    },
    {
      question: 'How is Sunlo different from professional therapy or counseling?',
      answer:
        'Therapy is clinical healthcare focused on psychiatric assessment, treatment planning, and mental health diagnoses by licensed professionals. Sunlo is non-clinical peer support: a warm, mutual human sanctuary where two people connect as equals. We do not diagnose, prescribe, or treat mental illness. If you require medical psychiatric care, we strongly encourage consulting a licensed therapist.',
    },
    {
      question: 'What if a listener offers unsolicited advice or makes me feel judged?',
      answer:
        'Giving unsolicited advice or passing moral judgment is a direct violation of our Listener Constitution. Every chat room includes an immediate "Pause" and "Exit Room" button, as well as a discrete "Report Listener" action. Reported conversations are reviewed by our community trust team, and listeners who fail our standards are permanently removed.',
    },
    {
      question: 'Does Sunlo cost anything to use?',
      answer:
        'Core peer support conversations on Sunlo are completely free. We believe emotional sanctuary should never be gated behind an exorbitant paywall. The platform is sustained through optional voluntary patron memberships and grants from humane technology foundations that share our vision for non-extractive digital spaces.',
    },
    {
      question: 'Can I apply to become a peer listener?',
      answer:
        'Yes. If you have navigated challenging life seasons and possess the patience to hold space for others without needing to lecture or fix them, we welcome your application. Our listener cohort intake opens quarterly.',
    },
  ];

  return (
    <section className="py-24 bg-[#F7F5EE]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#C27C5A] tracking-wide mb-3">
            <span>FREQUENTLY ASKED QUESTIONS</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#5C5A55]">Clarity &amp; Reassurance</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#28483E] leading-tight mb-4 [text-wrap:balance]">
            Everything you need to know before <span className="italic text-[#C27C5A]">stepping inside.</span>
          </h2>
          <p className="text-base text-[#5C5A55] leading-relaxed">
            Starting a conversation about personal pain requires courage. Here are honest answers to the questions we hear most often.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#FFFFFF] border border-[#E8E2D5] rounded-2xl overflow-hidden transition-colors shadow-xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 text-base font-medium text-[#28483E] hover:text-[#C27C5A] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#5C5A55] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#C27C5A]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-[#5C5A55] leading-relaxed border-t border-[#E8E2D5] pt-4 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
