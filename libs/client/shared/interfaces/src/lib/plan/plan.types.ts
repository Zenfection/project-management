import { Member } from './member.types';

export interface Plan {
  id: number;
  title: string;
  slug: string;
  description: string;
  owner: Member;
  members: Member[];
  category: string;
}

export interface CreatePlan {
  title: string;
  slug: string;
  description: string;
  owner: {
    connect: {
      email: string;
    };
  };
  members: {
    connect: {
      email: string;
    }[];
  };
  category: {
    connect: {
      slug: string;
    };
  };
}
