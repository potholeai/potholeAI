import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Copy, Check, MoreHorizontal } from 'lucide-react';
import { Message } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

interface MessageBubbleProps {
  message: Message;
  botName?: string;
  botAvatar?: string;
  botColor?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  botName,
  botAvatar,
  botColor = 'from-cyan-500 to-purple-500'
}) => {
  const [copied, setCopied] = React.useState(false);
  const isUser = message.sender === 'user';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} group`}
    >
      <Avatar
        src={isUser ? undefined : botAvatar}
        fallback={isUser ? 'U' : botName?.[0] || 'B'}
        gradient={isUser ? 'from-slate-600 to-slate-700' : botColor}
        status={isUser ? undefined : 'online'}
      />
      
      <div className={`flex flex-col max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`rounded-2xl px-4 py-2 ${
          isUser 
            ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white' 
            : 'bg-slate-800/80 backdrop-blur-sm text-slate-200 border border-slate-700'
        }`}>
          {isUser ? (
            <p className="text-sm">{message.content}</p>
          ) : (
            <ReactMarkdown 
              className="prose prose-invert prose-sm max-w-none"
              components={{
                code: ({ children }) => (
                  <code className="bg-slate-900/50 px-1 py-0.5 rounded text-cyan-300 font-mono text-xs">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-slate-900/50 p-3 rounded-lg overflow-x-auto">
                    {children}
                  </pre>
                )
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
        
        <div className={`flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${
          isUser ? 'flex-row-reverse' : 'flex-row'
        }`}>
          <span className="text-xs text-slate-400">
            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
          </span>
          
          {message.status && (
            <Badge 
              variant={message.status === 'error' ? 'danger' : 'default'}
              size="sm"
            >
              {message.status}
            </Badge>
          )}
          
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-slate-700 transition-colors"
          >
            {copied ? (
              <Check className="w-3 h-3 text-green-400" />
            ) : (
              <Copy className="w-3 h-3 text-slate-400" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
