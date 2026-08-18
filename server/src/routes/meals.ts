// @ts-nocheck
// JC approved nocheck 2026-08-11
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import express from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/prisma/client.js";
import cors from "cors";


import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";


const mealRouter = express.Router();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET){
  throw new Error("JWT SECRET not set. copy to .env first");
}
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      const user = await prisma.user.findUnique({ where: { id: payload.sub } });
      return done(null, user ?? false);
      console.log("USER:", user);
    }
  )
);





// GET all meals
mealRouter.get("/meal", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const user = req.user;
    console.log(req.user.id);
  
    const meals = await prisma.meal.findMany({
      where: {userId: req.user.id},
      orderBy: {date: "desc"},
      include: {
        items: true
      }
    });
    
    const byDate: Record<string,{date:string;protein:number;calories:number;fat:number;carbs:number;}>={};

    for (const m of meals){
      for (const j of m.items){
        const key = m.date.toISOString().split("T")[0];
        if (!byDate[key]){
        byDate[key]={date:key,protein:0, carbs:0,calories:0,fat:0};
        };
        byDate[key].calories+=Number(j.calories);
        byDate[key].protein+=Number(j.protein);
        byDate[key].fat+=Number(j.fat);
        byDate[key].carbs+=Number(j.carbs);
      }
    }
     

   

    
    //res.json(byDate);
    res.json(Object.values(byDate));
 
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      error: "Failed to get meals" });
  }

});




// POST a meal
mealRouter.post("/meal", passport.authenticate("jwt", { session: false }), async (req, res) => {
 

  console.log(req.body.breakfast[0]);
  try {
    const { foodName, date, quantity, calories, protein, carbs, fat} = req.body.breakfast[0];

     const user = req.user;
     if (!user.id) {
      return res.status(400).json({
        error: "uuid is required",
      });
    }

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }



    const meal = await prisma.meal.create({
      data: {
        mealType: "BREAKFAST",
        userId: user.id,
        date: new Date(date),
        items: {
          create: {
            foodName: foodName,
            portion: quantity,
            calories: parseFloat(calories),
            protein: parseFloat(protein),
            carbs: parseFloat(carbs),
            fat: parseFloat(fat),
          }
        },
      },
      include: {
        items: true,
      },
    });

    res.status(201).json(meal);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create meal",
    });
  }
});

/* GET one meal
  mealRouter.get("/meals/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

// GET one meal for logged-in user
router.get("/meal/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
      const id = Number(req.params.id);
      const user = req.user;

      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      const meal = await prisma.meal.findFirst({
        where: {
          id: id,
          userId: user.id,
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

      res.status(200).json(meal);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Failed to get meal",
      });
    }
  }
);

// UPDATE a meal
mealRouter.put("/meals/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

// UPDATE a meal
router.put("/meal/:id", passport.authenticate("jwt", { session: false }),async (req, res) => {
    try {
      const id = Number(req.params.id);
      const user = req.user;

      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      const { mealType, date, items } = req.body;

      const existingMeal = await prisma.meal.findFirst({
        where: {
          id: id,
          userId: user.id,
        },
      });

      if (!existingMeal) {
        return res.status(404).json({
          error: "Meal not found",
        });
      }

      const meal = await prisma.meal.update({
        where: {
          id: id,
        },
        data: {
          mealType,
          date: new Date(date),

          items: {
            deleteMany: {},
            create: items,
          },
        },
        include: {
          items: true,
        },
      });

      res.status(200).json(meal);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Failed to update meal",
      });
    }
  }
});
// DELETE a meal
mealRouter.delete("/meals/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);



// DELETE a meal
router.delete("/meal/:id",passport.authenticate("jwt", { session: false }),async (req, res) => {
    try {
      const id = Number(req.params.id);
      const user = req.user;

      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      const meal = await prisma.meal.findFirst({
        where: {
          id: id,
          userId: user.id,
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

      res.status(200).json({
        message: "Meal deleted successfully",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Failed to delete meal",
      });
    }
  }
});
*/
export default mealRouter;
