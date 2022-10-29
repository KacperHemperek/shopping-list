import { Session, User } from "@supabase/supabase-js";

export interface UserContext {
  session: Session | null;
  currentUser: User | null;
  logOut: () => void;
  signUp: (
    email: string,
    password: string,
    confirm: string,
    name: string
  ) => void;
  logIn: (email: string, password: string) => void;
}
