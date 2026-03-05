type Lang = 'en' | 'ru' | 'uk';

const envLang = import.meta.env.VITE_LANG as string | undefined;
const navLang = typeof navigator !== 'undefined' ? navigator.language?.slice(0, 2) : undefined;
const raw = envLang || navLang || 'en';

export const lang: Lang = raw === 'ru' ? 'ru' : raw === 'uk' ? 'uk' : 'en';
