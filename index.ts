export interface Bot {
  id: string;
  name: string;
  description: string;
  avatar: string;
  personality: string;
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  isOnline: boolean;
  color: string;
  capabilities: string[];
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'error';
  botId?: string;
  attachments?: Attachment[];
  reactions?: Reaction[];
}

export interface Conversation {
  id: string;
  title: string;
  botId: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface AppState {
  currentBotId: string | null;
  currentConversationId: string | null;
  bots: Bot[];
  conversations: Conversation[];
  isTyping: boolean;
  sidebarOpen: boolean;
  theme: 'dark' | 'light';
}
