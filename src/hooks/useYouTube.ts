import { useState } from 'react';

interface Song {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  url: string;
  duration: string;
}

// Mock YouTube API since we don't have a real API key
// In production, you would use the actual YouTube Data API
const getMockSongs = (mood: string, artist: string): Song[] => {
  const mockSongs: Song[] = [
    {
      id: '1',
      title: `${mood} Vibes - ${artist}`,
      artist: artist,
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=120&h=120&fit=crop',
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(artist + ' ' + mood + ' songs')}`,
      duration: '3:45'
    },
    {
      id: '2',
      title: `Best of ${artist} - ${mood} Mix`,
      artist: artist,
      thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=120&h=120&fit=crop',
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(artist + ' hits')}`,
      duration: '4:12'
    },
    {
      id: '3',
      title: `${artist} - ${mood} Collection`,
      artist: artist,
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=120&h=120&fit=crop',
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(artist + ' latest songs')}`,
      duration: '3:28'
    },
    {
      id: '4',
      title: `${mood} Mood - ${artist} Special`,
      artist: artist,
      thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=120&h=120&fit=crop',
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(artist + ' ' + mood)}`,
      duration: '4:05'
    },
    {
      id: '5',
      title: `${artist} - ${mood} Playlist`,
      artist: artist,
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=120&h=120&fit=crop',
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(artist + ' playlist')}`,
      duration: '3:52'
    }
  ];

  return mockSongs;
};

export function useYouTube() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchSongs = async (mood: string, artist: string) => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const results = getMockSongs(mood, artist);
      setSongs(results);
      setIsLoading(false);
    }, 1500);
  };

  return {
    songs,
    isLoading,
    searchSongs
  };
}