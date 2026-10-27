/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Send, Wind, Trash2, Shield, Heart } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'listener' | 'system';
  text: string;
  time: string;
}

const TOPIC_PRESETS = [
  {
    id: 'burnout',
    label: 'Silent Burnout',
    description: 'When exhaustion is invisible to everyone around you',
    listener: {
      name: 'Maya',
      badge: 'Lived experience in executive burnout',
      initialMessage:
        "Hello. I know even typing the first sentence takes energy when you're drained. Take as long as you need—there is no rush here. What has been feeling heaviest lately?",
    },
    suggestedPrompts: [
      "I'm keeping up appearances at work, but inside I'm completely empty.",
      "I feel guilty for resting because I feel like I'm falling behind.",
      "I can't tell my friends because they think I have everything handled.",
    ],
  },
  {
    id: 'family',
    label: 'Family Expectations',
    description: 'Carrying filial duty, guilt, and unspoken boundaries',
    listener: {
      name: 'Julian',
      badge: 'Peer supporter · First-gen family dynamics',
      initialMessage:
        'Welcome. Family expectations can feel like an invisible cage that everyone thinks is love. You don&apos;t have to defend or justify anything here. What is weighing on you today?',
    },
    suggestedPrompts: [
      "Every time I try to set a small boundary, I am overwhelmed by guilt.",
      "They celebrate what I achieve, but they don't know who I actually am.",
      "I am constantly afraid of letting my parents down.",
    ],
  },
  {
    id: 'loneliness',
    label: 'Quiet Loneliness',
    description: 'Surrounded by people yet profoundly unseen',
    listener: {
      name: 'Claire',
      badge: 'Peer listener · Navigating major life transitions',
      initialMessage:
        "Hi there. Loneliness can be so sharp, especially when you're in the middle of a crowded room or bustling day. I'm here, I'm listening, and you don't have to entertain me.",
    },
    suggestedPrompts: [
      "I have acquaintances, but no one I can call when things fall apart.",
      "I feel like if I stopped reaching out first, everyone would forget me.",
      "It feels vulnerable to admit I'm lonely, even anonymously.",
    ],
  },
  {
    id: 'relationships',
    label: 'Unspoken Relationship Doubts',
    description: 'Feelings you cannot yet voice to your partner',
    listener: {
      name: 'Devon',
      badge: 'Peer supporter · Relationship communications',
      initialMessage:
        "I'm glad you're here. Admitting doubt about people we love can feel terrifying and disloyal. You can say the messy, confusing thoughts here without judgment. Where do you want to begin?",
    },
    suggestedPrompts: [
      "I care about them, but I feel so intensely alone in our conversations.",
      "I don't know if I'm losing myself or if this is just a rough phase.",
      "I keep holding back what I need because I'm afraid of conflict.",
    ],
  },
];

interface InteractiveConversationPreviewProps {
  onStartFullConversation: (topic?: string) => void;
}

export const InteractiveConversationPreview: React.FC<InteractiveConversationPreviewProps> = ({
  onStartFullConversation,
}) => {
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
  const activeTopic = TOPIC_PRESETS[selectedTopicIndex];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      sender: 'listener',
      text: activeTopic.listener.initialMessage,
      time: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isBreathingModalOpen, setIsBreathingModalOpen] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [isPacedMode, setIsPacedMode] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll inside chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Reset messages when topic changes
  const handleSelectTopic = (index: number) => {
    setSelectedTopicIndex(index);
    const chosen = TOPIC_PRESETS[index];
    setMessages([
      {
        id: 'init-' + chosen.id,
        sender: 'listener',
        text: chosen.listener.initialMessage,
        time: 'Just now',
      },
    ]);
  };

  // Breathing pacer timer
  useEffect(() => {
    if (!isBreathingModalOpen) return;
    let timer: NodeJS.Timeout;
    const cycle = () => {
      setBreathingPhase('Inhale');
      timer = setTimeout(() => {
        setBreathingPhase('Hold');
        timer = setTimeout(() => {
          setBreathingPhase('Exhale');
          timer = setTimeout(cycle, 4000);
        }, 3000);
      }, 4000);
    };
    cycle();
    return () => clearTimeout(timer);
  }, [isBreathingModalOpen]);

  // Handle sending a message
  const handleSendMessage = (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: trimmed,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulated empathetic response based on active listener
    setTimeout(() => {
      setIsTyping(false);
      let listenerReply = '';

      if (trimmed.toLowerCase().includes('empty') || trimmed.toLowerCase().includes('burnout')) {
        listenerReply =
          "That hollow feeling of keeping up appearances is exhausting. It takes so much physical energy just to wear the mask. How long have you felt like you had to carry it alone?";
      } else if (trimmed.toLowerCase().includes('guilt') || trimmed.toLowerCase().includes('boundary')) {
        listenerReply =
          "Guilt is so frequently what good people feel when they stop abandoning themselves. It doesn't mean setting that boundary was wrong. You're allowed to protect your peace.";
      } else if (trimmed.toLowerCase().includes('lonely') || trimmed.toLowerCase().includes('alone')) {
        listenerReply =
          "I hear you so clearly. Feeling disconnected while people are around is one of the heaviest kinds of pain. Thank you for sharing that with me here—you are seen right now.";
      } else {
        listenerReply =
          "Thank you for sharing that with me. It takes courage to put words to feelings that have stayed quiet for so long. There is no right or wrong way to feel about this. What feels most urgent for you in this moment?";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: 'lst-' + Date.now(),
          sender: 'listener',
          text: listenerReply,
          time: 'Just now',
        },
      ]);
    }, isPacedMode ? 2200 : 1200);
  };

  const handleClearSession = () => {
    setMessages([
      {
        id: 'sys-' + Date.now(),
        sender: 'system',
        text: 'Session scrubbed. All temporary logs and memory cleared from this room.',
        time: 'Just now',
      },
      {
        id: 'init-' + activeTopic.id,
        sender: 'listener',
        text: activeTopic.listener.initialMessage,
        time: 'Just now',
      },
    ]);
  };

  return (
    <section id="demo" className="py-24 bg-[#FAF8F3] border-y border-[#E5DFD3]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#C27C5A] tracking-wide mb-3">
            <span>EXPERIENCE THE ATMOSPHERE</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#5C5A55]">Interactive Preview</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#28483E] leading-tight mb-4 [text-wrap:balance]">
            Experience what it feels like to speak <span className="italic text-[#C27C5A]">without fear.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#5C5A55] leading-relaxed">
            Try a simulated conversation below. Choose a topic that resonates, send a thought, or use a prompt. Notice the absence of hurry, judgment, and unsolicited advice.
          </p>
        </div>

        {/* Topic Selector Tabs (functional buttons with active state) */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {TOPIC_PRESETS.map((preset, index) => {
            const isActive = index === selectedTopicIndex;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectTopic(index)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all border whitespace-nowrap ${
                  isActive
                    ? 'bg-[#28483E] text-[#F7F5EE] border-[#28483E] shadow-sm'
                    : 'bg-[#FFFFFF] text-[#5C5A55] border-[#E8E2D5] hover:text-[#28483E] hover:border-[#28483E]/40'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        {/* Conversation Simulator Box */}
        <div className="bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl overflow-hidden shadow-xl shadow-[#28483E]/5">
          {/* Top Bar of the Chat Room */}
          <div className="px-6 py-4 bg-[#FAF8F3] border-b border-[#E8E2D5] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#28483E] text-[#F7F5EE] flex items-center justify-center font-semibold text-xs">
                {activeTopic.listener.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#28483E]">
                    {activeTopic.listener.name}
                  </span>
                  <span className="text-xs text-[#5C5A55]">· Peer Supporter</span>
                </div>
                <span className="text-xs text-[#5C5A55]/80 block">
                  {activeTopic.listener.badge}
                </span>
              </div>
            </div>

            {/* Room Controls */}
            <div className="flex items-center gap-2 sm:gap-3 text-xs">
              <button
                onClick={() => setIsBreathingModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E8E2D5] text-[#5C5A55] hover:text-[#28483E] hover:border-[#28483E]/40 transition-colors shadow-2xs"
                title="Grounding breath exercise"
              >
                <Wind className="w-3.5 h-3.5 text-[#C27C5A]" />
                <span className="hidden sm:inline">Take a Breath</span>
              </button>

              <button
                onClick={() => setIsPacedMode(!isPacedMode)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors shadow-2xs ${
                  isPacedMode
                    ? 'bg-[#E5EDE6] text-[#28483E] border-[#28483E]/40'
                    : 'bg-[#FFFFFF] text-[#5C5A55] border-[#E8E2D5]'
                }`}
                title="Toggle slow pacing"
              >
                <span className="w-2 h-2 rounded-full bg-[#C27C5A]" />
                <span>{isPacedMode ? 'Slow Paced' : 'Standard Paced'}</span>
              </button>

              <button
                onClick={handleClearSession}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[#5C5A55] hover:text-[#C85A54] hover:bg-[#FAF8F3] transition-colors"
                title="Wipe room and clear local session"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Wipe Room</span>
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="p-6 h-[340px] sm:h-[380px] overflow-y-auto space-y-4 bg-[#FFFFFF]">
            <div className="text-center my-2">
              <span className="text-[11px] text-[#5C5A55] bg-[#FAF8F3] px-3.5 py-1 rounded-full border border-[#E8E2D5]">
                Encrypted Session · Your alias: <strong className="text-[#28483E]">Quiet Sparrow</strong> · No identity stored
              </span>
            </div>

            {messages.map((msg) => {
              if (msg.sender === 'system') {
                return (
                  <div key={msg.id} className="text-center py-2">
                    <span className="text-xs text-[#5C5A55] italic bg-[#FAF8F3] px-3 py-1 rounded border border-[#E8E2D5]">
                      {msg.text}
                    </span>
                  </div>
                );
              }

              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%] sm:max-w-[75%] ${
                    isUser ? 'ml-auto' : 'mr-auto'
                  }`}
                >
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      isUser
                        ? 'bg-[#28483E] text-[#F7F5EE] rounded-br-xs shadow-xs'
                        : 'bg-[#FAF8F3] text-[#28483E] border border-[#E8E2D5] rounded-bl-xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                  <span className="text-[10px] text-[#5C5A55]/70 mt-1 px-1">
                    {msg.sender === 'listener' ? activeTopic.listener.name : 'You (Quiet Sparrow)'} · {msg.time}
                  </span>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-[#5C5A55] bg-[#FAF8F3] px-3 py-2 rounded-xl w-fit border border-[#E8E2D5]">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C27C5A] animate-bounce" />
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C27C5A] animate-bounce [animation-delay:0.2s]" />
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C27C5A] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] ml-1">{activeTopic.listener.name} is reading and reflecting...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Prompts Strip */}
          <div className="px-6 py-3 bg-[#FAF8F3] border-t border-[#E8E2D5] flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
            <span className="text-[#5C5A55] shrink-0 font-medium text-[11px]">Or try asking:</span>
            {activeTopic.suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="shrink-0 bg-[#FFFFFF] hover:bg-[#F7F5EE] text-[#5C5A55] hover:text-[#28483E] px-3.5 py-1.5 rounded-full border border-[#E8E2D5] transition-colors truncate max-w-[280px]"
              >
                &ldquo;{prompt}&rdquo;
              </button>
            ))}
          </div>

          {/* Input Box Area */}
          <div className="p-4 sm:p-5 bg-[#FAF8F3] border-t border-[#E8E2D5]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Write whatever is on your mind. Take your time..."
                className="flex-1 bg-[#FFFFFF] text-[#28483E] text-sm px-4 py-3 rounded-full border border-[#E8E2D5] focus:outline-none focus:border-[#28483E] placeholder:text-[#5C5A55]/50 shadow-2xs"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="bg-[#28483E] disabled:opacity-40 disabled:hover:bg-[#28483E] hover:bg-[#1E3830] text-[#F7F5EE] p-3 rounded-full font-medium transition-all transform active:scale-95 shrink-0 shadow-sm"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-3 flex items-center justify-between text-xs text-[#5C5A55]">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#2E6850]" />
                <span>Simulated demo room · No messages are recorded or sent over network</span>
              </span>
              <button
                onClick={() => onStartFullConversation(activeTopic.id)}
                className="text-[#C27C5A] hover:underline font-medium inline-flex items-center gap-1"
              >
                <span>Ready for a real listener?</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grounding Breath Modal */}
      {isBreathingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl p-8 max-w-sm w-full text-center relative shadow-2xl">
            <button
              onClick={() => setIsBreathingModalOpen(false)}
              className="absolute top-4 right-4 text-[#5C5A55] hover:text-[#28483E] text-sm"
              aria-label="Close breathing modal"
            >
              ✕
            </button>
            <div className="w-10 h-10 rounded-full bg-[#FAF8F3] border border-[#E8E2D5] flex items-center justify-center mx-auto mb-4 text-[#C27C5A]">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <h3 className="font-serif text-xl font-normal text-[#28483E] mb-1">Take a Grounding Breath</h3>
            <p className="text-xs text-[#5C5A55] mb-6">
              When thoughts are swirling, slowing your breath signals physical safety to your nervous system.
            </p>

            <div className="relative w-40 h-40 mx-auto mb-6 flex items-center justify-center">
              <div
                className={`w-32 h-32 rounded-full border-2 border-[#C27C5A]/40 transition-all duration-1000 flex items-center justify-center ${
                  breathingPhase === 'Inhale'
                    ? 'scale-125 bg-[#C27C5A]/15'
                    : breathingPhase === 'Hold'
                    ? 'scale-125 bg-[#C27C5A]/25'
                    : 'scale-90 bg-transparent'
                }`}
              >
                <span className="text-sm font-semibold text-[#28483E] tracking-wider uppercase">
                  {breathingPhase}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsBreathingModalOpen(false)}
              className="w-full bg-[#FAF8F3] hover:bg-[#F7F5EE] text-[#28483E] border border-[#E8E2D5] font-medium py-2.5 rounded-full text-sm transition-colors"
            >
              Return to Conversation
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
