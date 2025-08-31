import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User, Send, Sparkles } from 'lucide-react';

interface ChatMoodInputProps {
  onMoodSelect: (mood: string) => void;
  isLoading?: boolean;
}

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
}

const moodSuggestions = ['Happy', 'Sad', 'Romantic', 'Party', 'Chill', 'Workout'];

export function ChatMoodInput({ onMoodSelect, isLoading = false }: ChatMoodInputProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Initial bot message
    const initialMessage: Message = {
      id: '1',
      type: 'bot',
      content: "Hey there! 👋 How's your mood today? I'd love to help you find the perfect music that matches how you're feeling right now.",
      timestamp: new Date()
    };
    
    setMessages([initialMessage]);
    
    // Show suggestions after a delay
    setTimeout(() => {
      setShowSuggestions(true);
    }, 1000);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (mood: string) => {
    if (!mood.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: mood,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setShowSuggestions(false);

    // Bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: `Great! I can feel the ${mood.toLowerCase()} vibes! 🎵 Now, let me help you choose some amazing artists to match your mood.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      
      // Trigger mood selection after bot response
      setTimeout(() => {
        onMoodSelect(mood);
      }, 1000);
    }, 500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <Card className="max-w-2xl mx-auto h-[600px] bg-card/90 backdrop-blur-sm border-primary/20 flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-primary/20 bg-gradient-accent/10">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gradient-accent text-white">
              <Bot className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-foreground">MoodTunes AI</h3>
            <p className="text-sm text-muted-foreground">Your personal music companion</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${
              message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback className={
                message.type === 'bot' 
                  ? 'bg-gradient-accent text-white' 
                  : 'bg-primary text-primary-foreground'
              }>
                {message.type === 'bot' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-primary text-primary-foreground ml-auto'
                  : 'bg-muted text-foreground'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gradient-accent text-white">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-muted text-foreground p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 animate-spin" />
                <span className="text-sm">Finding perfect artists for you...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      {showSuggestions && !isLoading && (
        <div className="p-4 border-t border-primary/20">
          <p className="text-xs text-muted-foreground mb-2">Quick mood options:</p>
          <div className="flex flex-wrap gap-2">
            {moodSuggestions.map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-xs border-primary/30 hover:bg-primary/20 hover:border-primary transition-smooth"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-primary/20">
        <form onSubmit={handleInputSubmit} className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your mood here..."
            className="flex-1 bg-background/50 border-primary/30 focus:border-primary"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="sm" 
            disabled={!inputValue.trim() || isLoading}
            className="bg-gradient-accent hover:shadow-glow transition-smooth"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
}