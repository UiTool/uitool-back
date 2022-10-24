import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await hash('adminUItool1@', 10);
  const email = 'uitoolleris@gmail.com';
  const name = 'Administrator Leris';

  const admin = await prisma.users.upsert({
    where: {
      email,
    },
    update: {},
    create: {
      email,
      name,
      password,
      isAdmin: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
