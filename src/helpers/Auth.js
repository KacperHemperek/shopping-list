import { supabase } from "../../supabaseClient";

async function logIn(email, password) {
    const loginError = new Error();
    loginError.name = "Log in failed";
    try {
        const cred = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (cred.error) {
            console.error(cred.error);
            loginError.message = String(cred.error).replace(
                "AuthApiError: ",
                ""
            );

            throw loginError;
        }
    } catch (error) {
        console.error(error);
        loginError.message = error.message;
        throw loginError;
    }
}

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

export { logIn, logOut, signUp };
