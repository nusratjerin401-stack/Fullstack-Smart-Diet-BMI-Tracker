// prisma/seed.ts
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { faker } from '@faker-js/faker';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const mealTypes = ['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'] as const;
const activityTypes = ['Cardio', 'Strength', 'None'] as const;
const activityFreqs = ['None', '10', '15', '20'] as const;
const goals = ['WeightLoss', 'WeightGain', 'Maintenance', 'MuscleGain'] as const;

async function main() {
  console.log('Seeding dummy data...');

  const USER_COUNT = 10;
  const passwordHash = await bcrypt.hash('password123', 10);

  for (let i = 0; i < USER_COUNT; i++) {
    const name = faker.person.fullName();

    const mealsData = Array.from({ length: 20 }).map(() => ({
      mealType: faker.helpers.arrayElement(mealTypes),
      date: faker.date.recent({ days: 90 }),
      items: {
        create: Array.from({
          length: faker.number.int({ min: 1, max: 3 }),
        }).map(() => ({
          foodName: faker.commerce.productName(),
          portion: `${faker.number.int({ min: 1, max: 3 })} serving(s)`,
          calories: faker.number.int({ min: 100, max: 800 }),
          protein: faker.number.int({ min: 5, max: 45 }),
          carbs: faker.number.int({ min: 5, max: 80 }),
          fat: faker.number.int({ min: 2, max: 30 }),
        })),
      },
    }));

    await prisma.user.create({
      data: {
        name,
        email: faker.internet
          .email({ firstName: name.split(' ')[0] })
          .toLowerCase(),
        password: passwordHash,
        info: {
          create: {
            age: faker.number.int({ min: 18, max: 65 }),
            sex: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
            heightFeet: faker.number.int({ min: 4, max: 6 }),
            heightInches: faker.number.int({ min: 0, max: 11 }),
            weight: faker.number.float({
              min: 110,
              max: 240,
              fractionDigits: 1,
            }),
            activityType: faker.helpers.arrayElement(activityTypes),
            activityFrequency: faker.helpers.arrayElement(activityFreqs),
            fitnessGoal: faker.helpers.arrayElement(goals),
          },
        },
        meals: {
          create: mealsData,
        },
      },
    });
  }

  console.log('Seeding complete.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });