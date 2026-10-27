/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const stories = [
    {
      quote:
        'In my cultural background, admitting that you feel broken or unhappy is seen as failing your family. On Sunlo, I didn’t have to uphold an image. For three hours across two days, an anonymous peer sat with my grief. That quiet acceptance saved me from a downward spiral.',
      author: 'A.R.',
      context: 'First-generation software engineer',
      topic: 'Filial pressure & burnout',
      timeframe: 'Member for 8 months',
    },
    {
      quote:
        'I have a loving partner, but when work started destroying my nervous system, I didn’t want to pass that anxiety onto them every evening. Having an unhurried, non-judgmental space to unload my raw panic let me return home with genuine presence.',
      author: 'M.K.',
      context: 'Healthcare administrator',
      topic: 'Secondary trauma & work fatigue',
      timeframe: 'Member for 1 year',
    },
    {
      quote:
        'What amazed me was the pacing. On standard messaging apps, you feel like you have to type furiously. Here, I sent a paragraph, closed my laptop, went for a quiet walk, and returned to a thoughtful, caring reflection. No rushing. Just pure human connection.',
      author: 'L.T.',
      context: 'Independent architect',
      topic: 'Navigating life transition & loneliness',
      timeframe: 'Member for 5 months',
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#C27C5A] tracking-wide mb-3">
            <span>REAL HUMAN PERSPECTIVES</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#5C5A55]">Voices of Relief</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#28483E] leading-tight mb-4 [text-wrap:balance]">
            What happens when you stop pretending <span className="italic text-[#C27C5A]">everything is fine.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#5C5A55] leading-relaxed">
            Thousands of conversations have taken place inside Sunlo. Here is how people describe the difference between bottling things up and finally speaking them into the open.
          </p>
        </div>

        {/* 2-Column Split: Image on Left + Testimonial Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image Feature with Mission Statement */}
          <div className="lg:col-span-5 rounded-3xl overflow-hidden border border-[#E8E2D5] bg-[#FFFFFF] flex flex-col shadow-xs">
            <div className="aspect-[4/3] relative overflow-hidden">
              <img
                src="/src/assets/images/supportive_listener_moment_1793077021629.jpg"
                alt="Supportive peer listener listening attentively over a table"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-transparent to-transparent" />
            </div>

            <div className="p-7">
              <span className="text-xs text-[#C27C5A] font-semibold block mb-2 tracking-wide uppercase">
                OUR CORE CONVICTION
              </span>
              <p className="font-serif text-lg font-medium text-[#28483E] leading-relaxed mb-3">
                &ldquo;Vulnerability isn&apos;t a weakness to be corrected—it is the biological necessity of human healing.&rdquo;
              </p>
              <p className="text-xs sm:text-sm text-[#5C5A55] leading-relaxed">
                Sunlo was created by people who experienced what it feels like to have no one in their immediate circle they could confide in without fear of judgment, pity, or damaged relationships.
              </p>
            </div>
          </div>

          {/* Right Column: 3 Attributable Stories */}
          <div className="lg:col-span-7 space-y-6">
            {stories.map((story, index) => (
              <div
                key={index}
                className="bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl p-7 flex flex-col justify-between hover:border-[#28483E]/40 transition-colors shadow-xs"
              >
                <div>
                  <Quote className="w-5 h-5 text-[#C27C5A] mb-4 opacity-80" />
                  <p className="font-serif text-base sm:text-lg text-[#28483E] leading-relaxed mb-6 font-normal">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8E2D5] flex flex-wrap items-center justify-between gap-2 text-xs text-[#5C5A55]">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#28483E]">{story.author}</span>
                    <span aria-hidden="true">·</span>
                    <span>{story.context}</span>
                  </div>
                  <div>
                    <span className="text-[#5C5A55]/80">{story.topic}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
