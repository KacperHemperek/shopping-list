import { Database } from './Supabase';

export interface UserListItem {
  id: string;
  name: string;
  creator: Database['public']['Tables']['profiles']['Row'];
}
