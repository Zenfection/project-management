import { Scheme } from '@fuse/services/config/config.types';

export interface Setting {
  id: string;
  language: string;
  theme: string;
  scheme: Scheme;
  layout: string;
}
