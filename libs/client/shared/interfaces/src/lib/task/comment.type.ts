export interface Comment {
  id: number;
  content: string;
  user: {
    info: {
      email: string;
      avatar: string;
      name: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}
