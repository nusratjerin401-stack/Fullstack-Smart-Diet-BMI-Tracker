// @ts-nocheck
// JC approved nocheck 2026-08-11

import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import express from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/prisma/client.js";
import cors from "cors";



const router = express.Router();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

// GET all meals
router.get("/meal", async (req, res) => {
  try {
    const meals = await prisma.meal.findMany({
      include: {
        items: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    res.json(meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      error: "Failed to get meals" });
  }
});



const t = 1;
// POST a meal
router.post("/", async (req, res) => {
  try {
    const { mealType, date, totalCalories, items } = req.body.breakfast[0];
    //console.log(req.body);
    const meal = await prisma.meal.create({
      data: {
        timestamp: new Date(date),
        

      },
      include: {
        items: true,
      },
    });
    console.log(date);
    res.status(201).json(meal);
  } catch (error) {
    console.error(error);
    console.log(req.body.breakfast[0]);
    console.log(req.body.breakfast[0].date);
    console.log(req.body.breakfast[0].items);
    res.status(500).json({
      error: `Failed to create meal`
    });
  }
});

// GET one meal
router.get("/meals/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const meal = await prisma.meal.findUnique({
      where: {
        id: id,
      },
      include: {
        items: true,
      },
    });

    if (!meal) {
      return res.status(404).json({
        error: "Meal not found",
      });
    }

    res.json(meal);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get meal",
    });
  }
});

// UPDATE a meal
router.put("/meals/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { mealType, date, totalCalories, items } = req.body;

    const meal = await prisma.meal.update({
      where: {
        id: id,
      },
      data: {
        mealType,
        date: new Date(date),
        totalCalories,

        items: {
          deleteMany: {},
          create: items,
        },
      },
      include: {
        items: true,
      },
    });

    res.json(meal);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update meal",
    });
  }
});
// DELETE a meal
router.delete("/meals/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const meal = await prisma.meal.findUnique({
      where: {
        id: id,
      },
    });

    if (!meal) {
      return res.status(404).json({
        error: "Meal not found",
      });
    }

    await prisma.meal.delete({
      where: {
        id: id,
      },
    });

    res.json({
      message: "Meal deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete meal",
    });
  }
});
export default router;