import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Flame, Trophy, Users } from 'lucide-react';
import { lang } from '../lib/i18n';

const t = {
  en: {
    badge1: '50+ Classes Weekly',
    badge2: 'Award-Winning Coaches',
    badge3: '2,000+ Members',
    headingLine1: 'FORGE YOUR',
    headingHighlight: 'STRONGEST',
    headingLine2: 'SELF',
    subtitle: 'Elite training facility with world-class coaches, cutting-edge equipment, and a community that pushes you beyond your limits.',
    ctaPrimary: 'Get Your Free Week',
    ctaSecondary: 'View Programs',
  },
  ru: {
    badge1: '50+ занятий в неделю',
    badge2: 'Тренеры-чемпионы',
    badge3: '2 000+ участников',
    headingLine1: 'СОЗДАЙ СВОЮ',
    headingHighlight: 'ЛУЧШУЮ',
    headingLine2: 'ВЕРСИЮ',
    subtitle: 'Элитный тренировочный центр с тренерами мирового уровня, современным оборудованием и сообществом, которое выведет тебя за пределы возможного.',
    ctaPrimary: 'Бесплатная неделя',
    ctaSecondary: 'Смотреть программы',
  },
  uk: {
    badge1: '50+ занять на тиждень',
    badge2: 'Тренери-чемпіони',
    badge3: '2 000+ учасників',
    headingLine1: 'СТВОРИ СВОЮ',
    headingHighlight: 'НАЙКРАЩУ',
    headingLine2: 'ВЕРСІЮ',
    subtitle: 'Елітний тренувальний центр зі світовими тренерами, сучасним обладнанням та спільнотою, яка виведе тебе за межі можливого.',
    ctaPrimary: 'Безкоштовний тиждень',
    ctaSecondary: 'Дивитись програми',
  },
}[lang];

const BADGES = [
  { icon: Flame, text: t.badge1 },
  { icon: Trophy, text: t.badge2 },
  { icon: Users, text: t.badge3 },
];

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  /* Parallax background on scroll */
  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px) scale(1.1)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax */}
      <img
        ref={bgRef}
        crossOrigin="anonymous"
        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80"
        alt="Gym interior"
        className="absolute inset-0 w-full h-full object-cover parallax-bg scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/50 to-dark" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-lime/20 rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-lime/15 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-lime/25 rounded-full animate-float" style={{ animationDelay: '0.8s' }} />
        <div className="absolute top-1/2 right-1/4 w-2.5 h-2.5 bg-lime/10 rounded-full animate-float" style={{ animationDelay: '2.2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badges */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-8 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {BADGES.map((badge) => (
            <div
              key={badge.text}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10"
            >
              <badge.icon size={14} className="text-lime" />
              <span className="text-white/70 text-xs font-medium">{badge.text}</span>
            </div>
          ))}
        </div>

        <h1
          className={`font-heading font-bold text-4xl sm:text-5xl lg:text-7xl text-white leading-tight mb-6 transition-all duration-1000 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {t.headingLine1}
          <br />
          <span className="text-shimmer">{t.headingHighlight}</span> {t.headingLine2}
        </h1>

        <p
          className={`text-white/50 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-[500ms] ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {t.subtitle}
        </p>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-[700ms] ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <a
            href="#booking"
            className="px-8 py-3.5 bg-lime text-dark font-bold rounded-lg hover:bg-lime-dark transition-all duration-300 shadow-lg shadow-lime/20 neon-glow"
          >
            {t.ctaPrimary}
          </a>
          <a
            href="#programs"
            className="px-8 py-3.5 border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 hover:border-white/40 transition-all duration-300"
          >
            {t.ctaSecondary}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 delay-[900ms] ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ChevronDown size={24} className="text-lime/40 animate-bounce" />
      </a>
    </section>
  );
}
