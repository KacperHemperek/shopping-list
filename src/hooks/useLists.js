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
                .eq("list_users.user_id", userId)
                .order("created_at", { ascending: true });
            setUserLists(
                data.map((item) => {
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

    async function setupSubscription() {
        try {
            const userId = await getUserId();
            console.log(userId);
            supabase
                .channel(`public:list_users:user_id=eq.${userId}`)
                .on(
                    "postgres_changes",
                    { event: "INSERT", schema: "public", table: "list_users" },
                    async (payload) => {
                        /* for some reason public:list_user_id=eq.(userId) 
                        does not work so this is a workaround */

                        if (payload.new.user_id !== userId) {
                            return;
                        }
                        //make sure that new list is current users with eq at the end
                        const newList = await supabase
                            .from("lists")
                            .select(
                                "list_name, id, profiles!inner(username,id)"
                            )
                            .eq("id", payload.new.list_id)
                            .eq("profiles.id", userId);

                        const { id, list_name, profiles } = newList.data[0];

                        setUserLists((prevList) => [
                            ...prevList,
                            {
                                id,
                                name: list_name,
                                creator: profiles.username,
                            },
                        ]);
                    }
                )
                .on(
                    "postgres_changes",
                    { event: "UPDATE", schema: "public", table: "list_users" },
                    async (payload) => {
                        //should listen to all lists that has it's user_id so will react to changes
                        //of not only user's lists but also lists that user is invited to 
                        const updatedList = await supabase
                            .from("lists")
                            .select("list_name, id, profiles(username, id)")
                            .eq("id", payload.new.id)
                            .eq("profiles(id)", userId);
                    }
                )
                //TODO: create on delete update
                .subscribe((status) => console.log("subscription: ", status));
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    useEffect(() => {
        setupSubscription();
        fetchLists();
    }, []);

    return { createList, fetchLists, userLists, error };
}

export default useLists;
