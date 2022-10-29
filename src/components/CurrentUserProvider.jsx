import React, { createContext, useCallback, useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

export const UserContext = createContext({
  currentUser: null,
  session: null,
  logout: () => {},
});

const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setCurrentUser(session.user);
      } else {
        setCurrentUser(null);
      }
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setCurrentUser(session.user);
      } else {
        setCurrentUser(null);
      }
      setSession(session);
    });
  }, []);

  const logOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error(error);
        throw new Error(error);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  const logIn = useCallback(async (email, password) => {
    const loginError = new Error();
    loginError.name = "Log in failed";
    try {
      const cred = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (cred.error) {
        console.error(cred.error);
        loginError.message = String(cred.error).replace("AuthApiError: ", "");

        throw loginError;
      }
    } catch (error) {
      console.error(error);
      loginError.message = error.message;
      throw loginError;
    }
  }, []);

  async function signUp(email, password, confirm, name) {
    const passwrodMatchError = new Error();
    passwrodMatchError.name = "Sign up failed";
    if (password !== confirm) {
      passwrodMatchError.message = "Passwords must match";

      throw passwrodMatchError;
    }
    try {
      const cred = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username: name } },
      });

      if (cred.error) {
        console.error(cred.error);

        passwrodMatchError.message = String(cred.error).replace(
          "AuthApiError: ",
          ""
        );

        throw passwrodMatchError;
      }
    } catch (error) {
      console.error(error);
      passwrodMatchError.message = error.message;
      throw passwrodMatchError;
    }
  }
  //combain all values/functions passed to context
  const getContextValue = useCallback(() => {
    return { currentUser, session, logOut, logIn, signUp };
  }, [currentUser, session, logOut]);

  return (
    <UserContext.Provider value={getContextValue()}>
      {children}
    </UserContext.Provider>
  );
};

export default CurrentUserProvider;
