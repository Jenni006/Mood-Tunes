import { RecommendationCard } from './RecommendationCard';
import { Music, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Recommendation {
  id: string;
  title: string;
  artist: string;
  type: 'song' | 'video';
  reason: string;
  link?: string;
  thumbnail?: string;
}

interface RecommendationListProps {
  mood: string;
  recommendations: Recommendation[];
  onRefresh: () => void;
  isLoading?: boolean;
}

export function RecommendationList({ 
  mood, 
  recommendations, 
  onRefresh, 
  isLoading = false 
}: RecommendationListProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-accent rounded-full shadow-glow animate-pulse">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-2">
          Perfect for your <span className="text-primary-glow">{mood}</span> mood
        </h2>
        <p className="text-muted-foreground mb-6">
          Here are {recommendations.length} carefully selected recommendations just for you
        </p>
        <Button
          onClick={onRefresh}
          variant="outline"
          className="border-purple/30 hover:bg-primary/20 hover:border-primary transition-smooth"
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Get New Recommendations
        </Button>
      </div>

      <div className="grid gap-4">
        {recommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
          />
        ))}
      </div>

      {recommendations.length === 0 && (
        <div className="text-center py-12">
          <Music className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No recommendations yet</h3>
          <p className="text-muted-foreground">
            Share your mood to get personalized music and video suggestions
          </p>
        </div>
      )}
    </div>
  );
}