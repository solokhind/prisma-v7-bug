import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const summaries = await prisma.user_post_summary.findMany({
    include: {
      last_post: true,
    },
  });

  console.log("Data from user_post_summary view:");
  console.log(JSON.stringify(summaries, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
