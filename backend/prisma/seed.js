require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  // Cleanup
  await prisma.comment.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.pet.deleteMany({});
  await prisma.user.deleteMany({});

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      password: 'hashedpassword1', // For MVP, not actually hashed
      role: 'user'
    }
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      password: 'hashedpassword2',
      role: 'user'
    }
  });

  // Create Pets
  const petsData = Array.from({ length: 5 }).map(() => ({
    name: faker.name.firstName(),
    species: faker.helpers.arrayElement(['Dog', 'Cat', 'Bird']),
    breed: faker.animal.dog(), // Just using dog for variety, ignoring species mismatch for demo
    age: faker.datatype.number({ min: 1, max: 15 })
  }));

  const pets = [];
  for (const p of petsData) {
    const pet = await prisma.pet.create({ data: p });
    pets.push(pet);
  }

  // Create Reviews
  for (let i = 0; i < 10; i++) {
    await prisma.review.create({
      data: {
        userId: i % 2 === 0 ? user1.id : user2.id,
        petId: pets[i % pets.length].id,
        rating: faker.datatype.number({ min: 1, max: 5 }),
        text: faker.lorem.sentence()
      }
    });
  }

  // Create Comments
  const allReviews = await prisma.review.findMany();
  for (const review of allReviews) {
    if (Math.random() > 0.5) {
      await prisma.comment.create({
        data: {
          userId: Math.random() > 0.5 ? user1.id : user2.id,
          reviewId: review.id,
          text: faker.lorem.sentence()
        }
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
