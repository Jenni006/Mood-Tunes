import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';

interface ArtistSelectorProps {
  onArtistSelect: (artist: string) => void;
}

const tamilArtists = [
  'A.R. Rahman', 'Anirudh Ravichander', 'Harris Jayaraj', 'Yuvan Shankar Raja',
  'Santhosh Narayanan', 'D. Imman', 'Ghibran', 'Hip Hop Tamizha'
];

const hindiArtists = [
  'Arijit Singh', 'Shreya Ghoshal', 'Rahat Fateh Ali Khan', 'Atif Aslam',
  'Armaan Malik', 'Neha Kakkar', 'Yo Yo Honey Singh', 'Badshah'
];

export function ArtistSelector({ onArtistSelect }: ArtistSelectorProps) {
  return (
    <Card className="bg-card/90 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Whose songs do you want to listen to?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="bg-primary/20 text-primary">Tamil</Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {tamilArtists.map((artist) => (
              <Button
                key={artist}
                onClick={() => onArtistSelect(artist)}
                variant="outline"
                size="sm"
                className="h-auto p-3 text-left justify-start border-primary/30 hover:bg-primary/20 hover:border-primary transition-smooth"
              >
                <User className="h-4 w-4 mr-2 text-primary-glow" />
                <span className="text-xs">{artist}</span>
              </Button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="bg-primary/20 text-primary">Hindi</Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {hindiArtists.map((artist) => (
              <Button
                key={artist}
                onClick={() => onArtistSelect(artist)}
                variant="outline"
                size="sm"
                className="h-auto p-3 text-left justify-start border-primary/30 hover:bg-primary/20 hover:border-primary transition-smooth"
              >
                <User className="h-4 w-4 mr-2 text-primary-glow" />
                <span className="text-xs">{artist}</span>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}