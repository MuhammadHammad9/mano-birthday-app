import { Music } from 'lucide-react';

export default function Playlist() {
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
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DX7rOY2tusoIU?utm_source=generator" 
            width="100%" 
            height="380" 
            frameBorder="0" 
            allowFullScreen 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          ></iframe>
        </div>

        <div className="space-y-6 animate-on-scroll">
          {[
            { title: 'Perfect', artist: 'Ed Sheeran', note: 'Reminds me of our first dance.' },
            { title: 'Lover', artist: 'Taylor Swift', note: 'Because you are my favorite person.' },
            { title: 'All of Me', artist: 'John Legend', note: 'I love all of you, always.' },
            { title: 'Thinking Out Loud', artist: 'Ed Sheeran', note: 'To growing old together.' }
          ].map((song, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary-light/10 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-primary-light/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Music size={20} />
              </div>
              <div>
                <h4 className="font-bold text-primary-dark">{song.title}</h4>
                <p className="text-xs text-text-secondary mb-1">{song.artist}</p>
                <p className="text-xs italic text-primary/70">{song.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
