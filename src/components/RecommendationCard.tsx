import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Play, Music, Video } from 'lucide-react';

interface Recommendation {
  id: string;
  title: string;
  artist: string;
  type: 'song' | 'video';
  reason: string;
  link?: string;
  thumbnail?: string;
}

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const { title, artist, type, reason, link, thumbnail } = recommendation;

  const handlePlay = () => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  return (
    <Card className="p-6 bg-gradient-secondary border-purple/20 backdrop-blur-sm hover:shadow-purple transition-smooth group">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gradient-accent rounded-lg flex items-center justify-center shadow-glow">
            {type === 'song' ? (
              <Music className="h-8 w-8 text-white" />
            ) : (
              <Video className="h-8 w-8 text-white" />
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg truncate group-hover:text-primary-glow transition-smooth">
                {title}
              </h3>
              <p className="text-muted-foreground truncate">{artist}</p>
            </div>
            <Badge 
              variant="outline" 
              className="border-purple/30 text-primary-glow bg-primary/10 ml-2"
            >
              {type}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {reason}
          </p>

          <Button
            onClick={handlePlay}
            className="w-full bg-primary hover:bg-primary-glow hover:shadow-glow transition-bounce"
            disabled={!link}
          >
            <Play className="h-4 w-4 mr-2" />
            {link ? 'Play Now' : 'Coming Soon'}
            {link && <ExternalLink className="h-4 w-4 ml-2" />}
          </Button>
        </div>
      </div>
    </Card>
  );
}