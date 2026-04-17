import { REASONS } from '../constants';
import { Heart } from 'lucide-react';

export default function Reasons() {
  return (
    <section id="reasons" className="py-20 bg-primary-light/10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">Reasons I Love You</h2>
          <p className="text-text-secondary italic">Just a few of the million reasons...</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {REASONS.map((reason, index) => (
            <div
              key={reason.id}
              className="bg-card rounded-2xl border border-primary-light/30 overflow-hidden shadow-sm hover:shadow-md transition-shadow animate-on-scroll"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {reason.imageUrl && (
                <div className="h-48 overflow-hidden">
                  <img src={reason.imageUrl} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              )}
              <div className="p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-light/20 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold">{index + 1}</span>
                </div>
                <div>
                  <p className="text-text-primary leading-relaxed font-medium">{reason.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center animate-on-scroll">
          <Heart className="text-primary w-12 h-12 mx-auto fill-primary opacity-20" />
        </div>
      </div>
    </section>
  );
}
