'use client';

import React, { useState } from 'react';
import { Bot, ChevronUp, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { ContextPanel } from './context-panel';
import { ChatInputBar } from './chat-input-bar';
import { ChatMessagesStream } from './chat-messages-stream';
import { useChatbotLogic } from './use-chatbot';

export function JansetuChatbot() {
  const { language, t } = useLanguage();
  const [mobileContextOpen, setMobileContextOpen] = useState(false);
  const {
    messages, inputText, setInputText, isProcessing, profile, activePerson,
    currentLifeEvent, matchedRecs, excludedList, debugMode, messagesEndRef,
    handleFamilyChange, handleSendMessage,
  } = useChatbotLogic(language);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl shadow-civic-card flex flex-col h-[750px] overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center font-bold text-amber-400 shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white">{t.ask.title}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Grounded Mode</span>
              </div>
              <p className="text-xs text-slate-300">Grounded in verified central & state public regulations</p>
            </div>
          </div>
          <button onClick={() => setMobileContextOpen(!mobileContextOpen)} className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition text-xs flex items-center gap-1 font-semibold">
            <span>Context</span>
            {mobileContextOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        <ChatMessagesStream messages={messages} messagesEndRef={messagesEndRef} />
        <ChatInputBar
          inputText={inputText} setInputText={setInputText} isProcessing={isProcessing}
          activePerson={activePerson} onFamilyChange={handleFamilyChange} onSend={handleSendMessage}
        />
      </div>

      <ContextPanel
        profile={profile} activePerson={activePerson} currentLifeEvent={currentLifeEvent}
        matchedRecs={matchedRecs} excludedList={excludedList} debugMode={debugMode}
        mobileContextOpen={mobileContextOpen}
      />
    </div>
  );
}
