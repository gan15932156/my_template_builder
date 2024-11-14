import { PrismaClient } from "@prisma/client";
import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
const prismaCLientSignleton = () => {
  const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL });
  const adapter = new PrismaNeon(neon);
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaCLientSignleton>;
}

const db = globalThis.prismaGlobal ?? prismaCLientSignleton();
export default db;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db;
