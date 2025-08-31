import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, ExternalLink, Music } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  url: string;
  duration: string;
}

interface SongListProps {
  songs: Song[];
  mood: string;
  artist: string;
  isLoading?: boolean;
}

export function SongList({ songs, mood, artist, isLoading = false }: SongListProps) {
  const handlePlay = (url: string) => {
    window.open(url, '_blank');
  };

  if (isLoading) {
    return (
      <Card className="bg-card/90 backdrop-blur-sm border-primary/20">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Music className="h-8 w-8 text-primary-glow animate-pulse" />
          </div>
          <p className="text-foreground">Finding perfect songs for you...</p>
        </CardContent>
      </Card>
    );
  }

  if (songs.length === 0) {
    return (
      <Card className="bg-card/90 backdrop-blur-sm border-primary/20">
        <CardContent className="p-8 text-center">
          <Music className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No songs found. Try a different mood or artist.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/90 backdrop-blur-sm border-primary/20">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Badge variant="secondary" className="bg-primary/20 text-primary">{mood}</Badge>
          <Badge variant="outline" className="border-primary/30">{artist}</Badge>
        </div>
        
        <div className="space-y-4">
          {songs.map((song) => (
            <div key={song.id} className="flex items-center gap-4 p-4 rounded-lg bg-background/50 border border-primary/20 hover:bg-primary/10 transition-smooth">
              <img 
                src={song.thumbnail} 
                alt={song.title}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate text-foreground">{song.title}</h3>
                <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                <p className="text-xs text-muted-foreground">{song.duration}</p>
              </div>
              <Button
                onClick={() => handlePlay(song.url)}
                size="sm"
                className="bg-gradient-accent hover:shadow-glow transition-smooth"
              >
                <Play className="h-4 w-4 mr-1" />
                Play
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Songs will open in YouTube in a new tab
          </p>
        </div>
      </CardContent>
    </Card>
  );
}