import { supabase } from "../../supabaseClient";
import useUser from "./useUser";

function useLists() {
    const { getUserId } = useUser();

    async function createList(name) {
        try {
            const userId = await getUserId();
            console.log({ userId });
            console.log({ name });
            const { error } = await supabase.from("lists").insert({
                created_by: userId,
                items: null,
                users: [userId],
                list_name: name,
            });

            if (error) {
                console.error(error);
                throw new Error(error);
            }
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    function fetchLists() {
        //
    }

    return { createList, fetchLists };
}

export default useLists;
