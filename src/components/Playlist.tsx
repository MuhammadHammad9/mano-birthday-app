import { useState, useEffect } from 'react';
import { Music } from 'lucide-react';

interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  popularity: number;
}

export default function Playlist() {
  const [tracks, setTracks] = useState<{ title: string; artist: string; note: string }[]>([
    { title: 'Perfect', artist: 'Ed Sheeran', note: 'Reminds me of our first dance.' },
    { title: 'Lover', artist: 'Taylor Swift', note: 'Because you are my favorite person.' },
    { title: 'All of Me', artist: 'John Legend', note: 'I love all of you, always.' },
    { title: 'Thinking Out Loud', artist: 'Ed Sheeran', note: 'To growing old together.' }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSongs = async () => {
      const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
      const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
      
      if (!clientId || !clientSecret) {
        setLoading(false);
        return;
      }

      try {
        // 1. Get Access Token
        const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
          },
          body: 'grant_type=client_credentials'
        });
        const tokenData = await tokenResponse.json();
        const token = tokenData.access_token;

        if (!token) throw new Error("Failed to authenticate with Spotify");

        // 2. Fetch Playlist Tracks
        const playlistId = '29XEQO1WqbhPru3U7QiUd0';
        const playlistResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const playlistData = await playlistResponse.json();

        if (playlistData && playlistData.items) {
          // 3. Sort by Popularity and take top 5
          const sortedTracks: SpotifyTrack[] = playlistData.items
            .filter((item: any) => item.track)
            .map((item: any) => item.track)
            .sort((a: SpotifyTrack, b: SpotifyTrack) => b.popularity - a.popularity)
            .slice(0, 5);

          // 4. Update state with dynamic tracks
          setTracks(sortedTracks.map(t => ({
            title: t.name,
            artist: t.artists.map(a => a.name).join(', '),
            note: 'One of the most popular songs in this playlist!'
          })));
        }
      } catch (error) {
        console.error("Error fetching Spotify data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSongs();
  }, []);

  return (
    <section id="playlist" className="py-20 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12 animate-on-scroll">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">Our Soundtrack</h2>
        <p className="text-text-secondary">Songs that make me think of you...</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="animate-on-scroll">
          <iframe 
            style={{ borderRadius: '12px' }} 
            src="https://open.spotify.com/embed/playlist/29XEQO1WqbhPru3U7QiUd0?utm_source=generator" 
            width="100%" 
            height="380" 
            frameBorder="0" 
            allowFullScreen 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          ></iframe>
        </div>

        <div className="space-y-6 animate-on-scroll">
          {loading ? (
            <div className="text-center text-primary-light">Loading top songs...</div>
          ) : (
            tracks.map((song, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary-light/10 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-primary-light/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform flex-shrink-0">
                  <Music size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-primary-dark leading-tight">{song.title}</h4>
                  <p className="text-xs text-text-secondary mt-1">{song.artist}</p>
                  <p className="text-xs italic text-primary/70 mt-0.5">{song.note}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
