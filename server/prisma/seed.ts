import { PrismaClient } from '@prisma/client';

import { dataPosition } from './data/position';
import { dataUser } from './data/user';
import { dataPlans } from './data/plan';
import { dataLabels } from './data/label';
import { dataPlan } from './data/categories_plan';
import { dataTask } from './data/task';

const prisma = new PrismaClient();

async function main() {
  // await createPosition();
  //   createRole();
  // await createUser();
  // await createCategoriesPlan();
  // await createPlans();
  await createTasks();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function createPosition() {
  const position = await prisma.position.createMany({
    data: dataPosition,
    skipDuplicates: true,
  });
  console.log(
    '\nCreated ' +
      position.count +
      ' position includes: ' +
      dataPosition.map((item) => item.name).join(', '),
  );
}

const createRole = async () => {};

async function createUser() {
  dataUser.forEach(async (data) => {
    try {
      await prisma.user.create({
        data,
      });
    } catch (error) {
      console.log('Error create user: ' + data.email);
      console.log(error);
    }
  });

  console.log(
    '\nCreated ' +
      dataUser.length +
      ' user includes: ' +
      dataUser.map((item) => item.email).join(', '),
  );
}

async function createCategoriesPlan() {
  const categoriesPlan = await prisma.categoryPlan.createMany({
    data: dataPlan,
    skipDuplicates: true,
  });

  console.log(
    `\n Created ${categoriesPlan.count} categories plan includes: ${dataPlan
      .map((item) => item.title)
      .join(', ')}`,
  );
}

async function createPlans() {
  dataPlans.forEach(async (data) => {
    try {
      await prisma.plan.create({
        data,
      });
    } catch (error) {
      console.log('Error create plan: ' + data.title);
      console.log(error);
    }
  });

  console.log(
    '\nCreated ' +
      dataPlans.length +
      ' plan includes: ' +
      dataPlans.map((item) => item.title).join(', '),
  );
}

async function createLabels() {
  await prisma.label.createMany({
    data: dataLabels,
    skipDuplicates: true,
  });

  console.log(
    '\nCreated ' +
      dataLabels.length +
      ' label includes: ' +
      dataLabels.map((item) => item.name).join(', '),
  );
}

async function createTasks() {
  dataTask.forEach(async (data) => {
    try {
      await prisma.task.create({
        data,
      });
    } catch (error) {
      console.log('Error create task: ' + data.title);
      console.log(error);
    }
  });

  console.log(
    '\nCreated ' +
      dataTask.length +
      ' task includes: ' +
      dataTask.map((item) => item.title).join(', '),
  );
}
