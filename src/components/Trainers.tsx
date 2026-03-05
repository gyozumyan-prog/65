import { useEffect, useRef, useState } from 'react';
import { useTrainers } from '../hooks/useTrainers';
import { Award } from 'lucide-react';
import { lang } from '../lib/i18n';

const t = {
  en: {
    sectionTag: 'The Team',
    heading: 'Meet Your Coaches',
  },
  ru: {
    sectionTag: 'Команда',
    heading: 'Познакомьтесь с тренерами',
  },
  uk: {
    sectionTag: 'Команда',
    heading: 'Познайомтесь із тренерами',
  },
}[lang];

export default function Trainers() {
  const { trainers } = useTrainers();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="trainers" className="py-24 lg:py-32 bg-dark" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-lime text-[11px] tracking-[0.25em] uppercase font-semibold mb-3">
            {t.sectionTag}
          </p>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-white mb-4">
            {t.heading}
          </h2>
          <div className="lime-line-wide mx-auto" />
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {trainers.map((trainer, idx) => (
            <div
              key={trainer.name}
              className={`group rounded-xl overflow-hidden border border-dark-border hover:border-lime/20 bg-dark-card transition-all duration-500 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: visible ? `${idx * 100}ms` : '0ms' }}
            >
              {/* Photo */}
              <div className="overflow-hidden">
                {trainer.image_url && (
                  <img
                    crossOrigin="anonymous"
                    src={trainer.image_url}
                    alt={trainer.name}
                    className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <span className="inline-block px-2.5 py-0.5 text-[10px] font-semibold bg-lime/10 text-lime rounded-full mb-2">
                  {trainer.specialty}
                </span>
                <h3 className="font-heading font-semibold text-white text-base">{trainer.name}</h3>
                <p className="text-steel text-xs mb-3">{trainer.title}</p>
                <p className="text-steel/70 text-xs leading-relaxed mb-3">{trainer.bio}</p>
                <div className="flex items-center gap-1.5 text-lime/60 text-[10px]">
                  <Award size={10} />
                  <span>{trainer.certifications}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
