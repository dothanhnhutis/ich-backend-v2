// declare global {
//   namespace Express {
//     interface Request {
//       sessionData: SessionData | null;
//       cookies: Record<string, string>;
//     }
//   }
// }

import "express";

declare module "express" {
  export interface Request {
    user?: {
      id: string;
      email: string;
      role: string;
    };
  }
}
