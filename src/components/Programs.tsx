import { useEffect, useRef, useState } from 'react';
import { Dumbbell, Flame, Timer, Leaf, Swords, UserCheck } from 'lucide-react';
import { lang } from '../lib/i18n';

const t = {
  en: {
    sectionTag: 'Our Programs',
    heading: 'Train Your Way',
    programs: [
      {
        name: 'Strength & Powerlifting',
        description: 'Build raw strength with periodized programming. Squat, bench, deadlift \u2014 master the fundamentals and hit new PRs every cycle.',
      },
      {
        name: 'HIIT & Conditioning',
        description: 'High-intensity interval training designed to torch fat, build endurance, and transform your body composition in record time.',
      },
      {
        name: 'CrossFit',
        description: 'Constantly varied functional movements at high intensity. Scale-friendly programming for beginners to elite competitors.',
      },
      {
        name: 'Yoga & Mobility',
        description: 'Restore, recover, and prevent injury with expert-led yoga flows and mobility work that complements your training.',
      },
      {
        name: 'Boxing & Kickboxing',
        description: 'Learn striking technique while getting the best cardio workout of your life. Bag work, mitt drills, and sparring sessions.',
      },
      {
        name: 'Personal Training',
        description: 'One-on-one coaching tailored to your goals. Custom programming, nutrition guidance, and accountability from certified experts.',
      },
    ],
  },
  ru: {
    sectionTag: 'Наши программы',
    heading: 'Тренируйся по-своему',
    programs: [
      {
        name: 'Силовые и пауэрлифтинг',
        description: 'Наращивай чистую силу с периодизированными программами. Присед, жим, становая \u2014 освой базу и бей личные рекорды каждый цикл.',
      },
      {
        name: 'HIIT и кондиционинг',
        description: 'Высокоинтенсивные интервальные тренировки для сжигания жира, развития выносливости и трансформации тела в рекордные сроки.',
      },
      {
        name: 'CrossFit',
        description: 'Постоянно меняющиеся функциональные движения с высокой интенсивностью. Программы масштабируются от новичков до элитных атлетов.',
      },
      {
        name: 'Йога и мобильность',
        description: 'Восстановление, профилактика травм и улучшение подвижности с опытными инструкторами \u2014 идеальное дополнение к тренировкам.',
      },
      {
        name: 'Бокс и кикбоксинг',
        description: 'Освой технику ударов и получи лучшую кардио-тренировку в жизни. Работа на мешках, лапах и спарринги.',
      },
      {
        name: 'Персональные тренировки',
        description: 'Индивидуальный коучинг под твои цели. Кастомные программы, рекомендации по питанию и контроль от сертифицированных экспертов.',
      },
    ],
  },
  uk: {
    sectionTag: 'Наші програми',
    heading: 'Тренуйся по-своєму',
    programs: [
      {
        name: 'Силові та пауерліфтинг',
        description: 'Нарощуй чисту силу з періодизованими програмами. Присід, жим, станова \u2014 опануй базу та бий особисті рекорди кожен цикл.',
      },
      {
        name: 'HIIT та кондиціонінг',
        description: 'Високоінтенсивні інтервальні тренування для спалювання жиру, розвитку витривалості та трансформації тіла в рекордні терміни.',
      },
      {
        name: 'CrossFit',
        description: 'Постійно змінювані функціональні рухи з високою інтенсивністю. Програми масштабуються від новачків до елітних атлетів.',
      },
      {
        name: 'Йога та мобільність',
        description: 'Відновлення, профілактика травм та покращення рухливості з досвідченими інструкторами \u2014 ідеальне доповнення до тренувань.',
      },
      {
        name: 'Бокс та кікбоксинг',
        description: 'Опануй техніку ударів та отримай найкраще кардіо-тренування у житті. Робота на мішках, лапах та спаринги.',
      },
      {
        name: 'Персональні тренування',
        description: 'Індивідуальний коучинг під твої цілі. Кастомні програми, рекомендації з харчування та контроль від сертифікованих експертів.',
      },
    ],
  },
}[lang];

const PROGRAM_ICONS = [Dumbbell, Flame, Timer, Leaf, Swords, UserCheck];

const PROGRAM_IMAGES = [
  'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
  'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&q=80',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
  'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&q=80',
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80',
];

export default function Programs() {
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
    <section id="programs" className="py-24 lg:py-32 bg-dark-card" ref={ref}>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.programs.map((prog, idx) => {
            const Icon = PROGRAM_ICONS[idx];
            return (
              <div
                key={prog.name}
                className={`group relative rounded-xl overflow-hidden border border-dark-border hover:border-lime/20 card-hover transition-all duration-500 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: visible ? `${idx * 120}ms` : '0ms',
                  animation: visible ? `${idx % 2 === 0 ? 'slide-in-left' : 'slide-in-right'} 0.7s ease-out ${idx * 120}ms both` : 'none',
                }}
              >
                {/* Image */}
                <div className="h-44 overflow-hidden">
                  <img
                    crossOrigin="anonymous"
                    src={PROGRAM_IMAGES[idx]}
                    alt={prog.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-50 group-hover:brightness-[0.35]"
                  />
                </div>

                {/* Content */}
                <div className="p-5 bg-dark-card">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-lime/10 flex items-center justify-center">
                      <Icon size={16} className="text-lime" />
                    </div>
                    <h3 className="font-heading font-semibold text-white text-sm">{prog.name}</h3>
                  </div>
                  <p className="text-steel text-xs leading-relaxed">{prog.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
