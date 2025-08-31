import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserMenu } from '@/components/auth/UserMenu';
import { ChatMoodInput } from '@/components/ChatMoodInput';
import { ArtistSelector } from '@/components/ArtistSelector';
import { SongList } from '@/components/SongList';
import { useAuth } from '@/contexts/AuthContext';
import { useYouTube } from '@/hooks/useYouTube';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Star, ArrowLeft } from 'lucide-react';

type AppStep = 'mood' | 'artist' | 'songs';

const Index = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<AppStep>('mood');
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [selectedArtist, setSelectedArtist] = useState<string>('');
  const { songs, isLoading, searchSongs } = useYouTube();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setCurrentStep('artist');
  };

  const handleArtistSelect = (artist: string) => {
    setSelectedArtist(artist);
    setCurrentStep('songs');
    searchSongs(selectedMood, artist);
  };

  const handleBackToMood = () => {
    setCurrentStep('mood');
    setSelectedMood('');
    setSelectedArtist('');
  };

  const handleBackToArtist = () => {
    setCurrentStep('artist');
    setSelectedArtist('');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
        <Card className="bg-card/90 backdrop-blur-sm border-primary/20 p-8">
          <CardContent className="flex items-center space-x-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="text-foreground">Loading...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-card/90 backdrop-blur-sm border-primary/20">
          <CardContent className="text-center space-y-6 pt-6">
            <h2 className="text-2xl font-bold text-foreground">Welcome to MoodTunes</h2>
            <p className="text-muted-foreground">Please sign in to access your personalized music experience.</p>
            <Button 
              onClick={() => navigate('/auth')}
              className="w-full bg-gradient-accent text-white hover:opacity-90"
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-card backdrop-blur-md border-b border-primary/30 shadow-deep">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {currentStep !== 'mood' && (
              <Button
                onClick={currentStep === 'artist' ? handleBackToMood : handleBackToArtist}
                variant="ghost"
                size="sm"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            <h1 className="text-2xl font-bold bg-gradient-accent bg-clip-text text-transparent">
              MoodTunes
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary-glow" />
              <span className="text-sm font-medium text-primary-glow">Premium</span>
            </div>
            <UserMenu />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {currentStep === 'mood' && (
            <ChatMoodInput onMoodSelect={handleMoodSelect} />
          )}
          
          {currentStep === 'artist' && (
            <ArtistSelector onArtistSelect={handleArtistSelect} />
          )}
          
          {currentStep === 'songs' && (
            <SongList 
              songs={songs}
              mood={selectedMood}
              artist={selectedArtist}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;