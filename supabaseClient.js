import { setupURLPolyfill } from "react-native-url-polyfill";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { REACT_APP_SUPABASE_ANON_KEY, REACT_APP_SUPABASE_URL } from "@env";

setupURLPolyfill();

const supabaseUrl = REACT_APP_SUPABASE_URL;
const supabaseAnon = REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(
    REACT_APP_SUPABASE_URL,
    REACT_APP_SUPABASE_ANON_KEY,
    {
        auth: {
            detectSessionInUrl: false,
            storage: AsyncStorage,
        },
    }
);
