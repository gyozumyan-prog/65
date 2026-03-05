import { useEffect, useRef, useState } from 'react';
import { lang } from '../lib/i18n';

const t = {
  en: {
    stats: [
      { target: 2000, suffix: '+', label: 'Active Members', prefix: '' },
      { target: 20, suffix: 'K', label: 'Sq Ft Facility', prefix: '' },
      { target: 50, suffix: '+', label: 'Weekly Classes', prefix: '' },
      { target: 15, suffix: '', label: 'Expert Trainers', prefix: '' },
    ],
  },
  ru: {
    stats: [
      { target: 2000, suffix: '+', label: 'Активных участников', prefix: '' },
      { target: 20, suffix: 'K', label: 'Кв. м площадь', prefix: '' },
      { target: 50, suffix: '+', label: 'Занятий в неделю', prefix: '' },
      { target: 15, suffix: '', label: 'Профессиональных тренеров', prefix: '' },
    ],
  },
  uk: {
    stats: [
      { target: 2000, suffix: '+', label: 'Активних учасників', prefix: '' },
      { target: 20, suffix: 'K', label: 'Кв. м площа', prefix: '' },
      { target: 50, suffix: '+', label: 'Занять на тиждень', prefix: '' },
      { target: 15, suffix: '', label: 'Професійних тренерів', prefix: '' },
    ],
  },
}[lang];

type StatType = typeof t.stats[0];

function useCounter(target: number, visible: boolean, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      if (current !== start) {
        start = current;
        setCount(current);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [visible, target, duration]);

  return count;
}

function StatItem({ stat, idx, visible }: { stat: StatType; idx: number; visible: boolean }) {
  const count = useCounter(stat.target, visible, 2000 + idx * 200);

  return (
    <div
      className={`text-center transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: visible ? `${idx * 150}ms` : '0ms' }}
    >
      <p className="font-heading font-bold text-3xl lg:text-5xl text-lime mb-2">
        {stat.prefix}{count.toLocaleString()}{stat.suffix}
      </p>
      <p className="text-steel text-sm tracking-wide">{stat.label}</p>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-dark border-y border-dark-border" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {t.stats.map((stat, idx) => (
            <StatItem key={stat.label} stat={stat} idx={idx} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
