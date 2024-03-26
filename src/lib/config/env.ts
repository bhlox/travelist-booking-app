import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
  DB_URL: str(),
  NEXT_PUBLIC_SECURE_LOCAL_STORAGE_HASH_KEY: str(),
  NEXT_PUBLIC_SECURE_LOCAL_STORAGE_PREFIX: str(),
  ENCRYPT_KEY: str({ default: "32" }),
  ENCRYPT_IV: str({ default: "16" }),
  NODE_ENV: str({ choices: ["development", "production", "test"] }),
});

export default env;
