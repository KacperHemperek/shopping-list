import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

function useUser() {
    const [userName, setUserName] = useState("");

    async function handleLogOut() {
        try {
            supabase.auth.signOut();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = (await supabase.auth.getUser()).data.user
                    .user_metadata.username;

                setUserName(response);
            } catch (error) {
                console.error(error);
            }
        }
        fetchUser();
    }, []);

    return { handleLogOut, userName };
}

export default useUser;
