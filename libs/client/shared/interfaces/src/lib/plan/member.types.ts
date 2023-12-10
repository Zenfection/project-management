export interface Member {
  id: number;
  department: string;
  info: {
    name: string;
    avatar: string;
    email: string;
    phone?: string;
  };
}
