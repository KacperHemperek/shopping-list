import { useState } from "react";
import { supabase } from "../../supabaseClient";
import useUser from "./useUser";

function useUpdateLists() {
  const { getUserId } = useUser();
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

  async function changeList(newName, id) {
    try {
      const { error: changeListError } = await supabase
        .from("lists")
        .update({ list_name: newName })
        .eq("id", id);

      if (changeListError) {
        throw new Error(changeListError);
      }

      return true;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  return { createList, changeList };
}

export default useUpdateLists;
