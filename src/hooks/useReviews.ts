import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { lang } from '../lib/i18n';

export interface Review {
  member_name: string;
  text: string;
  rating: number;
  program: string | null;
  avatar_url: string | null;
}

const t = {
  en: {
    reviews: [
      {
        member_name: 'Marcus Johnson',
        text: 'Lost 45 lbs in 6 months with the HIIT program. Jade\'s coaching pushed me past limits I didn\'t know I had. Best investment I\'ve ever made in myself.',
        rating: 5,
        program: 'HIIT & Conditioning',
        avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      },
      {
        member_name: 'Sarah Chen',
        text: 'As a complete beginner, I was nervous walking in. The trainers here made me feel welcome from day one. Now I deadlift twice my body weight!',
        rating: 5,
        program: 'Strength & Powerlifting',
        avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
      },
      {
        member_name: 'Daniel Park',
        text: 'The CrossFit program here is world-class. Devon\'s programming is smart, progressive, and keeps me coming back 5 days a week. Community is unmatched.',
        rating: 5,
        program: 'CrossFit',
        avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      },
      {
        member_name: 'Emily Watson',
        text: 'The yoga and mobility classes cured my chronic back pain that I\'d been dealing with for years. Natasha is an absolute miracle worker. Life-changing experience.',
        rating: 5,
        program: 'Yoga & Mobility',
        avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      },
    ],
  },
  ru: {
    reviews: [
      {
        member_name: 'Marcus Johnson',
        text: 'Сбросил 20 кг за 6 месяцев на программе HIIT. Тренировки Jade подтолкнули меня за пределы, о которых я не подозревал. Лучшая инвестиция в себя, которую я когда-либо делал.',
        rating: 5,
        program: 'HIIT и кондиционинг',
        avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      },
      {
        member_name: 'Sarah Chen',
        text: 'Как полный новичок, я нервничала перед первым визитом. Тренеры здесь заставили меня почувствовать себя как дома с первого дня. Теперь я тяну становую в два раза больше своего веса!',
        rating: 5,
        program: 'Силовые и пауэрлифтинг',
        avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
      },
      {
        member_name: 'Daniel Park',
        text: 'Программа CrossFit здесь мирового уровня. Программирование Devon умное, прогрессивное и заставляет возвращаться 5 дней в неделю. Сообщество не имеет аналогов.',
        rating: 5,
        program: 'CrossFit',
        avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      },
      {
        member_name: 'Emily Watson',
        text: 'Занятия по йоге и мобильности избавили меня от хронической боли в спине, с которой я мучилась годами. Natasha \u2014 настоящая волшебница. Опыт, изменивший мою жизнь.',
        rating: 5,
        program: 'Йога и мобильность',
        avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      },
    ],
  },
  uk: {
    reviews: [
      {
        member_name: 'Marcus Johnson',
        text: 'Скинув 20 кг за 6 місяців на програмі HIIT. Тренування Jade підштовхнули мене за межі, про які я навіть не підозрював. Найкраща інвестиція в себе, яку я коли-небудь робив.',
        rating: 5,
        program: 'HIIT та кондиціонінг',
        avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      },
      {
        member_name: 'Sarah Chen',
        text: 'Як повний новачок, я нервувала перед першим візитом. Тренери тут змусили мене відчути себе як вдома з першого дня. Тепер я тягну станову вдвічі більше своєї ваги!',
        rating: 5,
        program: 'Силові та пауерліфтинг',
        avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
      },
      {
        member_name: 'Daniel Park',
        text: 'Програма CrossFit тут світового рівня. Програмування Devon розумне, прогресивне і змушує повертатися 5 днів на тиждень. Спільнота не має аналогів.',
        rating: 5,
        program: 'CrossFit',
        avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      },
      {
        member_name: 'Emily Watson',
        text: 'Заняття з йоги та мобільності позбавили мене хронічного болю в спині, з яким я мучилася роками. Natasha \u2014 справжня чарівниця. Досвід, що змінив моє життя.',
        rating: 5,
        program: 'Йога та мобільність',
        avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      },
    ],
  },
}[lang];

const STATIC_REVIEWS: Review[] = t.reviews;

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>(STATIC_REVIEWS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;
    setLoading(true);

    (async () => {
      try {
        const { data, error } = await supabase
          .from('ped65acc740b9_reviews')
          .select('*')
          .eq('is_published', true)
          .order('created_at', { ascending: false });

        if (!cancelled && data && !error && data.length > 0) {
          setReviews(
            data.map((r) => ({
              member_name: r.member_name,
              text: r.text,
              rating: r.rating,
              program: r.program,
              avatar_url: r.avatar_url,
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

  return { reviews, loading };
}
