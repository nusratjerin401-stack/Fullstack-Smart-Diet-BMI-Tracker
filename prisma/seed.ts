// prisma/seed.ts


import { PrismaClient} from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { faker } from "@faker-js/faker";
import { Pool } from "pg";

const connectionString = `${process.env.DATABASE_URL}`;
console.log(connectionString);
const pool = new Pool({connectionString});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({adapter});

const userIds = Array.from({ length: 10}, () => faker.string.uuid());

const portion = () => {
  const size = ['small','medium','large'];
  const rand = Math.floor(Math.random()*3);
  return size[rand];
}

const goal = () => {
  const goal = ['weight loss','weight maintenance','muscle gain'];
  const rand = Math.floor(Math.random()*3);
  return goal[rand];
}
const activity = () => {
  const levels = ['None','Occasionally','Often', 'Frequently'];
  const rand = Math.floor(Math.random()*4);
  return levels[rand];
}
const type = () => {
  const types = ['Cardio','Strength','None'];
  const rand = Math.floor(Math.random()*3);
  return types[rand];
}

const foodName = () => {
  const foods = [
    'Apple',
    'Banana',
    'Orange',
    'Blueberries',
    'Strawberries',
    'Grapes',
    'Watermelon',
    'Mango',
    'Pineapple',
    'Avocado',
    'Spinach',
    'Kale',
    'Lettuce',
    'Tomatoes',
    'Cucumbers',
    'Carrots',
    'Broccoli',
    'Bell peppers',
    'Onions',
    'Garlic',
    'Sweet potato',
    'White rice',
    'Brown rice',
    'Quinoa',
    'Oats',
    'Whole wheat bread',
    'Greek yogurt',
    'Milk',
    'Cheddar cheese',
    'Eggs',
    'Chicken breast',
    'Turkey',
    'Salmon',
    'Tuna',
    'Shrimp',
    'Tofu',
    'Black beans',
    'Chickpeas',
    'Lentils',
    'Olive oil'
  ];
  const rand = Math.floor(Math.random() * 40);
  return foods[rand];
}

async function main() {
  
  for (const userId of userIds) {
    const user = await prisma.user.create({
        data: {
          id: userId,
          name: 'jacoblover' + faker.string.alpha(4),
          email: faker.internet.email(),
          password: faker.string.alphanumeric(12)
        }
    })
    const userInfo = await prisma.userInfo.create({
      data: {
        userId: userId,
        sex: 'male',
        age: faker.number.int({min:15, max:60}),
        heightFeet: faker.number.int({min:3, max: 7}),
        heightInches: faker.number.int({min:0, max: 11}),
        weight: faker.number.float({min:100, max:320}),
        activityFrequency: activity(),
        activityType: type(),
        fitnessGoal: goal()
      }
    })
    
    for (let i = 0; i < 10; i++){
      const mealId = faker.string.uuid();
      const meal = await prisma.meal.create({
      data: {
        id: mealId,
        userId: userId,
        date: faker.date.between({from: '1965-01-01', to: Date.now()}),
        mealType: 'BREAKFAST'
      }
    })
      for (let i = 0; i < 10; i++){
         const mealItem = await prisma.mealItem.create({
         data: {
           id: faker.string.uuid(),
           mealId: mealId,
           foodName: foodName(),
           protein: faker.number.float({min:0, max:100}),
           carbs: faker.number.float({min:0, max:100}),
           fat: faker.number.float({min:0, max:100}),
           calories: faker.number.float({min:20, max:5000}),
           portion: portion()
      }
    })
      }
    }

}}

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
