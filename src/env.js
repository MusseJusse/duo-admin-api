import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    IKEY: z.string().min(5),
    SKEY: z.string().min(5),
    HOST: z.string().min(5),
  },

  client: {},

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    IKEY: process.env.IKEY,
    SKEY: process.env.SKEY,
    HOST: process.env.HOST,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
