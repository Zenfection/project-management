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

// export interface Course {
//   id?: string;
//   title?: string;
//   slug?: string;
//   description?: string;
//   category?: string;
//   duration?: number;
//   steps?: {
//     order?: number;
//     title?: string;
//     subtitle?: string;
//     content?: string;
//   }[];
//   totalSteps?: number;
//   updatedAt?: number;
//   featured?: boolean;
//   progress?: {
//     currentStep?: number;
//     completed?: number;
//   };
// }
