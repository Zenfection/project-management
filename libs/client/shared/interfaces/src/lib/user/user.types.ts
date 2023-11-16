export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status?: string;
  about?: string;
  address?: string;
  phone?: string;
  roles: string[];
  department: string;
}
