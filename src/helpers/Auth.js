import { supabase } from "../../supabaseClient";

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

function logOut() {
  try {
    supabase.auth.signOut();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { logOut, signUp };
