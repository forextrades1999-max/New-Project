/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Key, Mail, Shield, CheckCircle } from 'lucide-react';
import { SunloLogo } from './SunloLogo';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (alias: string) => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [method, setMethod] = useState<'passkey' | 'magic-link'>('passkey');
  const [passkeyInput, setPasskeyInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === 'passkey') {
      setStatusMessage('Restoring your private session...');
      setTimeout(() => {
        onSuccess(passkeyInput ? 'Returning Member' : 'Quiet Wanderer');
        onClose();
      }, 800);
    } else {
      if (!emailInput.includes('@')) {
        return;
      }
      setStatusMessage('Magic login link dispatched. Check your inbox.');
      setTimeout(() => {
        onSuccess('Verified Member');
        onClose();
      }, 1200);
    }
  };

  const handleGuestEntry = () => {
    onSuccess('Gentle Guest');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="signin-title"
    >
      <div className="bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#5C5A55] hover:text-[#28483E] p-1.5 rounded-full transition-colors"
          aria-label="Close sign in"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <SunloLogo size="md" className="justify-center mb-3" />
          <h3 id="signin-title" className="font-serif text-2xl font-normal text-[#28483E] mb-1">
            Access Your Private Space
          </h3>
          <p className="text-xs text-[#5C5A55]">
            No public profiles or passwords. Sign in using your private passkey or email link.
          </p>
        </div>

        {/* Method Switcher */}
        <div className="flex p-1 bg-[#FAF8F3] rounded-full border border-[#E8E2D5] mb-6">
          <button
            type="button"
            onClick={() => setMethod('passkey')}
            className={`flex-1 py-2 text-xs font-medium rounded-full transition-all flex items-center justify-center gap-1.5 ${
              method === 'passkey'
                ? 'bg-[#FFFFFF] text-[#28483E] shadow-xs'
                : 'text-[#5C5A55] hover:text-[#28483E]'
            }`}
          >
            <Key className="w-3.5 h-3.5 text-[#C27C5A]" />
            <span>Private Passkey</span>
          </button>
          <button
            type="button"
            onClick={() => setMethod('magic-link')}
            className={`flex-1 py-2 text-xs font-medium rounded-full transition-all flex items-center justify-center gap-1.5 ${
              method === 'magic-link'
                ? 'bg-[#FFFFFF] text-[#28483E] shadow-xs'
                : 'text-[#5C5A55] hover:text-[#28483E]'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-[#C27C5A]" />
            <span>Magic Link</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {method === 'passkey' ? (
            <div>
              <label className="block text-xs font-medium text-[#5C5A55] mb-1.5">
                Enter your 12-word passkey or session token
              </label>
              <textarea
                value={passkeyInput}
                onChange={(e) => setPasskeyInput(e.target.value)}
                placeholder="e.g. amber river gentle morning cedar ember silent harbor..."
                rows={3}
                className="w-full bg-[#FAF8F3] text-[#28483E] text-xs p-3.5 rounded-2xl border border-[#E8E2D5] focus:outline-none focus:border-[#28483E] resize-none"
              />
              <span className="text-[11px] text-[#7C7870] mt-1 block">
                Leave blank to automatically generate a fresh session token.
              </span>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-medium text-[#5C5A55] mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="your.email@example.com"
                required
                className="w-full bg-[#FAF8F3] text-[#28483E] text-sm px-4 py-3 rounded-full border border-[#E8E2D5] focus:outline-none focus:border-[#28483E]"
              />
              <span className="text-[11px] text-[#7C7870] mt-1 block">
                We only use this to send a one-time login link. No newsletters or tracking.
              </span>
            </div>
          )}

          {statusMessage && (
            <div className="p-3 bg-[#E5EDE6] border border-[#28483E]/20 rounded-xl text-xs text-[#28483E] flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0 text-[#28483E]" />
              <span>{statusMessage}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#28483E] hover:bg-[#1E3830] text-[#F7F5EE] font-medium text-sm py-3 rounded-full transition-colors shadow-xs"
          >
            {method === 'passkey' ? 'Restore Private Session' : 'Send Magic Link'}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-[#E8E2D5] text-center">
          <button
            onClick={handleGuestEntry}
            className="text-xs text-[#5C5A55] hover:text-[#28483E] transition-colors underline"
          >
            Or proceed anonymously without saving session history
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-[#7C7870]">
          <Shield className="w-3 h-3 text-[#2E6850]" />
          <span>End-to-end zero-knowledge architecture</span>
        </div>
      </div>
    </div>
  );
};
