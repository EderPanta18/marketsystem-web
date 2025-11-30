// core/constants/permissions.ts

export const PERMISSION = {} as const;

export type PERMISSION = (typeof PERMISSION)[keyof typeof PERMISSION];
