import { useEffect, useRef, useState } from 'react';
import { Dumbbell, UserCheck, Heart } from 'lucide-react';
import { lang } from '../lib/i18n';

const t = {
  en: {
    sectionTag: 'About Us',
    headingStart: 'Built for Results, ',
    headingHighlight: 'Not Excuses',
    description: 'Founded in 2018, APEX FITNESS started with a simple belief: everyone deserves access to elite-level training. We\'ve grown from a small garage gym to a 20,000 sq ft facility, but our mission hasn\'t changed \u2014 build stronger humans, inside and out. No mirrors, no ego, just results.',
    pillars: [
      {
        title: 'Elite Equipment',
        text: '20,000 sq ft of premium Rogue, Eleiko, and Concept2 equipment. Everything you need, nothing you don\'t.',
      },
      {
        title: 'Expert Coaches',
        text: 'Nationally certified trainers with competitive backgrounds who actually practice what they teach.',
      },
      {
        title: 'Strong Community',
        text: 'More than a gym \u2014 a tribe of driven individuals who push each other to new personal records every day.',
      },
    ],
  },
  ru: {
    sectionTag: 'О нас',
    headingStart: 'Созданы для результатов, ',
    headingHighlight: 'а не оправданий',
    description: 'APEX FITNESS основан в 2018 году с простой верой: каждый заслуживает доступ к тренировкам элитного уровня. Мы выросли из маленького гаражного зала в площадку на 2 000 кв. м, но наша миссия не изменилась \u2014 создавать сильных людей, изнутри и снаружи. Без понтов, без эго, только результат.',
    pillars: [
      {
        title: 'Элитное оборудование',
        text: '2 000 кв. м первоклассного оборудования Rogue, Eleiko и Concept2. Всё, что нужно, и ничего лишнего.',
      },
      {
        title: 'Профессиональные тренеры',
        text: 'Сертифицированные тренеры с соревновательным опытом, которые сами практикуют то, чему учат.',
      },
      {
        title: 'Сильное сообщество',
        text: 'Больше, чем зал \u2014 команда целеустремлённых людей, которые ежедневно подталкивают друг друга к новым рекордам.',
      },
    ],
  },
  uk: {
    sectionTag: 'Про нас',
    headingStart: 'Створені для результатів, ',
    headingHighlight: 'а не виправдань',
    description: 'APEX FITNESS заснований у 2018 році з простою вірою: кожен заслуговує на доступ до тренувань елітного рівня. Ми виросли з маленького гаражного залу до площадки на 2 000 кв. м, але наша місія не змінилася \u2014 будувати сильних людей, зсередини та ззовні. Без пафосу, без его, тільки результат.',
    pillars: [
      {
        title: 'Елітне обладнання',
        text: '2 000 кв. м першокласного обладнання Rogue, Eleiko та Concept2. Все, що потрібно, і нічого зайвого.',
      },
      {
        title: 'Професійні тренери',
        text: 'Сертифіковані тренери зі змагальним досвідом, які самі практикують те, чому навчають.',
      },
      {
        title: 'Міцна спільнота',
        text: 'Більше, ніж зал \u2014 команда цілеспрямованих людей, які щодня штовхають одне одного до нових рекордів.',
      },
    ],
  },
}[lang];

const PILLAR_ICONS = [Dumbbell, UserCheck, Heart];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 lg:py-32 bg-dark-card" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div
            className={`overflow-hidden rounded-2xl transition-all duration-700 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <img
              crossOrigin="anonymous"
              src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80"
              alt="Gym training floor"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>

          {/* Text */}
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <p className="text-lime text-[11px] tracking-[0.25em] uppercase font-semibold mb-3">
              {t.sectionTag}
            </p>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-white mb-5">
              {t.headingStart}<span className="text-lime">{t.headingHighlight}</span>
            </h2>
            <div className="lime-line mb-6" />
            <p className="text-steel leading-relaxed mb-8">
              {t.description}
            </p>

            <div className="space-y-5">
              {t.pillars.map((p, idx) => {
                const Icon = PILLAR_ICONS[idx];
                return (
                  <div key={p.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-lime/10 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-lime" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-white text-sm mb-1">{p.title}</h4>
                      <p className="text-steel text-sm leading-relaxed">{p.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
