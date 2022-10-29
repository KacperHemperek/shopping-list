import { useState } from "react";
import { supabase } from "../../supabaseClient";
import useUser from "./useUser";

function useUpdateLists() {
  const { currentUser } = useUser();
  const [error, setError] = useState(null);

  async function createList(name) {
    try {
      const userId = currentUser.id;
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
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async function deleteList(list) {
    if (currentUser.id !== list.creator.id) return;
    try {
      const { error: deleteConnectionError } = await supabase
        .from("list_users")
        .delete()
        .eq("list_id", list.id);

      const { error: deleteItemsError } = await supabase
        .from("items")
        .delete()
        .eq("list_id", list.id);

      const { error: deleteListError } = await supabase
        .from("lists")
        .delete()
        .eq("id", list.id);

      if (deleteListError) {
        console.error(deleteListError);
        throw new Error(deleteListError.message);
      }
      if (deleteConnectionError) {
        console.error(deleteConnectionError);
        throw new Error(deleteConnectionError.message);
      }
      if (deleteItemsError) {
        console.error(deleteItemsError);
        throw new Error(deleteItemsError.messsage);
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  return { createList, changeList, deleteList };
}

export default useUpdateLists;
