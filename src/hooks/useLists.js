import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import useUser from "./useUser";

function useLists() {
    const { getUserId } = useUser();

    const [userLists, setUserLists] = useState(null);

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
                console.error(listError.message);
                throw new Error(listError.message);
            }
            if (connectionError) {
                listError && console.error(connectionError.message);
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
            const { data, error } = await supabase
                .from("lists")
                .select("list_name, id, profiles(id), list_users!inner(*)")
                .eq("list_users.user_id", userId);
            setUserLists(
                data.map((item) => ({ id: item.id, name: item.list_name }))
            );

            if (error) {
                console.error(error.message);
                throw new Error(error.message);
            }
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    useEffect(() => {
        fetchLists();
    }, []);

    return { createList, fetchLists, userLists };
}

export default useLists;
