import { useEffect, useRef, useState } from 'react';
import { useReviews } from '../hooks/useReviews';
import { Star, Quote } from 'lucide-react';
import { lang } from '../lib/i18n';

const t = {
  en: {
    sectionTag: 'Member Results',
    heading: 'Real People, Real Transformations',
  },
  ru: {
    sectionTag: 'Результаты участников',
    heading: 'Реальные люди, реальные трансформации',
  },
  uk: {
    sectionTag: 'Результати учасників',
    heading: 'Реальні люди, реальні трансформації',
  },
}[lang];

export default function Testimonials() {
  const { reviews } = useReviews();
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
    <section className="py-24 lg:py-32 bg-dark-card" ref={ref}>
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

        {/* Reviews grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {reviews.map((review, idx) => (
            <div
              key={review.member_name}
              className={`p-6 bg-dark rounded-xl border border-dark-border transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: visible ? `${idx * 100}ms` : '0ms' }}
            >
              <Quote size={24} className="text-lime/15 mb-3" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-lime fill-lime" />
                ))}
              </div>

              {/* Text */}
              <p className="text-white/70 text-sm leading-relaxed mb-5 italic">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Member info */}
              <div className="flex items-center gap-3">
                {review.avatar_url && (
                  <img
                    crossOrigin="anonymous"
                    src={review.avatar_url}
                    alt={review.member_name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="text-white font-semibold text-sm">{review.member_name}</p>
                  {review.program && (
                    <span className="text-lime text-[10px] tracking-[0.1em] uppercase font-medium">
                      {review.program}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
