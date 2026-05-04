import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction([
    prisma.savedItem.deleteMany(),
    prisma.source.deleteMany(),
    prisma.image.deleteMany(),
    prisma.trend.deleteMany(),
    prisma.searchLog.deleteMany(),
    prisma.explainer.deleteMany(),
    prisma.topic.deleteMany(),
    prisma.country.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  console.log("Cleared LoreSabi local data.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
