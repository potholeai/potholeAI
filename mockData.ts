import { Bot } from '../types';

export const mockBots: Bot[] = [
  {
    id: '1',
    name: 'Assistant Pro',
    description: 'A helpful AI assistant for general tasks, writing, and problem-solving.',
    avatar: '',
    personality: 'helpful, professional, knowledgeable',
    systemPrompt: 'You are a helpful AI assistant. Be professional, accurate, and concise.',
    temperature: 0.7,
    maxTokens: 2048,
    isOnline: true,
    color: 'from-cyan-500 to-blue-500',
    capabilities: ['Writing', 'Analysis', 'Research', 'Problem Solving']
  },
  {
    id: '2',
    name: 'Creative Writer',
    description: 'Specialized in creative writing, storytelling, and content creation.',
    avatar: '',
    personality: 'creative, imaginative, inspiring',
    systemPrompt: 'You are a creative writing assistant. Be imaginative, inspiring, and help with storytelling.',
    temperature: 0.9,
    maxTokens: 4096,
    isOnline: true,
    color: 'from-purple-500 to-pink-500',
    capabilities: ['Creative Writing', 'Storytelling', 'Poetry', 'Content Creation']
  },
  {
    id: '3',
    name: 'Code Expert',
    description: 'Expert programmer and software development assistant.',
    avatar: '',
    personality: 'analytical, precise, technical',
    systemPrompt: 'You are a programming expert. Provide accurate code solutions and technical guidance.',
    temperature: 0.3,
    maxTokens: 3072,
    isOnline: true,
    color: 'from-green-500 to-emerald-500',
    capabilities: ['Programming', 'Debugging', 'Code Review', 'Architecture']
  },
  {
    id: '4',
    name: 'Research Scholar',
    description: 'Academic research assistant for in-depth analysis and citations.',
    avatar: '',
    personality: 'scholarly, thorough, methodical',
    systemPrompt: 'You are a research assistant. Provide thorough, well-researched responses with proper citations.',
    temperature: 0.4,
    maxTokens: 4096,
    isOnline: false,
    color: 'from-amber-500 to-orange-500',
    capabilities: ['Research', 'Citations', 'Analysis', 'Academic Writing']
  },
  {
    id: '5',
    name: 'Business Advisor',
    description: 'Strategic business consultant for planning and decision-making.',
    avatar: '',
    personality: 'strategic, practical, results-oriented',
    systemPrompt: 'You are a business consultant. Provide strategic advice and practical solutions.',
    temperature: 0.6,
    maxTokens: 2048,
    isOnline: true,
    color: 'from-indigo-500 to-purple-500',
    capabilities: ['Strategy', 'Planning', 'Analysis', 'Consulting']
  }
];
