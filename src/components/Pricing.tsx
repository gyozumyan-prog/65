import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { lang } from '../lib/i18n';

const t = {
  en: {
    sectionTag: 'Membership',
    heading: 'Simple, Honest Pricing',
    perMonth: '/month',
    getStarted: 'Get Started',
    mostPopular: 'Most Popular',
    plans: [
      {
        name: 'Basic',
        description: 'Perfect for getting started',
        features: [
          'Full gym access',
          'Locker room & showers',
          'Basic equipment area',
          '2 group classes / week',
          'Open gym hours',
        ],
      },
      {
        name: 'Pro',
        description: 'Most popular choice',
        features: [
          'Everything in Basic',
          'Unlimited group classes',
          'Sauna & steam room',
          'Custom nutrition plan',
          '1 PT session / month',
          'InBody scan monthly',
        ],
      },
      {
        name: 'Elite',
        description: 'For the dedicated athlete',
        features: [
          'Everything in Pro',
          'Unlimited personal training',
          'Priority class booking',
          'Recovery suite access',
          '2 guest passes / month',
          'Competition prep support',
        ],
      },
    ],
  },
  ru: {
    sectionTag: 'Членство',
    heading: 'Простые и честные цены',
    perMonth: '/мес',
    getStarted: 'Начать',
    mostPopular: 'Популярный',
    plans: [
      {
        name: 'Basic',
        description: 'Идеально для старта',
        features: [
          'Полный доступ в зал',
          'Раздевалки и душевые',
          'Базовая зона оборудования',
          '2 групповых занятия / неделя',
          'Свободные часы зала',
        ],
      },
      {
        name: 'Pro',
        description: 'Самый популярный выбор',
        features: [
          'Всё из Basic',
          'Безлимитные групповые занятия',
          'Сауна и парная',
          'Индивидуальный план питания',
          '1 персональная тренировка / мес',
          'InBody-сканирование ежемесячно',
        ],
      },
      {
        name: 'Elite',
        description: 'Для преданного атлета',
        features: [
          'Всё из Pro',
          'Безлимитные персональные тренировки',
          'Приоритетная запись на занятия',
          'Доступ в зону восстановления',
          '2 гостевых пропуска / мес',
          'Поддержка подготовки к соревнованиям',
        ],
      },
    ],
  },
  uk: {
    sectionTag: 'Членство',
    heading: 'Прості та чесні ціни',
    perMonth: '/міс',
    getStarted: 'Почати',
    mostPopular: 'Популярний',
    plans: [
      {
        name: 'Basic',
        description: 'Ідеально для старту',
        features: [
          'Повний доступ до залу',
          'Роздягальні та душові',
          'Базова зона обладнання',
          '2 групових заняття / тиждень',
          'Вільні години залу',
        ],
      },
      {
        name: 'Pro',
        description: 'Найпопулярніший вибір',
        features: [
          'Все з Basic',
          'Безлімітні групові заняття',
          'Сауна та парна',
          'Індивідуальний план харчування',
          '1 персональне тренування / міс',
          'InBody-сканування щомісяця',
        ],
      },
      {
        name: 'Elite',
        description: 'Для відданого атлета',
        features: [
          'Все з Pro',
          'Безлімітні персональні тренування',
          'Пріоритетний запис на заняття',
          'Доступ до зони відновлення',
          '2 гостьових перепустки / міс',
          'Підтримка підготовки до змагань',
        ],
      },
    ],
  },
}[lang];

const PLAN_PRICES = [29, 59, 99];
const PLAN_HIGHLIGHTED = [false, true, false];

export default function Pricing() {
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
    <section id="pricing" className="py-24 lg:py-32 bg-dark-card" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
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

        {/* Plans grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {t.plans.map((plan, idx) => {
            const highlighted = PLAN_HIGHLIGHTED[idx];
            const price = PLAN_PRICES[idx];
            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-6 card-hover transition-all duration-700 ${
                  highlighted
                    ? 'border-lime bg-dark border-2 glow-border'
                    : 'border-dark-border bg-dark'
                } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{
                  transitionDelay: visible ? `${idx * 150}ms` : '0ms',
                  animation: visible ? `scale-up 0.6s ease-out ${idx * 150}ms both` : 'none',
                }}
              >
                {highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-lime text-dark text-[10px] font-bold rounded-full uppercase tracking-wider">
                    {t.mostPopular}
                  </div>
                )}

                <h3 className="font-heading font-bold text-white text-xl mb-1">{plan.name}</h3>
                <p className="text-steel text-xs mb-5">{plan.description}</p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-heading font-bold text-4xl text-white">${price}</span>
                  <span className="text-steel text-sm">{t.perMonth}</span>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2.5">
                      <Check size={14} className="text-lime shrink-0" />
                      <span className="text-steel text-sm">{feat}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#booking"
                  className={`block text-center py-3 rounded-lg font-semibold text-sm transition-colors duration-300 ${
                    highlighted
                      ? 'bg-lime text-dark hover:bg-lime-dark'
                      : 'bg-dark-card border border-dark-border text-white hover:border-lime/30'
                  }`}
                >
                  {t.getStarted}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
