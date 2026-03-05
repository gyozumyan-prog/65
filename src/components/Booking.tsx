import { useEffect, useRef, useState } from 'react';
import { useTrainers } from '../hooks/useTrainers';
import { useClassBookings } from '../hooks/useClassBookings';
import {
  Dumbbell, Flame, Timer, Leaf, Swords, UserCheck,
  ChevronLeft, ChevronRight, Check, User, CalendarDays,
  ClipboardList, Sparkles, Award,
} from 'lucide-react';
import { lang } from '../lib/i18n';

const t = {
  en: {
    sectionTag: 'Get Started',
    heading: 'Book a Free Trial Class',
    steps: [
      { label: 'Program', icon: 'ClipboardList' },
      { label: 'Trainer', icon: 'User' },
      { label: 'Date & Time', icon: 'CalendarDays' },
      { label: 'Details', icon: 'Sparkles' },
    ],
    // Step 1
    chooseProgram: 'Choose Your Program',
    chooseProgramDesc: 'Select the class type you\'d like to try',
    programNames: [
      'Strength & Powerlifting',
      'HIIT & Conditioning',
      'CrossFit',
      'Yoga & Mobility',
      'Boxing & Kickboxing',
      'Personal Training',
    ],
    // Step 2
    pickTrainer: 'Pick a Trainer',
    pickTrainerDesc: 'Choose your coach or let us match you',
    anyAvailable: 'Any Available',
    anyAvailableDesc: 'We\'ll match you with the best coach',
    // Step 3
    pickDateTime: 'Pick Date & Time',
    pickDateTimeDesc: 'Select when you\'d like to come in',
    dateLabel: 'Date',
    timeLabel: 'Time',
    dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    // Step 4
    bookingSummary: 'Booking Summary',
    summaryProgram: 'Program',
    summaryTrainer: 'Trainer',
    summaryDate: 'Date',
    summaryTime: 'Time',
    summaryPrice: 'Price',
    freeTrial: 'FREE Trial',
    yourInfo: 'Your Information',
    fullName: 'Full Name *',
    email: 'Email *',
    phone: 'Phone *',
    membershipInterest: 'Membership Interest',
    selectOptional: 'Select (optional)',
    fitnessGoals: 'Fitness Goals',
    goalsPlaceholder: 'What are you looking to achieve?',
    membershipOptions: ['Basic ($29/mo)', 'Pro ($59/mo)', 'Elite ($99/mo)', 'Just Trying Out'],
    namePlaceholder: 'John Doe',
    emailPlaceholder: 'john@example.com',
    phonePlaceholder: '+1 (555) 000-0000',
    // Navigation
    back: 'Back',
    continue: 'Continue',
    booking: 'Booking...',
    confirmBooking: 'Confirm Booking',
    // Success
    successTitle: 'You\'re Booked!',
    successConfirmed: 'Your trial class is confirmed for',
    successAt: 'at',
    successEmail: 'We\'ll send a confirmation to',
    successBring: 'Bring workout clothes, water, and your A-game!',
    bookAnother: 'Book Another Class',
  },
  ru: {
    sectionTag: 'Начать',
    heading: 'Запишись на бесплатное пробное занятие',
    steps: [
      { label: 'Программа', icon: 'ClipboardList' },
      { label: 'Тренер', icon: 'User' },
      { label: 'Дата и время', icon: 'CalendarDays' },
      { label: 'Детали', icon: 'Sparkles' },
    ],
    // Step 1
    chooseProgram: 'Выберите программу',
    chooseProgramDesc: 'Выберите тип занятия, которое хотите попробовать',
    programNames: [
      'Силовые и пауэрлифтинг',
      'HIIT и кондиционинг',
      'CrossFit',
      'Йога и мобильность',
      'Бокс и кикбоксинг',
      'Персональные тренировки',
    ],
    // Step 2
    pickTrainer: 'Выберите тренера',
    pickTrainerDesc: 'Выберите тренера или мы подберём вам лучшего',
    anyAvailable: 'Любой доступный',
    anyAvailableDesc: 'Мы подберём лучшего тренера для вас',
    // Step 3
    pickDateTime: 'Выберите дату и время',
    pickDateTimeDesc: 'Выберите, когда вам удобно прийти',
    dateLabel: 'Дата',
    timeLabel: 'Время',
    dayNames: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    monthNames: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    // Step 4
    bookingSummary: 'Итоги записи',
    summaryProgram: 'Программа',
    summaryTrainer: 'Тренер',
    summaryDate: 'Дата',
    summaryTime: 'Время',
    summaryPrice: 'Цена',
    freeTrial: 'БЕСПЛАТНО',
    yourInfo: 'Ваши данные',
    fullName: 'Полное имя *',
    email: 'Email *',
    phone: 'Телефон *',
    membershipInterest: 'Интерес к членству',
    selectOptional: 'Выберите (опционально)',
    fitnessGoals: 'Фитнес-цели',
    goalsPlaceholder: 'Чего вы хотите достичь?',
    membershipOptions: ['Basic ($29/мес)', 'Pro ($59/мес)', 'Elite ($99/мес)', 'Просто пробую'],
    namePlaceholder: 'Иван Иванов',
    emailPlaceholder: 'ivan@example.com',
    phonePlaceholder: '+7 (999) 000-0000',
    // Navigation
    back: 'Назад',
    continue: 'Продолжить',
    booking: 'Записываем...',
    confirmBooking: 'Подтвердить запись',
    // Success
    successTitle: 'Вы записаны!',
    successConfirmed: 'Ваше пробное занятие подтверждено на',
    successAt: 'в',
    successEmail: 'Мы отправим подтверждение на',
    successBring: 'Возьмите спортивную одежду, воду и боевой настрой!',
    bookAnother: 'Записаться ещё',
  },
  uk: {
    sectionTag: 'Почати',
    heading: 'Запишись на безкоштовне пробне заняття',
    steps: [
      { label: 'Програма', icon: 'ClipboardList' },
      { label: 'Тренер', icon: 'User' },
      { label: 'Дата і час', icon: 'CalendarDays' },
      { label: 'Деталі', icon: 'Sparkles' },
    ],
    // Step 1
    chooseProgram: 'Оберіть програму',
    chooseProgramDesc: 'Оберіть тип заняття, яке хочете спробувати',
    programNames: [
      'Силові та пауерліфтинг',
      'HIIT та кондиціонінг',
      'CrossFit',
      'Йога та мобільність',
      'Бокс та кікбоксинг',
      'Персональні тренування',
    ],
    // Step 2
    pickTrainer: 'Оберіть тренера',
    pickTrainerDesc: 'Оберіть тренера або ми підберемо найкращого',
    anyAvailable: 'Будь-який доступний',
    anyAvailableDesc: 'Ми підберемо найкращого тренера для вас',
    // Step 3
    pickDateTime: 'Оберіть дату і час',
    pickDateTimeDesc: 'Оберіть, коли вам зручно прийти',
    dateLabel: 'Дата',
    timeLabel: 'Час',
    dayNames: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    monthNames: ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'],
    // Step 4
    bookingSummary: 'Підсумки запису',
    summaryProgram: 'Програма',
    summaryTrainer: 'Тренер',
    summaryDate: 'Дата',
    summaryTime: 'Час',
    summaryPrice: 'Ціна',
    freeTrial: 'БЕЗКОШТОВНО',
    yourInfo: 'Ваші дані',
    fullName: 'Повне ім\'я *',
    email: 'Email *',
    phone: 'Телефон *',
    membershipInterest: 'Цікавить членство',
    selectOptional: 'Оберіть (опціонально)',
    fitnessGoals: 'Фітнес-цілі',
    goalsPlaceholder: 'Чого ви хочете досягти?',
    membershipOptions: ['Basic ($29/міс)', 'Pro ($59/міс)', 'Elite ($99/міс)', 'Просто пробую'],
    namePlaceholder: 'Іван Іванов',
    emailPlaceholder: 'ivan@example.com',
    phonePlaceholder: '+380 (99) 000-0000',
    // Navigation
    back: 'Назад',
    continue: 'Продовжити',
    booking: 'Записуємо...',
    confirmBooking: 'Підтвердити запис',
    // Success
    successTitle: 'Вас записано!',
    successConfirmed: 'Ваше пробне заняття підтверджено на',
    successAt: 'о',
    successEmail: 'Ми надішлемо підтвердження на',
    successBring: 'Візьміть спортивний одяг, воду та бойовий настрій!',
    bookAnother: 'Записатися ще',
  },
}[lang];

/* ── Program data ─────────────────────────── */
const PROGRAM_ICONS = [Dumbbell, Flame, Timer, Leaf, Swords, UserCheck];
const PROGRAM_COLORS = [
  'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'bg-red-500/10 text-red-400 border-red-500/20',
  'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'bg-green-500/10 text-green-400 border-green-500/20',
  'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'bg-teal-500/10 text-teal-400 border-teal-500/20',
];

const STEP_ICONS = [ClipboardList, User, CalendarDays, Sparkles];

/* ── Time slots (1hr, 6AM-9PM) ────────────── */
const TIME_SLOTS: string[] = [];
for (let h = 6; h <= 21; h++) {
  TIME_SLOTS.push(`${h.toString().padStart(2, '0')}:00`);
}

/* ── Helper: 14 days from tomorrow (skip Sun) */
function getNext14Days(): Date[] {
  const days: Date[] = [];
  const now = new Date();
  for (let i = 1; days.length < 14; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    if (d.getDay() !== 0) days.push(d);
  }
  return days;
}

function formatDate(d: Date) {
  return `${t.monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

/* ══════════════════════════════════════════════
   BOOKING COMPONENT
   ══════════════════════════════════════════════ */
export default function Booking() {
  const { trainers } = useTrainers();
  const { submit, submitting, success, error, reset } = useClassBookings();

  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [days] = useState(getNext14Days);

  const [form, setForm] = useState({
    class_type: '',
    trainer_name: '',
    date: '',
    time: '',
    member_name: '',
    email: '',
    phone: '',
    membership_interest: '',
    goals: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const set = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const canNext = (): boolean => {
    if (step === 1) return !!form.class_type;
    if (step === 2) return true;
    if (step === 3) return !!form.date && !!form.time;
    if (step === 4) return !!form.member_name && !!form.email && !!form.phone;
    return false;
  };

  const handleSubmit = async () => {
    await submit({
      ...form,
      trainer_name: form.trainer_name || t.anyAvailable,
    });
  };

  /* ── Success state ─────────────────────── */
  if (success) {
    return (
      <section id="booking" className="py-24 lg:py-32 bg-dark-card" ref={ref}>
        <div className="max-w-lg mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-lime rounded-full flex items-center justify-center mx-auto mb-5">
            <Check size={28} className="text-dark" />
          </div>
          <h3 className="font-heading font-bold text-2xl text-white mb-3">
            {t.successTitle}
          </h3>
          <p className="text-steel text-sm mb-2">
            {t.successConfirmed}{' '}
            <span className="font-semibold text-white">{form.date}</span> {t.successAt}{' '}
            <span className="font-semibold text-white">{form.time}</span>.
          </p>
          <p className="text-steel/60 text-sm mb-6">
            {t.successEmail} {form.email}. {t.successBring}
          </p>
          <button
            onClick={() => {
              reset();
              setStep(1);
              setForm({
                class_type: '', trainer_name: '', date: '', time: '',
                member_name: '', email: '', phone: '', membership_interest: '', goals: '',
              });
            }}
            className="px-6 py-2.5 bg-lime text-dark text-sm font-bold rounded-lg hover:bg-lime-dark transition-colors"
          >
            {t.bookAnother}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-24 lg:py-32 bg-dark-card" ref={ref}>
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-10 transition-all duration-700 ${
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

        {/* Wizard card */}
        <div
          className={`bg-dark rounded-2xl border border-dark-border overflow-hidden transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Step indicator */}
          <div className="flex border-b border-dark-border">
            {t.steps.map((s, idx) => {
              const StepIcon = STEP_ICONS[idx];
              const stepNum = idx + 1;
              const isActive = step === stepNum;
              const isCompleted = step > stepNum;
              return (
                <button
                  key={s.label}
                  onClick={() => { if (isCompleted) setStep(stepNum); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 text-xs font-semibold transition-all border-b-2 ${
                    isActive
                      ? 'border-lime text-lime bg-lime/5'
                      : isCompleted
                        ? 'border-lime/30 text-lime/50 cursor-pointer hover:bg-lime/5'
                        : 'border-transparent text-steel/30'
                  }`}
                >
                  {isCompleted ? (
                    <div className="w-5 h-5 rounded-full bg-lime flex items-center justify-center">
                      <Check size={10} className="text-dark" />
                    </div>
                  ) : (
                    <StepIcon size={14} />
                  )}
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              );
            })}
          </div>

          {/* Step content */}
          <div className="p-6 lg:p-8 min-h-[400px]">
            {/* ── Step 1: Program ─────────────── */}
            {step === 1 && (
              <div>
                <h3 className="font-heading font-semibold text-white text-lg mb-1">
                  {t.chooseProgram}
                </h3>
                <p className="text-steel text-sm mb-6">
                  {t.chooseProgramDesc}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {t.programNames.map((name, idx) => {
                    const Icon = PROGRAM_ICONS[idx];
                    const selected = form.class_type === name;
                    return (
                      <button
                        key={name}
                        onClick={() => set('class_type', name)}
                        className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                          selected
                            ? 'border-lime bg-lime/5'
                            : 'border-dark-border hover:border-lime/20'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg border ${PROGRAM_COLORS[idx]} flex items-center justify-center mb-3`}>
                          <Icon size={18} />
                        </div>
                        <p className="font-heading font-semibold text-white text-sm">{name}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Step 2: Trainer ────────────── */}
            {step === 2 && (
              <div>
                <h3 className="font-heading font-semibold text-white text-lg mb-1">
                  {t.pickTrainer}
                </h3>
                <p className="text-steel text-sm mb-6">
                  {t.pickTrainerDesc}
                </p>

                <button
                  onClick={() => set('trainer_name', '')}
                  className={`w-full p-4 rounded-xl border-2 text-left mb-3 transition-all duration-200 ${
                    form.trainer_name === ''
                      ? 'border-lime bg-lime/5'
                      : 'border-dark-border hover:border-lime/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-lime/10 flex items-center justify-center">
                      <User size={18} className="text-lime" />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-white text-sm">{t.anyAvailable}</p>
                      <p className="text-steel text-xs">{t.anyAvailableDesc}</p>
                    </div>
                  </div>
                </button>

                <div className="space-y-3">
                  {trainers.map((tr) => {
                    const selected = form.trainer_name === tr.name;
                    return (
                      <button
                        key={tr.name}
                        onClick={() => set('trainer_name', tr.name)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                          selected
                            ? 'border-lime bg-lime/5'
                            : 'border-dark-border hover:border-lime/20'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          {tr.image_url && (
                            <img
                              crossOrigin="anonymous"
                              src={tr.image_url}
                              alt={tr.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-heading font-semibold text-white text-sm">{tr.name}</p>
                            <p className="text-steel text-xs">{tr.title}</p>
                            <div className="flex items-center gap-1.5 mt-1 text-lime/50 text-[10px]">
                              <Award size={10} />
                              <span>{tr.certifications}</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Step 3: Date & Time ────────── */}
            {step === 3 && (
              <div>
                <h3 className="font-heading font-semibold text-white text-lg mb-1">
                  {t.pickDateTime}
                </h3>
                <p className="text-steel text-sm mb-6">
                  {t.pickDateTimeDesc}
                </p>

                <p className="text-steel text-xs font-semibold uppercase tracking-wider mb-3">{t.dateLabel}</p>
                <div className="flex gap-2 overflow-x-auto pb-3 mb-6">
                  {days.map((d) => {
                    const key = d.toISOString().split('T')[0];
                    const selected = form.date === formatDate(d);
                    return (
                      <button
                        key={key}
                        onClick={() => set('date', formatDate(d))}
                        className={`flex-shrink-0 w-16 py-3 rounded-xl border-2 text-center transition-all duration-200 ${
                          selected
                            ? 'border-lime bg-lime text-dark'
                            : 'border-dark-border hover:border-lime/20'
                        }`}
                      >
                        <p className={`text-[10px] font-medium mb-1 ${selected ? 'text-dark/60' : 'text-steel/50'}`}>
                          {t.dayNames[d.getDay()]}
                        </p>
                        <p className={`text-lg font-bold ${selected ? 'text-dark' : 'text-white'}`}>
                          {d.getDate()}
                        </p>
                        <p className={`text-[10px] ${selected ? 'text-dark/50' : 'text-steel/30'}`}>
                          {t.monthNames[d.getMonth()]}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <p className="text-steel text-xs font-semibold uppercase tracking-wider mb-3">{t.timeLabel}</p>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {TIME_SLOTS.map((ts) => {
                    const selected = form.time === ts;
                    return (
                      <button
                        key={ts}
                        onClick={() => set('time', ts)}
                        className={`py-2.5 rounded-lg border text-xs font-medium transition-all duration-200 ${
                          selected
                            ? 'border-lime bg-lime text-dark'
                            : 'border-dark-border text-steel hover:border-lime/20'
                        }`}
                      >
                        {ts}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Step 4: Details ────────────── */}
            {step === 4 && (
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Summary */}
                <div className="bg-dark-card rounded-xl p-5 border border-dark-border h-fit">
                  <h4 className="font-heading font-semibold text-white text-sm mb-4">
                    {t.bookingSummary}
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-steel">{t.summaryProgram}</span>
                      <span className="text-white font-medium">{form.class_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-steel">{t.summaryTrainer}</span>
                      <span className="text-white font-medium">{form.trainer_name || t.anyAvailable}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-steel">{t.summaryDate}</span>
                      <span className="text-white font-medium">{form.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-steel">{t.summaryTime}</span>
                      <span className="text-white font-medium">{form.time}</span>
                    </div>
                    <div className="border-t border-dark-border pt-3 mt-3">
                      <div className="flex justify-between">
                        <span className="text-steel">{t.summaryPrice}</span>
                        <span className="text-lime font-bold">{t.freeTrial}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div>
                  <h4 className="font-heading font-semibold text-white text-sm mb-4">
                    {t.yourInfo}
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-steel text-xs font-medium mb-1 block">{t.fullName}</label>
                      <input
                        type="text"
                        value={form.member_name}
                        onChange={(e) => set('member_name', e.target.value)}
                        placeholder={t.namePlaceholder}
                        className="w-full px-4 py-2.5 bg-dark-card border border-dark-border rounded-lg text-sm text-white placeholder-steel/40 focus:outline-none focus:border-lime/40 focus:ring-2 focus:ring-lime/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-steel text-xs font-medium mb-1 block">{t.email}</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => set('email', e.target.value)}
                        placeholder={t.emailPlaceholder}
                        className="w-full px-4 py-2.5 bg-dark-card border border-dark-border rounded-lg text-sm text-white placeholder-steel/40 focus:outline-none focus:border-lime/40 focus:ring-2 focus:ring-lime/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-steel text-xs font-medium mb-1 block">{t.phone}</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => set('phone', e.target.value)}
                        placeholder={t.phonePlaceholder}
                        className="w-full px-4 py-2.5 bg-dark-card border border-dark-border rounded-lg text-sm text-white placeholder-steel/40 focus:outline-none focus:border-lime/40 focus:ring-2 focus:ring-lime/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-steel text-xs font-medium mb-1 block">{t.membershipInterest}</label>
                      <select
                        value={form.membership_interest}
                        onChange={(e) => set('membership_interest', e.target.value)}
                        className="w-full px-4 py-2.5 bg-dark-card border border-dark-border rounded-lg text-sm text-white focus:outline-none focus:border-lime/40 focus:ring-2 focus:ring-lime/10 transition-all"
                      >
                        <option value="">{t.selectOptional}</option>
                        {t.membershipOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-steel text-xs font-medium mb-1 block">{t.fitnessGoals}</label>
                      <textarea
                        value={form.goals}
                        onChange={(e) => set('goals', e.target.value)}
                        placeholder={t.goalsPlaceholder}
                        rows={3}
                        className="w-full px-4 py-2.5 bg-dark-card border border-dark-border rounded-lg text-sm text-white placeholder-steel/40 focus:outline-none focus:border-lime/40 focus:ring-2 focus:ring-lime/10 transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between px-6 lg:px-8 py-4 border-t border-dark-border">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                step === 1
                  ? 'text-steel/20 cursor-not-allowed'
                  : 'text-steel hover:text-white hover:bg-dark-card'
              }`}
              disabled={step === 1}
            >
              <ChevronLeft size={16} />
              {t.back}
            </button>

            {error && (
              <p className="text-red-400 text-xs">{error}</p>
            )}

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canNext()}
                className={`flex items-center gap-1.5 px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${
                  canNext()
                    ? 'bg-lime text-dark hover:bg-lime-dark'
                    : 'bg-dark-border text-steel/30 cursor-not-allowed'
                }`}
              >
                {t.continue}
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canNext() || submitting}
                className={`flex items-center gap-2 px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${
                  canNext() && !submitting
                    ? 'bg-lime text-dark hover:bg-lime-dark'
                    : 'bg-dark-border text-steel/30 cursor-not-allowed'
                }`}
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-dark/20 border-t-dark rounded-full animate-spin" />
                    {t.booking}
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    {t.confirmBooking}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
