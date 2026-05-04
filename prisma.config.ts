import { config } from "dotenv";
import { defineConfig } from "prisma/config";

config({ path: new URL(".env", import.meta.url) });

export default defineConfig({
  schema: "packages/database/prisma/schema.prisma",
});
