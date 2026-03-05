import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { lang } from '../lib/i18n';

const t = {
  en: {
    failedToBook: 'Failed to book class',
  },
  ru: {
    failedToBook: 'Не удалось записаться на занятие',
  },
  uk: {
    failedToBook: 'Не вдалося записатися на заняття',
  },
}[lang];

export interface ClassBookingData {
  member_name: string;
  email: string;
  phone: string;
  class_type: string;
  trainer_name: string;
  date: string;
  time: string;
  membership_interest?: string;
  goals?: string;
}

export function useClassBookings() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: ClassBookingData) => {
    setSubmitting(true);
    setError(null);

    try {
      if (!supabase) {
        await new Promise((r) => setTimeout(r, 1000 + Math.random() * 200));
        setSuccess(true);
        return true;
      }

      const { error: err } = await supabase.from('ped65acc740b9_class_bookings').insert({
        ...data,
        status: 'pending',
      });

      if (err) throw err;
      setSuccess(true);
      return true;
    } catch (e: any) {
      setError(e.message || t.failedToBook);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setSuccess(false);
    setError(null);
  };

  return { submit, submitting, success, error, reset };
}
