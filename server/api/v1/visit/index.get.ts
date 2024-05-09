import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const data = await prisma.visits.findMany({
    include: { visit_time: true },
  });

  return data;
});
