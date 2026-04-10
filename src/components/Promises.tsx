import { PROMISES } from '../constants';
import { CheckCircle2 } from 'lucide-react';

export default function Promises() {
  return (
    <section id="promises" className="py-20 bg-primary-dark text-white px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Promises to You</h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="space-y-6">
          {PROMISES.map((promise, index) => (
            <div 
              key={promise.id} 
              className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 animate-on-scroll"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CheckCircle2 className="text-accent shrink-0 mt-1" size={24} />
              <p className="text-lg leading-relaxed">{promise.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-on-scroll">
          <p className="text-accent font-handwriting text-3xl mb-4">Happy Birthday, My Love</p>
          <div className="inline-block px-8 py-3 rounded-full border border-accent text-accent font-medium">
            Forever & Always
          </div>
        </div>
      </div>
    </section>
  );
}
