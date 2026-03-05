import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { lang } from '../lib/i18n';

export interface Trainer {
  name: string;
  title: string;
  specialty: string;
  bio: string;
  image_url: string | null;
  certifications: string;
}

const t = {
  en: {
    trainers: [
      {
        name: 'Ryan Torres',
        title: 'Head Strength Coach',
        specialty: 'Strength & Powerlifting',
        bio: 'NSCA-certified strength and conditioning specialist with 12 years of competitive powerlifting. Has coached over 200 athletes to competition-level strength.',
        image_url: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&q=80',
        certifications: 'NSCA-CSCS, USAW Level 2',
      },
      {
        name: 'Jade Kim',
        title: 'HIIT & Conditioning Lead',
        specialty: 'HIIT & Conditioning',
        bio: 'Former collegiate track athlete turned elite fitness coach. Specializes in metabolic conditioning and fat-loss programming with proven client transformations.',
        image_url: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80',
        certifications: 'ACE-CPT, Precision Nutrition L1',
      },
      {
        name: 'Devon Blake',
        title: 'CrossFit & Competition Coach',
        specialty: 'CrossFit',
        bio: 'CrossFit Level 3 trainer and 4x Regional competitor. Builds programming that scales from beginners to competition athletes with measurable results.',
        image_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
        certifications: 'CrossFit L3, USA Weightlifting',
      },
      {
        name: 'Natasha Obi',
        title: 'Yoga & Mobility Specialist',
        specialty: 'Yoga & Mobility',
        bio: 'RYT-500 certified yoga instructor with a background in physical therapy. Integrates mobility work with strength training for injury prevention and recovery.',
        image_url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80',
        certifications: 'RYT-500, FMS Level 2',
      },
    ],
  },
  ru: {
    trainers: [
      {
        name: 'Ryan Torres',
        title: 'Главный силовой тренер',
        specialty: 'Силовые и пауэрлифтинг',
        bio: 'Сертифицированный NSCA специалист по силовой подготовке с 12-летним соревновательным опытом в пауэрлифтинге. Подготовил более 200 атлетов до соревновательного уровня.',
        image_url: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&q=80',
        certifications: 'NSCA-CSCS, USAW Level 2',
      },
      {
        name: 'Jade Kim',
        title: 'Ведущий тренер HIIT и кондиционинга',
        specialty: 'HIIT и кондиционинг',
        bio: 'Бывшая университетская легкоатлетка, ставшая элитным фитнес-тренером. Специализируется на метаболическом кондиционинге и программах жиросжигания с доказанными результатами.',
        image_url: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80',
        certifications: 'ACE-CPT, Precision Nutrition L1',
      },
      {
        name: 'Devon Blake',
        title: 'Тренер CrossFit и соревнований',
        specialty: 'CrossFit',
        bio: 'Тренер CrossFit Level 3 и 4-кратный участник региональных соревнований. Создаёт программы, масштабируемые от новичков до соревновательных атлетов.',
        image_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
        certifications: 'CrossFit L3, USA Weightlifting',
      },
      {
        name: 'Natasha Obi',
        title: 'Специалист по йоге и мобильности',
        specialty: 'Йога и мобильность',
        bio: 'Сертифицированный RYT-500 инструктор по йоге с опытом в физиотерапии. Интегрирует работу над подвижностью с силовыми тренировками для профилактики травм и восстановления.',
        image_url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80',
        certifications: 'RYT-500, FMS Level 2',
      },
    ],
  },
  uk: {
    trainers: [
      {
        name: 'Ryan Torres',
        title: 'Головний силовий тренер',
        specialty: 'Силові та пауерліфтинг',
        bio: 'Сертифікований NSCA фахівець із силової підготовки з 12-річним змагальним досвідом у пауерліфтингу. Підготував понад 200 атлетів до змагального рівня.',
        image_url: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&q=80',
        certifications: 'NSCA-CSCS, USAW Level 2',
      },
      {
        name: 'Jade Kim',
        title: 'Провідний тренер HIIT та кондиціонінгу',
        specialty: 'HIIT та кондиціонінг',
        bio: 'Колишня університетська легкоатлетка, яка стала елітним фітнес-тренером. Спеціалізується на метаболічному кондиціонінгу та програмах спалювання жиру з доведеними результатами.',
        image_url: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80',
        certifications: 'ACE-CPT, Precision Nutrition L1',
      },
      {
        name: 'Devon Blake',
        title: 'Тренер CrossFit та змагань',
        specialty: 'CrossFit',
        bio: 'Тренер CrossFit Level 3 та 4-разовий учасник регіональних змагань. Створює програми, що масштабуються від новачків до змагальних атлетів.',
        image_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
        certifications: 'CrossFit L3, USA Weightlifting',
      },
      {
        name: 'Natasha Obi',
        title: 'Спеціаліст з йоги та мобільності',
        specialty: 'Йога та мобільність',
        bio: 'Сертифікований RYT-500 інструктор з йоги з досвідом у фізіотерапії. Інтегрує роботу над рухливістю із силовими тренуваннями для профілактики травм та відновлення.',
        image_url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80',
        certifications: 'RYT-500, FMS Level 2',
      },
    ],
  },
}[lang];

const STATIC_TRAINERS: Trainer[] = t.trainers;

export function useTrainers() {
  const [trainers, setTrainers] = useState<Trainer[]>(STATIC_TRAINERS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;
    setLoading(true);

    (async () => {
      try {
        const { data, error } = await supabase
          .from('ped65acc740b9_trainers')
          .select('*')
          .eq('is_active', true)
          .order('name');

        if (!cancelled && data && !error && data.length > 0) {
          setTrainers(
            data.map((t) => ({
              name: t.name,
              title: t.title,
              specialty: t.specialty,
              bio: t.bio,
              image_url: t.image_url,
              certifications: t.certifications,
            })),
          );
        }
      } catch {
        /* use static data */
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  return { trainers, loading };
}
