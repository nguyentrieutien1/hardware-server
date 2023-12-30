import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function createRoleData() {
  return await prisma.role.createMany({
    data: [{ name: 'SUPER_ADMIN' }, { name: 'EMPLOYEE' }, { name: 'USER' }],
  });
}
async function createRoleStatusData() {
  return await prisma.status.createMany({
    data: [
      { name: 'PENDING' },
      { name: 'REJECT' },
      { name: 'APPROVED' },
      { name: 'PRODUCT_IN_CART' },
      { name: 'PRODUCT_ORDERED' },
      { name: 'CANCEL_ORDER' },
    ],
  });
}

createRoleData();
createRoleStatusData();
