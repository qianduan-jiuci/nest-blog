import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';
import { Random } from 'mockjs';
import _ from 'lodash';
const prisma = new PrismaClient();

const init = async () => {
  for (let i = 1; i <= 5; i++) {
    await prisma.category.create({
      data: {
        title: Random.ctitle(5, 10),
      },
    });
  }

  await prisma.user.create({
    data: {
      name: 'admin',
      password: await hash('admin888'),
    },
  });

  for (let i = 0; i < 60; i++) {
    await prisma.artilce.create({
      data: {
        title: Random.ctitle(5, 10),
        account: Random.cparagraph(),
        categoryId: _.random(1, 5),
      },
    });
  }
};

init();
