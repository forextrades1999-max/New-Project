/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Lock, EyeOff, ShieldCheck, HeartHandshake, PhoneCall, AlertCircle } from 'lucide-react';

interface SafetySectionProps {
  onOpenCrisisModal: () => void;
}

export const SafetySection: React.FC<SafetySectionProps> = ({ onOpenCrisisModal }) => {
  const safetyProtocols = [
    {
      icon: Lock,
      title: 'Architectural Pseudonymity',
      description:
        'We never ask for your real name, phone number, social handles, or address. Your account exists through a generated random token or quiet passkey. There is no public user directory.',
    },
    {
      icon: EyeOff,
      title: 'Ephemeral Data Retention',
      description:
        'When you conclude a conversation and tap &ldquo;End Room&rdquo;, the cryptographic keys are destroyed. Your messages do not sit in an ad-targeting database or search engine index.',
    },
    {
      icon: HeartHandshake,
      title: 'Listener Accountability & Training',
      description:
        'All peer listeners pass through background checks, emotional resilience interviews, and continuous peer-review moderation. Any violation of our non-judgment policy leads to immediate disqualification.',
    },
    {
      icon: ShieldCheck,
      title: 'One-Tap Room Dissolution',
      description:
        'You always remain in total authority over your presence. If at any moment a conversation feels misaligned or overwhelming, you can exit with a single click—no justification required.',
    },
  ];

  return (
    <section id="safety" className="py-24 bg-[#F7F5EE]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#C27C5A] tracking-wide mb-3">
            <span>UNCOMPROMISING TRUST</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#5C5A55]">Safety Architecture</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#28483E] leading-tight mb-4 [text-wrap:balance]">
            Safety is not a feature we added. It is the <span className="italic text-[#C27C5A]">reason Sunlo exists.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#5C5A55] leading-relaxed">
            People hold their deepest pain inside because the real world is filled with consequences, gossip, and unsolicited advice. We built a sanctuary where those consequences do not exist.
          </p>
        </div>

        {/* 4 Protocol Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {safetyProtocols.map((protocol, index) => {
            const Icon = protocol.icon;
            return (
              <div
                key={index}
                className="bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl p-8 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#FAF8F3] border border-[#E8E2D5] flex items-center justify-center text-[#28483E] mb-5">
                    <Icon className="w-5 h-5 text-[#C27C5A]" />
                  </div>
                  <h3 className="font-serif text-xl font-medium text-[#28483E] mb-2.5">
                    {protocol.title}
                  </h3>
                  <p className="text-sm text-[#5C5A55] leading-relaxed">
                    {protocol.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear Role Demarcation / Honest Boundaries */}
        <div className="bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl p-8 mb-12 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#FAF8F3] border border-[#E8E2D5] flex items-center justify-center text-[#28483E] shrink-0">
              <AlertCircle className="w-5 h-5 text-[#C27C5A]" />
            </div>
            <div>
              <h4 className="font-serif text-2xl font-normal text-[#28483E] mb-2">
                Our Honest Boundaries: What Sunlo Is &amp; Isn&apos;t
              </h4>
              <p className="text-sm text-[#5C5A55] leading-relaxed mb-6">
                Clear expectations are essential to true emotional safety. Sunlo is a peer-to-peer listening platform for non-crisis emotional support, day-to-day vulnerability, and quiet human companionship.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#5C5A55]">
                <div className="p-5 rounded-2xl bg-[#E5EDE6]/60 border border-[#28483E]/15">
                  <span className="font-semibold text-[#28483E] text-sm block mb-2">✓ What Sunlo is:</span>
                  <ul className="space-y-1.5 list-disc list-inside">
                    <li>An unhurried space to talk through life transitions &amp; burnout</li>
                    <li>Peer connection with listeners who have lived through similar situations</li>
                    <li>A safe sounding board when you cannot share with family</li>
                    <li>100% free from judgment, diagnosis, and unsolicited prescriptions</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#FBEAE8]/60 border border-[#C85A54]/20">
                  <span className="font-semibold text-[#C85A54] text-sm block mb-2">✕ What Sunlo is not:</span>
                  <ul className="space-y-1.5 list-disc list-inside">
                    <li>A replacement for clinical psychotherapy or medical psychiatric treatment</li>
                    <li>An acute emergency service for immediate self-harm or medical crisis</li>
                    <li>A public social feed or dating/courtship environment</li>
                    <li>A legal advice or professional counseling service</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Crisis Resource Direct Banner in Dark Forest Green matching theme */}
        <div className="p-6 sm:p-7 rounded-3xl bg-[#28483E] text-[#F7F5EE] flex flex-col sm:flex-row items-center justify-between gap-5 shadow-md shadow-[#28483E]/15">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#1E3830] flex items-center justify-center shrink-0 text-[#C27C5A]">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-lg font-medium text-[#F7F5EE] block">
                In acute distress or contemplating self-harm?
              </span>
              <span className="text-xs text-[#E5EDE6]">
                Professional crisis hotlines are free, confidential, and available 24/7 worldwide.
              </span>
            </div>
          </div>

          <button
            onClick={onOpenCrisisModal}
            className="bg-[#F7F5EE] hover:bg-[#FFFFFF] text-[#28483E] font-medium px-5 py-2.5 rounded-full text-xs whitespace-nowrap transition-all shadow-xs"
          >
            Access 24/7 Helpline Directory
          </button>
        </div>
      </div>
    </section>
  );
};
