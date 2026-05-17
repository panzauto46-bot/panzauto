export const publicEnv = ((import.meta as ImportMeta & {
  env?: Record<string, string | undefined>;
}).env ?? {}) as Record<string, string | undefined>;
