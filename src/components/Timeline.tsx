import { TIMELINE } from '../constants';

export default function Timeline() {
  return (
    <section id="timeline" className="py-20 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-16 animate-on-scroll">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">Our Journey</h2>
        <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
      </div>

      <div className="relative border-l-2 border-primary-light ml-4 md:ml-0 md:left-1/2">
        {TIMELINE.map((event, index) => (
          <div 
            key={event.id} 
            className={`relative mb-12 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right md:left-[-50%]' : 'md:pl-12 md:left-0'} animate-on-scroll`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            {/* Dot */}
            <div className="absolute top-0 left-[-9px] md:left-auto md:right-[-9px] w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm z-10" 
                 style={index % 2 !== 0 ? { left: '-9px' } : {}}></div>
            
            <div className={`bg-card p-6 rounded-2xl border border-primary-light/30 shadow-sm inline-block w-full`}>
              <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">{event.date}</span>
              <h3 className="text-xl font-bold text-primary-dark mb-2">{event.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
