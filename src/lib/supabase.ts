import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uvlidlgnfegeyhrvqhzx.supabase.co';
const supabaseAnonKey = 'sb_publishable_FZKUwi52xKonqYYs-171fQ_q86mZaJw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
