import { useEffect, useRef, useState } from 'react';
import { lang } from '../lib/i18n';

const t = {
  en: {
    sectionTag: 'Weekly Classes',
    heading: 'Class Schedule',
    timeHeader: 'Time',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    sundayNote: 'Sunday: Rest Day \u2014 Gym open for open lifting (7 AM \u2013 12 PM)',
    classNames: {
      Strength: 'Strength',
      HIIT: 'HIIT',
      CrossFit: 'CrossFit',
      Yoga: 'Yoga',
      Boxing: 'Boxing',
    },
  },
  ru: {
    sectionTag: 'Еженедельные занятия',
    heading: 'Расписание занятий',
    timeHeader: 'Время',
    days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    sundayNote: 'Воскресенье: День отдыха \u2014 Зал открыт для свободных тренировок (7:00 \u2013 12:00)',
    classNames: {
      Strength: 'Силовая',
      HIIT: 'HIIT',
      CrossFit: 'CrossFit',
      Yoga: 'Йога',
      Boxing: 'Бокс',
    },
  },
  uk: {
    sectionTag: 'Щотижневі заняття',
    heading: 'Розклад занять',
    timeHeader: 'Час',
    days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    sundayNote: 'Неділя: День відпочинку \u2014 Зал відкритий для вільних тренувань (7:00 \u2013 12:00)',
    classNames: {
      Strength: 'Силове',
      HIIT: 'HIIT',
      CrossFit: 'CrossFit',
      Yoga: 'Йога',
      Boxing: 'Бокс',
    },
  },
}[lang];

const TIMES = ['6:00 AM', '8:00 AM', '10:00 AM', '12:00 PM', '5:00 PM', '7:00 PM'];

type ClassSlot = { name: string; trainer: string } | null;

const GRID: ClassSlot[][] = [
  // Mon
  [
    { name: 'Strength', trainer: 'Ryan' },
    { name: 'HIIT', trainer: 'Jade' },
    { name: 'Yoga', trainer: 'Natasha' },
    null,
    { name: 'CrossFit', trainer: 'Devon' },
    { name: 'Boxing', trainer: 'Ryan' },
  ],
  // Tue
  [
    { name: 'CrossFit', trainer: 'Devon' },
    { name: 'Strength', trainer: 'Ryan' },
    { name: 'HIIT', trainer: 'Jade' },
    { name: 'Yoga', trainer: 'Natasha' },
    { name: 'Boxing', trainer: 'Devon' },
    { name: 'HIIT', trainer: 'Jade' },
  ],
  // Wed
  [
    { name: 'HIIT', trainer: 'Jade' },
    { name: 'CrossFit', trainer: 'Devon' },
    { name: 'Strength', trainer: 'Ryan' },
    null,
    { name: 'Yoga', trainer: 'Natasha' },
    { name: 'Strength', trainer: 'Ryan' },
  ],
  // Thu
  [
    { name: 'Strength', trainer: 'Ryan' },
    { name: 'Boxing', trainer: 'Devon' },
    { name: 'HIIT', trainer: 'Jade' },
    { name: 'CrossFit', trainer: 'Devon' },
    { name: 'Strength', trainer: 'Ryan' },
    { name: 'Yoga', trainer: 'Natasha' },
  ],
  // Fri
  [
    { name: 'CrossFit', trainer: 'Devon' },
    { name: 'HIIT', trainer: 'Jade' },
    { name: 'Yoga', trainer: 'Natasha' },
    null,
    { name: 'Strength', trainer: 'Ryan' },
    { name: 'Boxing', trainer: 'Devon' },
  ],
  // Sat
  [
    { name: 'HIIT', trainer: 'Jade' },
    { name: 'Strength', trainer: 'Ryan' },
    { name: 'CrossFit', trainer: 'Devon' },
    { name: 'Yoga', trainer: 'Natasha' },
    null,
    null,
  ],
];

const CLASS_COLORS: Record<string, string> = {
  Strength: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  HIIT: 'bg-red-500/10 text-red-400 border-red-500/20',
  CrossFit: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Yoga: 'bg-green-500/10 text-green-400 border-green-500/20',
  Boxing: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

export default function Schedule() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="schedule" className="py-24 lg:py-32 bg-dark" ref={ref}>
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

        {/* Table */}
        <div
          className={`overflow-x-auto transition-all duration-700 delay-200 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr>
                <th className="p-3 text-left text-steel text-xs font-medium uppercase tracking-wider w-20">
                  {t.timeHeader}
                </th>
                {t.days.map((day) => (
                  <th key={day} className="p-3 text-center text-lime text-xs font-semibold uppercase tracking-wider">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TIMES.map((time, tIdx) => (
                <tr key={time} className="border-t border-dark-border">
                  <td className="p-3 text-steel text-xs font-medium whitespace-nowrap">{time}</td>
                  {t.days.map((day, dIdx) => {
                    const slot = GRID[dIdx]?.[tIdx] ?? null;
                    const classNameKey = slot?.name as keyof typeof t.classNames;
                    return (
                      <td key={day} className="p-2 text-center">
                        {slot ? (
                          <div className={`inline-block px-3 py-2 rounded-lg border text-xs font-medium ${CLASS_COLORS[slot.name] || 'bg-dark-card text-steel border-dark-border'}`}>
                            <p className="font-semibold">{t.classNames[classNameKey] || slot.name}</p>
                            <p className="text-[10px] opacity-60 mt-0.5">{slot.trainer}</p>
                          </div>
                        ) : (
                          <span className="text-dark-border text-xs">&mdash;</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-steel/50 text-xs mt-6">
          {t.sundayNote}
        </p>
      </div>
    </section>
  );
}
