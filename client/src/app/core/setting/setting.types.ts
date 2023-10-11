import { Scheme } from "@fuse/services/config/config.types";

enum Theme {
  DEFAULT,
  BRAND,
  TEAL,
  ROSE,
  PURPLE,
  AMBER
}


export interface Setting {
  id: string;
  language: string;
  theme: string;
  scheme: Scheme;
  layout: string;
}
