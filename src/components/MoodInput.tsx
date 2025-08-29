import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Music, Search, Sparkles } from 'lucide-react';

interface MoodInputProps {
  onSubmit: (mood: string) => void;
  isLoading?: boolean;
}

const moodSuggestions = [
  'Happy', 'Sad', 'Energetic', 'Calm', 'Romantic', 'Nostalgic', 'Motivated', 'Relaxed'
];

export function MoodInput({ onSubmit, isLoading = false }: MoodInputProps) {
  const [mood, setMood] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mood.trim()) {
      onSubmit(mood.trim());
    }
  };

  const handleMoodSelect = (selectedMood: string) => {
    setMood(selectedMood);
    onSubmit(selectedMood);
  };

  return (
    <Card className="p-8 bg-gradient-secondary border-purple/20 backdrop-blur-sm">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-accent rounded-full shadow-glow">
            <Music className="h-6 w-6 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">How are you feeling today?</h2>
        <p className="text-muted-foreground">Tell us your mood and we'll find the perfect soundtrack</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Describe your current mood..."
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="pl-10 py-6 text-lg bg-background/50 border-purple/30 focus:border-primary focus:ring-primary"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full py-6 text-lg bg-gradient-accent hover:shadow-glow transition-smooth"
          disabled={isLoading || !mood.trim()}
        >
          {isLoading ? (
            <>
              <Sparkles className="h-5 w-5 mr-2 animate-spin" />
              Finding your vibe...
            </>
          ) : (
            <>
              <Search className="h-5 w-5 mr-2" />
              Get My Recommendations
            </>
          )}
        </Button>
      </form>

      <div className="mt-6">
        <p className="text-sm text-muted-foreground mb-3 text-center">Or choose from popular moods:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {moodSuggestions.map((suggestion) => (
            <Button
              key={suggestion}
              variant="outline"
              size="sm"
              onClick={() => handleMoodSelect(suggestion)}
              className="border-purple/30 hover:bg-primary/20 hover:border-primary transition-smooth"
              disabled={isLoading}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}