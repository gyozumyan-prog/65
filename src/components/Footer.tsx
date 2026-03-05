import { Zap } from 'lucide-react';
import { lang } from '../lib/i18n';

const t = {
  en: {
    tagline: 'Elite training facility where results are earned, not given. Your strongest self starts here.',
    quickLinks: 'Quick Links',
    programsHeading: 'Programs',
    copyright: 'APEX FITNESS. All rights reserved.',
    navLinks: [
      { label: 'About Us', href: '#about' },
      { label: 'Trainers', href: '#trainers' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Schedule', href: '#schedule' },
      { label: 'Book a Class', href: '#booking' },
      { label: 'Contact', href: '#contact' },
    ],
    programLinks: [
      { label: 'Strength & Powerlifting', href: '#programs' },
      { label: 'HIIT & Conditioning', href: '#programs' },
      { label: 'CrossFit', href: '#programs' },
      { label: 'Yoga & Mobility', href: '#programs' },
      { label: 'Boxing & Kickboxing', href: '#programs' },
      { label: 'Personal Training', href: '#programs' },
    ],
  },
  ru: {
    tagline: 'Элитный тренировочный центр, где результаты зарабатываются, а не дарятся. Твоя лучшая версия начинается здесь.',
    quickLinks: 'Быстрые ссылки',
    programsHeading: 'Программы',
    copyright: 'APEX FITNESS. Все права защищены.',
    navLinks: [
      { label: 'О нас', href: '#about' },
      { label: 'Тренеры', href: '#trainers' },
      { label: 'Цены', href: '#pricing' },
      { label: 'Расписание', href: '#schedule' },
      { label: 'Записаться', href: '#booking' },
      { label: 'Контакты', href: '#contact' },
    ],
    programLinks: [
      { label: 'Силовые и пауэрлифтинг', href: '#programs' },
      { label: 'HIIT и кондиционинг', href: '#programs' },
      { label: 'CrossFit', href: '#programs' },
      { label: 'Йога и мобильность', href: '#programs' },
      { label: 'Бокс и кикбоксинг', href: '#programs' },
      { label: 'Персональные тренировки', href: '#programs' },
    ],
  },
  uk: {
    tagline: 'Елітний тренувальний центр, де результати заробляються, а не даруються. Твоя найкраща версія починається тут.',
    quickLinks: 'Швидкі посилання',
    programsHeading: 'Програми',
    copyright: 'APEX FITNESS. Усі права захищені.',
    navLinks: [
      { label: 'Про нас', href: '#about' },
      { label: 'Тренери', href: '#trainers' },
      { label: 'Ціни', href: '#pricing' },
      { label: 'Розклад', href: '#schedule' },
      { label: 'Записатися', href: '#booking' },
      { label: 'Контакти', href: '#contact' },
    ],
    programLinks: [
      { label: 'Силові та пауерліфтинг', href: '#programs' },
      { label: 'HIIT та кондиціонінг', href: '#programs' },
      { label: 'CrossFit', href: '#programs' },
      { label: 'Йога та мобільність', href: '#programs' },
      { label: 'Бокс та кікбоксинг', href: '#programs' },
      { label: 'Персональні тренування', href: '#programs' },
    ],
  },
}[lang];

export default function Footer() {
  return (
    <footer className="py-16 bg-dark-card border-t border-dark-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap size={18} className="text-lime" />
              <span className="font-heading font-bold text-lg text-white">
                APEX <span className="text-lime">FITNESS</span>
              </span>
            </div>
            <p className="text-steel/50 text-sm leading-relaxed max-w-xs">
              {t.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-4">
              {t.quickLinks}
            </h4>
            <div className="space-y-2.5">
              {t.navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-steel/50 text-sm hover:text-lime transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-4">
              {t.programsHeading}
            </h4>
            <div className="space-y-2.5">
              {t.programLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-steel/50 text-sm hover:text-lime transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="lime-line-wide mx-auto mb-6"
          style={{ background: 'linear-gradient(90deg, transparent, #84cc16, transparent)' }}
        />

        {/* Copyright */}
        <p className="text-center text-white/15 text-xs tracking-wider">
          &copy; {new Date().getFullYear()} {t.copyright}
        </p>
      </div>
    </footer>
  );
}
