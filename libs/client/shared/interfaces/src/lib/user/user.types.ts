interface Role {
  id?: number;
  name: string;
  description?: string;
}

export interface Info {
  about?: string;
  address?: string;
  name?: string;
  email?: string;
  status?: string;
  avatar?: string;
  phone?: string;
}

export interface User {
  id: string;
  info: Info;
  roles: Role[];
  department: string;
}
