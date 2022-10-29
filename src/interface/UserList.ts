import { Database } from './Supabase';

export interface UserList {
  id: string;
  name: string;
  creator: Database['public']['Tables']['profiles']['Row'];
}
