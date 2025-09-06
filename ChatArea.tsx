import React, { useRef, useEffect } from 'react';
import { Message, Bot } from '../../types';
import { MessageBubble } from './MessageBubble';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ChatAreaProps {
  messages: Message[];
  currentBot?: Bot;
  isTyping?: boolean;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  currentBot,
  isTyping
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-white">
              {currentBot?.name[0] || 'B'}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-slate-200 mb-2">
            Start a conversation with {currentBot?.name || 'AI Bot'}
          </h3>
          <p className="text-slate-400 max-w-md">
            {currentBot?.description || 'Ask me anything! I\'m here to help you with your questions and tasks.'}
          </p>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              botName={currentBot?.name}
              botAvatar={currentBot?.avatar}
              botColor={currentBot?.color}
            />
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                <span className="text-sm font-bold text-white">
                  {currentBot?.name[0] || 'B'}
                </span>
              </div>
              <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl px-4 py-2">
                <div className="flex items-center gap-1">
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                  <span className="text-slate-400 text-sm">Typing...</span>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
