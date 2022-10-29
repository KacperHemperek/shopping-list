import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Database } from '../interface/Supabase';
import { UserList } from '../interface/UserList';
import useUser from './useUser';

function useLists() {
  const { currentUser } = useUser();
  const [userLists, setUserLists] = useState<UserList[]>(null);
  const [error, setError] = useState(null);

  async function createList(name) {
    try {
      const { error: listError, data: listData } = await supabase
        .from('lists')
        .insert({
          created_by: currentUser.id,
          list_name: name,
        })
        .select();

      const { error: connectionError } = await supabase
        .from('list_users')
        .insert({ user_id: currentUser.id, list_id: listData[0].id });

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
      const { data, error: fetchError } = await supabase
        .from('lists')
        .select('list_name, id, created_at, profiles(*), list_users!inner(*)')
        .eq('list_users.user_id', currentUser.id)
        .order('created_at', { ascending: true });
      const lists = data.map((item) => {
        return {
          id: item.id,
          name: item.list_name,
          creator:
            item.profiles as Database['public']['Tables']['profiles']['Row'],
        };
      });
      setUserLists(lists);

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
  async function subscribeToLists() {
    supabase
      .channel('public:list_users')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'list_users',
        },
        async (payload) => {
          if (payload.new.user_id === currentUser.id) {
            const { data, error } = await supabase
              .from('lists')
              .select('list_name, id, profiles(username)')
              .eq('id', payload.new.list_id);

            console.log(data);
            setUserLists((prev) => [
              ...prev,
              {
                id: data[0].id,
                creator: data[0]
                  .profiles as Database['public']['Tables']['profiles']['Row'],
                name: data[0].list_name,
              },
            ]);
          }
        }
      )
      .subscribe();
  }

  useEffect(() => {
    fetchLists();
    subscribeToLists();
  }, []);

  return { createList, fetchLists, userLists, error };
}

export default useLists;
