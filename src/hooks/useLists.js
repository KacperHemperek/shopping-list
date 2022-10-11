import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import useUser from "./useUser";

function useLists() {
    const { getUserId } = useUser();

    const [userLists, setUserLists] = useState(null);
    const [error, setError] = useState(null);

    async function createList(name) {
        try {
            const userId = await getUserId();
            console.log({ userId });
            console.log({ name });
            const { error: listError, data: listData } = await supabase
                .from("lists")
                .insert({
                    created_by: userId,
                    list_name: name,
                })
                .select();

            const { error: connectionError } = await supabase
                .from("list_users")
                .insert({ user_id: userId, list_id: listData[0].id });

            console.log({ listData });

            if (listError) {
                setError(listError);
                console.error(listError.message);
                throw new Error(listError.message);
            }
            if (connectionError) {
                setError(connectionError);
                console.error(connectionError.message);
                throw new Error(connectionError.message);
            }
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    async function fetchLists() {
        try {
            const userId = await getUserId();
            const { data, error: fetchError } = await supabase
                .from("lists")
                .select(
                    "list_name, id, profiles(username), list_users!inner(*)"
                )
                .eq("list_users.user_id", userId);
            setUserLists(
                data.map((item) => {
                    console.log(item);
                    return {
                        id: item.id,
                        name: item.list_name,
                        creator: item.profiles.username,
                    };
                })
            );

            if (fetchError) {
                setError(fetchError);
                console.error(fetchError.message);
                throw new Error(fetchError.message);
            }
        } catch (err) {
            setError(err);
            console.error(err);
            throw new Error(err);
        }
    }

    useEffect(() => {
        fetchLists();
    }, []);

    return { createList, fetchLists, userLists, error };
}

export default useLists;
