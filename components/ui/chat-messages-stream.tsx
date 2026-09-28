'use client';

import React from 'react';
import { Bot } from 'lucide-react';
import { ChatMessage } from '@/lib/types';
import { StructuredResponse } from './structured-response';

interface ChatMessagesStreamProps {
  messages: ChatMessage[];
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export function ChatMessagesStream({ messages, messagesEndRef }: ChatMessagesStreamProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/50">
      {messages.map((msg) => {
        const isUser = msg.sender === 'user';
        return (
          <div key={msg.id} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shrink-0 mt-1 shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div className={`max-w-2xl rounded-2xl p-4 sm:p-5 shadow-xs space-y-3 text-xs sm:text-sm ${
              isUser ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-900 rounded-tl-none'
            }`}>
              <div className="flex items-center justify-between gap-4 text-[11px] text-slate-400 pb-1 border-b border-slate-100/50">
                <span className="font-semibold">{isUser ? 'You' : 'JANSETU Grounded Navigator'}</span>
                <span>{msg.timestamp}</span>
              </div>
              <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              {msg.structuredResponse && <StructuredResponse msg={msg} />}
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
