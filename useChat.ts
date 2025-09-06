import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message, Conversation, Bot } from '../types';

export const useChat = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(async (
    content: string,
    conversationId: string,
    bot: Bot
  ) => {
    const userMessage: Message = {
      id: uuidv4(),
      content,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    };

    // Add user message
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId
        ? { ...conv, messages: [...conv.messages, userMessage], updatedAt: new Date() }
        : conv
    ));

    // Simulate bot typing
    setIsTyping(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Generate bot response (mock)
    const botResponse = generateBotResponse(content, bot);
    const botMessage: Message = {
      id: uuidv4(),
      content: botResponse,
      sender: 'bot',
      timestamp: new Date(),
      status: 'delivered',
      botId: bot.id
    };

    setIsTyping(false);

    // Add bot message
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId
        ? { ...conv, messages: [...conv.messages, botMessage], updatedAt: new Date() }
        : conv
    ));
  }, []);

  const createConversation = useCallback((bot: Bot): string => {
    const conversationId = uuidv4();
    const newConversation: Conversation = {
      id: conversationId,
      title: `Chat with ${bot.name}`,
      botId: bot.id,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isArchived: false
    };

    setConversations(prev => [newConversation, ...prev]);
    return conversationId;
  }, []);

  return {
    conversations,
    isTyping,
    sendMessage,
    createConversation
  };
};

// Mock bot response generator
const generateBotResponse = (userMessage: string, bot: Bot): string => {
  const responses = [
    `As ${bot.name}, I understand you're asking about "${userMessage}". Let me help you with that.`,
    `That's an interesting question! Based on my ${bot.personality} personality, I'd say...`,
    `I appreciate you reaching out. Here's my perspective on "${userMessage}":`,
    `Great question! Let me break this down for you...`,
    `I'm here to help! Regarding "${userMessage}", here's what I think...`
  ];

  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  // Add some personality-based variations
  if (bot.personality.includes('helpful')) {
    return randomResponse + '\n\nI hope this helps! Is there anything else you\'d like to know?';
  } else if (bot.personality.includes('creative')) {
    return randomResponse + '\n\n✨ *Creative insight*: Have you considered looking at this from a different angle?';
  } else if (bot.personality.includes('analytical')) {
    return randomResponse + '\n\n📊 Based on the data and logical analysis, here are the key points to consider...';
  }

  return randomResponse;
};
