import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Headphones, Star, Users, Music, Play, Heart } from 'lucide-react';
import heroImage from '@/assets/hero-music.jpg';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-primary opacity-80" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-gradient-accent rounded-full shadow-glow">
                <Headphones className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-accent bg-clip-text text-transparent">
              MoodTunes
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed">
              Discover the perfect soundtrack for your emotions. Choose your mood, 
              select your favorite artists, and let us find the perfect songs from YouTube.
            </p>
            
            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-gradient-card backdrop-blur-sm border-primary/30 shadow-purple">
                <CardContent className="p-6 text-center">
                  <Music className="h-8 w-8 text-primary-glow mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Mood-Based Discovery</h3>
                  <p className="text-sm text-muted-foreground">Choose from Happy, Sad, Romantic, Party, Chill, or Workout vibes</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-card backdrop-blur-sm border-primary/30 shadow-purple">
                <CardContent className="p-6 text-center">
                  <Heart className="h-8 w-8 text-primary-glow mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Artist Selection</h3>
                  <p className="text-sm text-muted-foreground">Curated Tamil & Hindi artists to match your taste</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-card backdrop-blur-sm border-primary/30 shadow-purple">
                <CardContent className="p-6 text-center">
                  <Play className="h-8 w-8 text-primary-glow mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">YouTube Integration</h3>
                  <p className="text-sm text-muted-foreground">Stream directly from YouTube with personalized playlists</p>
                </CardContent>
              </Card>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-5 w-5 text-primary-glow mr-2" />
                  <span className="text-2xl font-bold text-primary-glow">4.9</span>
                </div>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-primary-glow mr-2" />
                  <span className="text-2xl font-bold text-primary-glow">50K+</span>
                </div>
                <p className="text-sm text-muted-foreground">Happy Users</p>
              </div>
            </div>

            <Button 
              onClick={() => navigate('/auth')}
              size="lg"
              className="px-12 py-6 text-lg bg-gradient-accent hover:shadow-glow transition-smooth"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;