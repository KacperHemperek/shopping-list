import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import useUser from "./useUser";

function useLists() {
  const { getUserId } = useUser();

  const [userLists, setUserLists] = useState(null);
  const [error, setError] = useState(null);

  async function fetchLists() {
    try {
      const userId = await getUserId();

      const { data, error: fetchError } = await supabase
        .from("lists")
        .select("list_name, id, profiles(username), list_users!inner(*)")
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
      supabase
        .channel(`public:list_users:user_id=eq.${userId}`)
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "list_users" },
          async (payload) => {
            /* for some reason public:list_user_id=eq.${userId} 
            does not work so this is a workaround */
            if (payload.new.user_id !== userId) {
              return;
            }
            //make sure that new list is current user's with eq at the end
            const newList = await supabase
              .from("lists")
              .select("list_name, id, profiles!inner(username,id)")
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
        .subscribe();

      supabase
        .channel("public:lists")
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "lists" },
          async (payload) => {
            //should listen to all lists that has it's user_id so will react to changes
            //of not only user's lists but also lists that user is invited to
            const { list_name, id } = payload.new;
            setUserLists((lists) =>
              lists.map((list) =>
                list.id === payload.new.id
                  ? {
                      id: id,
                      name: list_name,
                      creator: list.creator,
                    }
                  : list
              )
            );
          }
        )
        .on(
          "postgres_changes",
          { event: "DELETE", schema: "public", table: "lists" },
          async (payload) => {
            //update lists when creator deletes list
            setUserLists((prevLists) =>
              prevLists?.filter((list) => list.id !== payload.old.id)
            );
          }
        )
        .subscribe();
      //TODO: create on delete update
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  useEffect(() => {
    setupSubscription();
    fetchLists();
  }, []);

  return { userLists, error };
}

export default useLists;
