export interface Member {
  id: number;
  deparment: string;
  info: {
    name: string;
    avatar: string;
    email: string;
    phone?: string;
  };
}
