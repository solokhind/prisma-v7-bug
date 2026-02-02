import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma/client.js";

const adapter = new PrismaMariaDb({
  host: "localhost",
  user: "devroot",
  password: "",
  database: "test_db",
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // Read data from the view and include the users relation
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
