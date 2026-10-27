/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ArrowRight,
  Shield,
  Wind,
  Trash2,
  Send,
  Sparkles,
  RefreshCw,
  Heart,
  EyeOff,
} from 'lucide-react';
import { SunloLogo } from './SunloLogo';

interface StartConversationModalProps {
  isOpen: boolean;
  initialTopic?: string;
  onClose: () => void;
}

const TOPICS = [
  {
    id: 'burnout',
    title: 'Burnout & Exhaustion',
    subtitle: 'When keeping up appearances has drained your spirit',
  },
  {
    id: 'family',
    title: 'Family Guilt & Expectations',
    subtitle: 'Navigating invisible pressure and boundaries',
  },
  {
    id: 'loneliness',
    title: 'Quiet Loneliness',
    subtitle: 'Feeling unseen even around people you know',
  },
  {
    id: 'relationships',
    title: 'Unspoken Relationship Doubts',
    subtitle: 'Feelings you cannot yet voice to partners or friends',
  },
  {
    id: 'grief',
    title: 'Grief & Life Transitions',
    subtitle: 'Processing changes that the world expects you to be over',
  },
  {
    id: 'general',
    title: 'Just Need to Be Heard',
    subtitle: 'No specific label—just a need to speak freely',
  },
];

const ALIAS_LIST = [
  'Gentle Harbor',
  'Quiet Willow',
  'Amber Rowan',
  'Patient Cedar',
  'Warm Sparrow',
  'Calm Meadow',
  'Silent River',
  'Dusk Pine',
];

interface ChatMessage {
  id: string;
  sender: 'user' | 'listener' | 'system';
  text: string;
  time: string;
}

export const StartConversationModal: React.FC<StartConversationModalProps> = ({
  isOpen,
  initialTopic,
  onClose,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedTopic, setSelectedTopic] = useState<string>(initialTopic || 'burnout');
  const [pacing, setPacing] = useState<'slow' | 'live'>('slow');
  const [aliasIndex, setAliasIndex] = useState(0);
  const [customAlias, setCustomAlias] = useState('');
  const activeAlias = customAlias.trim() || ALIAS_LIST[aliasIndex];

  // Active chat room states
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [isQuickMasked, setIsQuickMasked] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Sync initial topic
  useEffect(() => {
    if (initialTopic) {
      setSelectedTopic(initialTopic);
    }
  }, [initialTopic]);

  // Breathing timer
  useEffect(() => {
    if (!isBreathingActive) return;
    let timeout: NodeJS.Timeout;
    const runCycle = () => {
      setBreathPhase('Inhale');
      timeout = setTimeout(() => {
        setBreathPhase('Hold');
        timeout = setTimeout(() => {
          setBreathPhase('Exhale');
          timeout = setTimeout(runCycle, 4000);
        }, 3000);
      }, 4000);
    };
    runCycle();
    return () => clearTimeout(timeout);
  }, [isBreathingActive]);

  // Scroll on new message
  useEffect(() => {
    if (step === 4) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, step]);

  if (!isOpen) return null;

  const handleNextAlias = () => {
    setAliasIndex((prev) => (prev + 1) % ALIAS_LIST.length);
    setCustomAlias('');
  };

  const handleEnterRoom = () => {
    const topicObj = TOPICS.find((t) => t.id === selectedTopic) || TOPICS[0];
    setMessages([
      {
        id: 'sys-start',
        sender: 'system',
        text: `Room initialized with peer listener Elena. Topic: "${topicObj.title}". Your alias is ${activeAlias}.`,
        time: 'Just now',
      },
      {
        id: 'lst-start',
        sender: 'listener',
        text: `Hello ${activeAlias}. I am Elena. I have spent years learning to hold space for others, and I am here for whatever is on your mind today. There is zero rush or pressure. Where would you like to start?`,
        time: 'Just now',
      },
    ]);
    setStep(4);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = inputVal.trim();
    if (!text) return;

    const newMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let reply = '';
      const lower = text.toLowerCase();
      if (lower.includes('tired') || lower.includes('exhausted') || lower.includes('burnout')) {
        reply =
          "I hear how tired your spirit is. Carrying invisible exhaustion takes such a physical toll. You don't have to be productive or positive here. What would resting truly look like for you if guilt wasn't in the way?";
      } else if (lower.includes('family') || lower.includes('parent') || lower.includes('expectation')) {
        reply =
          "Family expectations often carry so much unspoken grief. Wanting to be loved for who you are, rather than who they envisioned, is a deeply human longing. It makes complete sense that you feel this conflict.";
      } else if (lower.includes('alone') || lower.includes('nobody') || lower.includes('lonely')) {
        reply =
          "Thank you for trusting me with that truth. Loneliness often whispers that you're the only one feeling this disconnected. But I hear you, and right now in this room, you are not alone.";
      } else {
        reply =
          "Thank you for sharing that with me. It takes courage to put words to feelings that have stayed quiet for so long. There is no right or wrong way to feel about this. What feels most urgent for you in this moment?";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: 'lst-' + Date.now(),
          sender: 'listener',
          text: reply,
          time: 'Just now',
        },
      ]);
    }, pacing === 'slow' ? 2400 : 1300);
  };

  const handleExitAndScrub = () => {
    onClose();
    // Reset state after close
    setTimeout(() => {
      setStep(1);
      setMessages([]);
      setInputVal('');
      setIsQuickMasked(false);
    }, 300);
  };

  // Panic quick mask screen
  if (isQuickMasked) {
    return (
      <div className="fixed inset-0 z-50 bg-[#1e2022] p-8 text-[#9ba1a6] font-sans">
        <div className="max-w-2xl mx-auto mt-12 bg-white text-gray-800 p-8 rounded shadow">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-medium">Daily Weather &amp; Calendar Digest</h1>
            <button
              onClick={() => setIsQuickMasked(false)}
              className="text-xs text-blue-600 hover:underline"
            >
              Resume Window
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Partly cloudy, 18°C. Tomorrow expected scattered showers in the morning with clearing by afternoon.
          </p>
          <div className="text-xs text-gray-400">
            Internal Note Document #4829 · Updated 2 minutes ago
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl relative">
        {/* Top Header of Modal */}
        <div className="px-6 py-4 bg-[#FAF8F3] border-b border-[#E8E2D5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <SunloLogo size="sm" showWordmark={false} />
            <span className="font-serif text-sm font-medium text-[#28483E]">
              {step === 4 ? `Room: ${activeAlias} & Elena` : 'Begin a Private Conversation'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {step === 4 && (
              <button
                onClick={() => setIsQuickMasked(true)}
                className="px-3 py-1 text-xs text-[#5C5A55] hover:text-[#28483E] bg-[#FFFFFF] border border-[#E8E2D5] rounded-full flex items-center gap-1.5"
                title="Quick disguise screen"
              >
                <EyeOff className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Disguise</span>
              </button>
            )}
            <button
              onClick={handleExitAndScrub}
              className="text-[#5C5A55] hover:text-[#28483E] p-1.5 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* STEP 1: Topic Selection */}
        {step === 1 && (
          <div className="p-6 sm:p-8 overflow-y-auto">
            <span className="text-xs font-semibold text-[#C27C5A] tracking-wide block mb-2">
              STEP 1 OF 3 · CHOOSE YOUR FOCUS
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#28483E] mb-2">
              What has been feeling heaviest lately?
            </h3>
            <p className="text-sm text-[#5C5A55] mb-6">
              This helps pair you with a peer supporter who has navigated similar territory. You can always change direction once inside.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {TOPICS.map((t) => {
                const isSelected = selectedTopic === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTopic(t.id)}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      isSelected
                        ? 'bg-[#FAF8F3] border-[#28483E] text-[#28483E] shadow-2xs'
                        : 'bg-[#FFFFFF] border-[#E8E2D5] text-[#5C5A55] hover:border-[#28483E]/40 hover:text-[#28483E]'
                    }`}
                  >
                    <span className="font-serif text-base font-medium block mb-1 text-[#28483E]">{t.title}</span>
                    <span className="text-xs text-[#5C5A55] block leading-snug">
                      {t.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#E8E2D5]">
              <span className="text-xs text-[#5C5A55]">Takes less than 1 minute</span>
              <button
                onClick={() => setStep(2)}
                className="bg-[#28483E] hover:bg-[#1E3830] text-[#F7F5EE] font-medium text-sm px-6 py-2.5 rounded-full inline-flex items-center gap-2 transition-all shadow-xs"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Pacing & Pseudonym */}
        {step === 2 && (
          <div className="p-6 sm:p-8 overflow-y-auto">
            <span className="text-xs font-semibold text-[#C27C5A] tracking-wide block mb-2">
              STEP 2 OF 3 · ATMOSPHERE &amp; ALIAS
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#28483E] mb-2">
              Set your conversation rhythm.
            </h3>
            <p className="text-sm text-[#5C5A55] mb-6">
              You decide how fast words travel and what alias you wish to carry.
            </p>

            {/* Pacing selection */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-[#5C5A55] mb-2 uppercase tracking-wide">
                Preferred Exchange Pace
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPacing('slow')}
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    pacing === 'slow'
                      ? 'bg-[#FAF8F3] border-[#28483E] text-[#28483E] shadow-2xs'
                      : 'bg-[#FFFFFF] border-[#E8E2D5] text-[#5C5A55]'
                  }`}
                >
                  <span className="font-serif text-base font-medium block mb-1 text-[#28483E]">Slow Exchange (Recommended)</span>
                  <span className="text-xs text-[#5C5A55] block">
                    Take your time. No pressure for instant responses. Minutes or hours between notes.
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPacing('live')}
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    pacing === 'live'
                      ? 'bg-[#FAF8F3] border-[#28483E] text-[#28483E] shadow-2xs'
                      : 'bg-[#FFFFFF] border-[#E8E2D5] text-[#5C5A55]'
                  }`}
                >
                  <span className="font-serif text-base font-medium block mb-1 text-[#28483E]">Live Presence</span>
                  <span className="text-xs text-[#5C5A55] block">
                    Real-time gentle listening session. Both people present for 30–45 minutes.
                  </span>
                </button>
              </div>
            </div>

            {/* Alias Selection */}
            <div className="mb-8">
              <label className="block text-xs font-semibold text-[#5C5A55] mb-2 uppercase tracking-wide">
                Your Pseudonym
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-[#FAF8F3] border border-[#E8E2D5] rounded-full px-5 py-3 text-sm text-[#28483E] font-serif font-medium flex items-center justify-between">
                  <span>{activeAlias}</span>
                  <span className="text-xs font-sans text-[#7C7870]">Pseudonym</span>
                </div>
                <button
                  type="button"
                  onClick={handleNextAlias}
                  className="bg-[#FFFFFF] hover:bg-[#FAF8F3] text-[#5C5A55] hover:text-[#28483E] border border-[#E8E2D5] px-4 py-3 rounded-full text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
                  title="Generate another gentle name"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="hidden sm:inline">Reroll</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#E8E2D5]">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-[#5C5A55] hover:text-[#28483E]"
              >
                &larr; Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="bg-[#28483E] hover:bg-[#1E3830] text-[#F7F5EE] font-medium text-sm px-6 py-2.5 rounded-full inline-flex items-center gap-2 transition-all shadow-xs"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Safe Space Grounding Agreement */}
        {step === 3 && (
          <div className="p-6 sm:p-8 overflow-y-auto">
            <span className="text-xs font-semibold text-[#C27C5A] tracking-wide block mb-2">
              STEP 3 OF 3 · MUTUAL CARE PLEDGE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#28483E] mb-2">
              Our shared commitment before entering.
            </h3>
            <p className="text-sm text-[#5C5A55] mb-6">
              To keep Sunlo safe for everyone, both listeners and sharers agree to these three core foundations:
            </p>

            <div className="space-y-4 mb-8">
              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D5] flex items-start gap-3">
                <Heart className="w-5 h-5 text-[#C27C5A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base font-medium text-[#28483E] mb-0.5">
                    1. A Sanctuary Free of Judgment
                  </h4>
                  <p className="text-xs text-[#5C5A55] leading-relaxed">
                    You can speak unfinished, ambivalent, or messy feelings. Your peer listener will reflect and listen, never criticize or shame.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D5] flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#C27C5A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base font-medium text-[#28483E] mb-0.5">
                    2. Absolute Discretion
                  </h4>
                  <p className="text-xs text-[#5C5A55] leading-relaxed">
                    What is spoken in this room remains in this room. We collect no personal identifiers, and keys are destroyed upon ending.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D5] flex items-start gap-3">
                <Wind className="w-5 h-5 text-[#C27C5A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base font-medium text-[#28483E] mb-0.5">
                    3. Mutual Autonomy &amp; Pause
                  </h4>
                  <p className="text-xs text-[#5C5A55] leading-relaxed">
                    You can pause, take a breath, or exit at any time without explanation. You owe no one performance.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#E8E2D5]">
              <button
                onClick={() => setStep(2)}
                className="text-xs text-[#5C5A55] hover:text-[#28483E]"
              >
                &larr; Back
              </button>
              <button
                onClick={handleEnterRoom}
                className="bg-[#28483E] hover:bg-[#1E3830] text-[#F7F5EE] font-medium text-sm px-6 py-2.5 rounded-full inline-flex items-center gap-2 transition-all shadow-xs"
              >
                <span>Enter Private Room</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Live Safe Space Room */}
        {step === 4 && (
          <div className="flex flex-col flex-1 h-[540px]">
            {/* Room Toolbar */}
            <div className="px-6 py-3 bg-[#FAF8F3] border-b border-[#E8E2D5] flex items-center justify-between text-xs text-[#5C5A55]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2E6850]" />
                <span className="text-[#28483E] font-medium">Elena is present</span>
                <span>· Pacing: {pacing === 'slow' ? 'Slow Exchange' : 'Live'}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsBreathingActive(!isBreathingActive)}
                  className="px-2.5 py-1 bg-[#FFFFFF] hover:bg-[#F7F5EE] text-[#5C5A55] hover:text-[#28483E] rounded-full border border-[#E8E2D5] flex items-center gap-1 shadow-2xs"
                >
                  <Wind className="w-3 h-3 text-[#C27C5A]" />
                  <span>{isBreathingActive ? 'Stop Breath Pacer' : 'Breath Pacer'}</span>
                </button>

                <button
                  onClick={handleExitAndScrub}
                  className="px-2.5 py-1 bg-[#FFFFFF] hover:bg-[#FBEAE8] text-[#C85A54] rounded-full border border-[#E8E2D5] flex items-center gap-1 shadow-2xs"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>End &amp; Scrub</span>
                </button>
              </div>
            </div>

            {/* Breathing Banner if active */}
            {isBreathingActive && (
              <div className="bg-[#FAF8F3] border-b border-[#E8E2D5] p-3 text-center flex items-center justify-center gap-4 animate-in fade-in">
                <span className="text-xs text-[#5C5A55]">Take a slow breath:</span>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold uppercase transition-all duration-700 ${
                      breathPhase === 'Inhale'
                        ? 'text-[#C27C5A] scale-110'
                        : breathPhase === 'Hold'
                        ? 'text-[#28483E] scale-105'
                        : 'text-[#5C5A55] scale-95'
                    }`}
                  >
                    {breathPhase}
                  </span>
                </div>
              </div>
            )}

            {/* Messages Container */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#FFFFFF]">
              {messages.map((m) => {
                if (m.sender === 'system') {
                  return (
                    <div key={m.id} className="text-center my-1">
                      <span className="text-[11px] text-[#5C5A55] bg-[#FAF8F3] px-3.5 py-1 rounded-full border border-[#E8E2D5]">
                        {m.text}
                      </span>
                    </div>
                  );
                }

                const isMe = m.sender === 'user';
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[85%] ${
                      isMe ? 'ml-auto' : 'mr-auto'
                    }`}
                  >
                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed ${
                        isMe
                          ? 'bg-[#28483E] text-[#F7F5EE] rounded-br-xs shadow-xs'
                          : 'bg-[#FAF8F3] text-[#28483E] border border-[#E8E2D5] rounded-bl-xs'
                      }`}
                    >
                      <p>{m.text}</p>
                    </div>
                    <span className="text-[10px] text-[#5C5A55]/70 mt-1 px-1">
                      {isMe ? activeAlias : 'Elena'} · {m.time}
                    </span>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-[#5C5A55] bg-[#FAF8F3] px-3 py-2 rounded-xl w-fit border border-[#E8E2D5]">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C27C5A] animate-bounce" />
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C27C5A] animate-bounce [animation-delay:0.2s]" />
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C27C5A] animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] ml-1">Elena is reading and reflecting...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-4 sm:p-5 bg-[#FAF8F3] border-t border-[#E8E2D5]">
              <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Type anything you wish to say... there is no judgment here."
                  className="flex-1 bg-[#FFFFFF] text-[#28483E] text-sm px-4 py-3 rounded-full border border-[#E8E2D5] focus:outline-none focus:border-[#28483E] placeholder:text-[#5C5A55]/50 shadow-2xs"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim()}
                  className="bg-[#28483E] disabled:opacity-40 hover:bg-[#1E3830] text-[#F7F5EE] p-3 rounded-full transition-transform active:scale-95 shrink-0 shadow-xs"
                  aria-label="Send"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="mt-2 text-[11px] text-[#5C5A55] flex items-center justify-between">
                <span>Press &apos;Disguise&apos; anytime to instantly mask your screen</span>
                <span>Session terminates on window close</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
