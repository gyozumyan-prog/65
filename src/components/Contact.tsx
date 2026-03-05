import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { lang } from '../lib/i18n';

const t = {
  en: {
    sectionTag: 'Find Us',
    heading: 'Visit APEX ',
    headingHighlight: 'FITNESS',
    parkingNote: 'Free parking available. Located next to Austin Central Park with easy access from I-35 and MoPac Expressway. First-timers welcome \u2014 no appointment needed for a tour!',
    info: [
      { label: 'Location', value: '4200 Iron Street, Austin, TX 78701' },
      { label: 'Phone', value: '+1 (512) 555-0340' },
      { label: 'Email', value: 'join@apexfitness.com' },
      { label: 'Hours', value: 'Mon\u2013Fri: 5 AM \u2013 10 PM | Sat: 7 AM \u2013 8 PM | Sun: 7 AM \u2013 12 PM' },
    ],
  },
  ru: {
    sectionTag: 'Найти нас',
    heading: 'Посетите APEX ',
    headingHighlight: 'FITNESS',
    parkingNote: 'Бесплатная парковка. Расположены рядом с Austin Central Park с удобным подъездом с I-35 и MoPac Expressway. Новичкам рады \u2014 для экскурсии запись не нужна!',
    info: [
      { label: 'Адрес', value: '4200 Iron Street, Austin, TX 78701' },
      { label: 'Телефон', value: '+1 (512) 555-0340' },
      { label: 'Email', value: 'join@apexfitness.com' },
      { label: 'Часы работы', value: 'Пн\u2013Пт: 5:00 \u2013 22:00 | Сб: 7:00 \u2013 20:00 | Вс: 7:00 \u2013 12:00' },
    ],
  },
  uk: {
    sectionTag: 'Знайти нас',
    heading: 'Відвідайте APEX ',
    headingHighlight: 'FITNESS',
    parkingNote: 'Безкоштовна парковка. Розташовані поруч з Austin Central Park зі зручним під\'їздом з I-35 та MoPac Expressway. Новачкам раді \u2014 для екскурсії запис не потрібен!',
    info: [
      { label: 'Адреса', value: '4200 Iron Street, Austin, TX 78701' },
      { label: 'Телефон', value: '+1 (512) 555-0340' },
      { label: 'Email', value: 'join@apexfitness.com' },
      { label: 'Години роботи', value: 'Пн\u2013Пт: 5:00 \u2013 22:00 | Сб: 7:00 \u2013 20:00 | Нд: 7:00 \u2013 12:00' },
    ],
  },
}[lang];

const INFO_ICONS = [MapPin, Phone, Mail, Clock];

export default function Contact() {
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
    <section id="contact" className="py-24 lg:py-32 bg-dark" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Image */}
          <div
            className={`overflow-hidden rounded-2xl transition-all duration-700 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <img
              crossOrigin="anonymous"
              src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80"
              alt="Gym exterior"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>

          {/* Info */}
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <p className="text-lime text-[11px] tracking-[0.25em] uppercase font-semibold mb-3">
              {t.sectionTag}
            </p>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-white mb-6">
              {t.heading}<span className="text-lime">{t.headingHighlight}</span>
            </h2>
            <div className="lime-line mb-8" />

            <div className="space-y-6">
              {t.info.map((item, idx) => {
                const Icon = INFO_ICONS[idx];
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <Icon size={18} className="text-lime mt-1 shrink-0" />
                    <div>
                      <p className="text-white/30 text-[10px] tracking-[0.15em] uppercase mb-1">{item.label}</p>
                      <p className="text-white/80 text-sm">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-4 border border-lime/10 bg-lime/5 rounded-lg">
              <p className="text-lime/70 text-xs leading-relaxed">
                {t.parkingNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
