import { useState } from 'react';
import { MoodInput } from '@/components/MoodInput';
import { RecommendationList } from '@/components/RecommendationList';
import heroImage from '@/assets/hero-music.jpg';
import { Headphones, Star, Users } from 'lucide-react';

interface Recommendation {
  id: string;
  title: string;
  artist: string;
  type: 'song' | 'video';
  reason: string;
  link?: string;
  thumbnail?: string;
}

// Mock data for demonstration
const getMockRecommendations = (mood: string): Recommendation[] => {
  const recommendations: Record<string, Recommendation[]> = {
    happy: [
      {
        id: '1',
        title: 'Happy',
        artist: 'Pharrell Williams',
        type: 'song',
        reason: 'This uplifting anthem perfectly captures pure joy and positivity.',
        link: 'https://www.youtube.com/watch?v=ZbZSe6N_BXs'
      },
      {
        id: '2',
        title: 'Can\'t Stop the Feeling!',
        artist: 'Justin Timberlake',
        type: 'song',
        reason: 'An infectious feel-good track that will boost your mood instantly.',
        link: 'https://www.youtube.com/watch?v=ru0K8uYEZWw'
      },
      {
        id: '3',
        title: 'Good Vibes',
        artist: 'Various Artists',
        type: 'video',
        reason: 'A compilation of feel-good moments to match your happy energy.'
      }
    ],
    sad: [
      {
        id: '4',
        title: 'Someone Like You',
        artist: 'Adele',
        type: 'song',
        reason: 'A beautifully melancholic song that validates your emotions.',
        link: 'https://www.youtube.com/watch?v=hLQl3WQQoQ0'
      },
      {
        id: '5',
        title: 'Mad World',
        artist: 'Gary Jules',
        type: 'song',
        reason: 'A hauntingly beautiful cover that resonates with deeper feelings.'
      },
      {
        id: '6',
        title: 'The Night We Met',
        artist: 'Lord Huron',
        type: 'song',
        reason: 'Perfect for reflecting on memories and processing emotions.'
      }
    ],
    energetic: [
      {
        id: '7',
        title: 'Uptown Funk',
        artist: 'Mark Ronson ft. Bruno Mars',
        type: 'song',
        reason: 'High-energy funk that will get you moving and grooving.',
        link: 'https://www.youtube.com/watch?v=OPf0YbXqDm0'
      },
      {
        id: '8',
        title: 'Thunder',
        artist: 'Imagine Dragons',
        type: 'song',
        reason: 'Powerful beats and inspiring lyrics to fuel your energy.'
      },
      {
        id: '9',
        title: 'Workout Motivation',
        artist: 'Various Artists',
        type: 'video',
        reason: 'High-energy compilation perfect for channeling your enthusiasm.'
      }
    ]
  };

  const moodKey = mood.toLowerCase();
  return recommendations[moodKey] || [
    {
      id: 'default-1',
      title: 'Perfect',
      artist: 'Ed Sheeran',
      type: 'song',
      reason: `A versatile track that complements your ${mood} mood beautifully.`
    },
    {
      id: 'default-2',
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      type: 'song',
      reason: 'A timeless classic that takes you on an emotional journey.',
      link: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ'
    },
    {
      id: 'default-3',
      title: 'Imagine',
      artist: 'John Lennon',
      type: 'song',
      reason: 'A peaceful, reflective song that matches your current state of mind.'
    }
  ];
};

const Index = () => {
  const [currentMood, setCurrentMood] = useState<string>('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleMoodSubmit = async (mood: string) => {
    setIsLoading(true);
    setCurrentMood(mood);
    
    // Simulate API delay
    setTimeout(() => {
      const newRecommendations = getMockRecommendations(mood);
      setRecommendations(newRecommendations);
      setIsLoading(false);
    }, 1500);
  };

  const handleRefresh = () => {
    if (currentMood) {
      handleMoodSubmit(currentMood);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
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
              Discover the perfect soundtrack for your emotions. Share your mood and let AI curate 
              personalized music and video recommendations just for you.
            </p>
            
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
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-2xl mx-auto">
          {!currentMood ? (
            <MoodInput onSubmit={handleMoodSubmit} isLoading={isLoading} />
          ) : (
            <RecommendationList
              mood={currentMood}
              recommendations={recommendations}
              onRefresh={handleRefresh}
              isLoading={isLoading}
            />
          )}
        </div>

        {/* Feature Preview for Auth & Payment */}
        {currentMood && (
          <div className="mt-20 text-center max-w-3xl mx-auto">
            <div className="p-8 bg-gradient-secondary border border-purple/20 rounded-2xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Want More Personalized Recommendations?</h3>
              <p className="text-muted-foreground mb-6">
                Sign up for unlimited mood recommendations, playlist creation, and premium features including 
                Spotify integration and advanced AI recommendations.
              </p>
              <div className="text-sm text-muted-foreground">
                🔒 Authentication & 💳 Payment features coming soon with Supabase integration
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;