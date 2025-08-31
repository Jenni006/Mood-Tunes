import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Smile, Frown, Heart, PartyPopper, Leaf, Dumbbell } from 'lucide-react';

interface MoodSelectorProps {
  onMoodSelect: (mood: string) => void;
}

const moods = [
  { name: 'Happy', icon: Smile, color: 'text-yellow-400', bgColor: 'bg-yellow-400/20' },
  { name: 'Sad', icon: Frown, color: 'text-blue-400', bgColor: 'bg-blue-400/20' },
  { name: 'Romantic', icon: Heart, color: 'text-pink-400', bgColor: 'bg-pink-400/20' },
  { name: 'Party', icon: PartyPopper, color: 'text-orange-400', bgColor: 'bg-orange-400/20' },
  { name: 'Chill', icon: Leaf, color: 'text-green-400', bgColor: 'bg-green-400/20' },
  { name: 'Workout', icon: Dumbbell, color: 'text-red-400', bgColor: 'bg-red-400/20' },
];

export function MoodSelector({ onMoodSelect }: MoodSelectorProps) {
  return (
    <Card className="bg-card/90 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="text-center text-2xl">How's your mood?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {moods.map(({ name, icon: Icon, color, bgColor }) => (
            <Button
              key={name}
              onClick={() => onMoodSelect(name)}
              variant="outline"
              className={`h-20 flex-col gap-2 border-primary/30 hover:bg-primary/20 hover:border-primary transition-smooth ${bgColor}`}
            >
              <Icon className={`h-6 w-6 ${color}`} />
              <span className="font-medium">{name}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}