import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await hash(process.env.PASSWORD_ADMIN || 'ADMIN123', 10);
  const email = process.env.EMAIL_ADMIN || 'admin';
  const name = process.env.NAME_ADMIN || 'ADMIN';

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
