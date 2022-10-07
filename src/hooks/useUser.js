import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

function useUser() {
    const [userName, setUserName] = useState(null);
    const [error, setError] = useState(null);

    async function handleLogOut() {
        try {
            supabase.auth.signOut();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async function getUserId() {
        try {
            const response = (await supabase.auth.getUser()).data.user.id;

            return response;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = (await supabase.auth.getUser()).data.user
                    .user_metadata.username;

                setUserName(response);
            } catch (error) {
                setError(error);
                console.error(error);
            }
        }
        fetchUser();
    }, []);

    return { handleLogOut, userName, error, getUserId };
}

export default useUser;
