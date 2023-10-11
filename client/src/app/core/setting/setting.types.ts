import { Scheme } from "@fuse/services/config/config.types";

enum Theme {
  DEFAULT,
  BRAND,
  TEAL,
  ROSE,
  PURPLE,
  AMBER
}

enum Layout {
  empty,
  classic,
  classy,
  compact,
  dense,
  futuristic,
  thin,
  centered,
  enterpise,
  material,
  modern
}

export interface Setting {
  id: string;
  language: string;
  theme: Theme;
  scheme: Scheme;
  layout: Layout;
}
