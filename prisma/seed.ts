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
      { name: 'ORDER_PENDING' },
      { name: 'ORDER_REJECT' },
      { name: 'ORDER_APPROVED' },
      { name: 'PRODUCT_IN_CART' },
      { name: 'PRODUCT_ORDERED' },
      { name: 'ORDER_CANCELED' },
      { name: 'ORDER_ACCEPTED' },
    ],
  });
}
createRoleData();
createRoleStatusData();
