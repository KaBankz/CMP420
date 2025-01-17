import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const employees = await prisma.employee.findMany();
  return employees;
});
