import { supabase } from "../../supabaseClient";

function logOut() {
  try {
    supabase.auth.signOut();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { logOut };
