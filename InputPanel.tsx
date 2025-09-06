import React, { useState } from 'react';
import { Send, Paperclip, Mic, Image, FileText } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface InputPanelProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  onSendMessage,
  disabled
}) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-slate-700 bg-slate-900/95 backdrop-blur-sm p-4">
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        <div className="flex-1">
          <div className="relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={disabled}
              className="pr-12 resize-none"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="w-8 h-8"
              >
                <Paperclip className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-xs"
            >
              <Image className="w-3 h-3 mr-1" />
              Image
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-xs"
            >
              <FileText className="w-3 h-3 mr-1" />
              Document
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={`text-xs ${isRecording ? 'text-red-400' : ''}`}
              onClick={() => setIsRecording(!isRecording)}
            >
              <Mic className="w-3 h-3 mr-1" />
              {isRecording ? 'Stop' : 'Voice'}
            </Button>
          </div>
        </div>
        
        <Button
          type="submit"
          disabled={!message.trim() || disabled}
          size="icon"
          className="mb-8"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};
