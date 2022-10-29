import { setupURLPolyfill } from 'react-native-url-polyfill';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
//@ts-ignore
import { REACT_APP_SUPABASE_ANON_KEY, REACT_APP_SUPABASE_URL } from '@env';
import { Database } from './src/interface/Supabase';

setupURLPolyfill();

const supabaseUrl = REACT_APP_SUPABASE_URL;
const supabaseAnon = REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(
  REACT_APP_SUPABASE_URL,
  REACT_APP_SUPABASE_ANON_KEY,
  {
    auth: {
      detectSessionInUrl: false,
      storage: AsyncStorage,
    },
  }
);
