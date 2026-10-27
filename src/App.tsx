/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InteractiveConversationPreview } from './components/InteractiveConversationPreview';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { SafetySection } from './components/SafetySection';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { StartConversationModal } from './components/StartConversationModal';
import { SignInModal } from './components/SignInModal';
import { CrisisModal } from './components/CrisisModal';

export default function App() {
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
  const [activeTopicForModal, setActiveTopicForModal] = useState<string | undefined>(undefined);
  const [userNotification, setUserNotification] = useState<string | null>(null);

  const handleOpenStartConversation = (topic?: string) => {
    setActiveTopicForModal(topic);
    setIsStartModalOpen(true);
  };

  const handleSignInSuccess = (alias: string) => {
    setUserNotification(`Welcome back, ${alias}. Your private environment is active.`);
    setTimeout(() => {
      setUserNotification(null);
    }, 4500);
  };

  const handleScrollToDemo = () => {
    const el = document.getElementById('demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5EE] text-[#28483E] font-sans selection:bg-[#C27C5A]/25 selection:text-[#28483E] relative flex flex-col">
      {/* Top feedback notification toast if user signed in */}
      {userNotification && (
        <div className="fixed top-20 right-6 z-50 bg-[#FFFFFF] border border-[#E8E2D5] text-[#28483E] text-xs px-4 py-3 rounded-full shadow-lg shadow-[#28483E]/10 animate-in slide-in-from-top-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C27C5A]" />
          <span>{userNotification}</span>
        </div>
      )}

      {/* Header adhering to Top Bar Contract */}
      <Header
        onStartConversation={() => handleOpenStartConversation()}
        onSignIn={() => setIsSignInModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onStartConversation={() => handleOpenStartConversation()}
          onExploreDemo={handleScrollToDemo}
        />

        {/* Live Interactive Conversation Simulator */}
        <InteractiveConversationPreview
          onStartFullConversation={(topic) => handleOpenStartConversation(topic)}
        />

        {/* How It Works Section */}
        <HowItWorks onStartConversation={() => handleOpenStartConversation()} />

        {/* Features & Thoughtful Details (Bento Grid) */}
        <Features />

        {/* Safety Constitution & Privacy Architecture */}
        <SafetySection onOpenCrisisModal={() => setIsCrisisModalOpen(true)} />

        {/* Real Attributable Voices & Community Proof */}
        <Testimonials />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Final Grounding Call to Action */}
        <CtaSection onStartConversation={() => handleOpenStartConversation()} />
      </main>

      {/* Footer */}
      <Footer
        onOpenCrisisModal={() => setIsCrisisModalOpen(true)}
        onStartConversation={() => handleOpenStartConversation()}
      />

      {/* Modals */}
      <StartConversationModal
        isOpen={isStartModalOpen}
        initialTopic={activeTopicForModal}
        onClose={() => setIsStartModalOpen(false)}
      />

      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onSuccess={handleSignInSuccess}
      />

      <CrisisModal
        isOpen={isCrisisModalOpen}
        onClose={() => setIsCrisisModalOpen(false)}
      />
    </div>
  );
}
