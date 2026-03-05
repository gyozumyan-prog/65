import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { lang } from '../lib/i18n';

const t = {
  en: {
    programs: 'Programs',
    trainers: 'Trainers',
    pricing: 'Pricing',
    schedule: 'Schedule',
    contact: 'Contact',
    startFreeTrial: 'Start Free Trial',
  },
  ru: {
    programs: 'Программы',
    trainers: 'Тренеры',
    pricing: 'Цены',
    schedule: 'Расписание',
    contact: 'Контакты',
    startFreeTrial: 'Бесплатная пробная',
  },
  uk: {
    programs: 'Програми',
    trainers: 'Тренери',
    pricing: 'Ціни',
    schedule: 'Розклад',
    contact: 'Контакти',
    startFreeTrial: 'Безкоштовна пробна',
  },
}[lang];

const LINKS = [
  { label: t.programs, href: '#programs' },
  { label: t.trainers, href: '#trainers' },
  { label: t.pricing, href: '#pricing' },
  { label: t.schedule, href: '#schedule' },
  { label: t.contact, href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-dark/95 backdrop-blur-md shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <Zap size={22} className="text-lime" />
            <span className="font-heading font-bold text-lg tracking-tight text-white">
              APEX <span className="text-lime">FITNESS</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="lime-underline text-sm font-medium text-white/60 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#booking"
              className="px-5 py-2.5 bg-lime text-dark text-sm font-bold rounded-lg hover:bg-lime-dark transition-all duration-300 neon-glow"
            >
              {t.startFreeTrial}
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X size={22} className="text-white" />
            ) : (
              <Menu size={22} className="text-white" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-dark-card/95 backdrop-blur-md border-t border-dark-border">
            <div className="px-6 py-4 space-y-1">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-white/60 hover:text-lime text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setMenuOpen(false)}
                className="block mt-3 text-center px-5 py-2.5 bg-lime text-dark text-sm font-bold rounded-lg hover:bg-lime-dark transition-colors"
              >
                {t.startFreeTrial}
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
