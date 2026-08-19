// @ts-nocheck
// JC approved nocheck 2026-08-11
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import express from "express";
import passport from "passport";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/prisma/client.js";
import jwt from "jsonwebtoken";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";


const intakeRouter = express.Router();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const asyncHandler = (fn) => (req, res, next) => fn(req, res, next).catch(next);

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
      console.log("JWT STRATEGY RAN");
      console.log("PAYLOAD:", payload);

      const user = await prisma.user.findUnique({ where: { id: payload.sub } });
      console.log("USER:", user);
      return done(null, user ?? false);
      
    }
  )
);

// CREATE INTAKE, /intake
intakeRouter.post("/survey", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const {
      age,
      feet,
      inches,
      weight,
      sex,
      atype,
      afreq,
      goal,
    } = req.body;

    //const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    const user = req.user;
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }


    if (!user.id) {
      return res.status(400).json({
        error: "uuid is required",
      });
    }
    const existingInfo = await prisma.userInfo.findUnique({
      where: {
        userId: user.id
      },
    });

    if (existingInfo) {
  return res.status(409).json({
    error: "Intake information already exists",
  });
}
  
const totalInches = Number(feet) * 12 + Number(inches);
  const bmi = (Number(weight) / (totalInches * totalInches)) * 703;
  const intake = await prisma.userInfo.create({
      data: {
        userId: user.id,
        age: Number(age),
        heightFeet: Number(feet),
        heightInches: Number(inches),
        weight: Number(weight),
        sex: sex,
        bmi: bmi,
        activityFrequency: afreq,
        activityType: atype,
        fitnessGoal: goal,
      },
    });
    return res.status(201).json(intake);
    } catch (error) {
  console.error(error);

  return res.status(500).json({
    error: "Failed to create intake",
  });
}
});
  

// GET CURRENT USER'S INTAKE
intakeRouter.get("/survey", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          error: "Unauthorized",
        });
      }

      const intake = await prisma.userInfo.findUnique({
        where: {
          userId: user.id,
        },
      });

      return res.status(200).json(intake);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to get intake information" });
    }
  }
);

// GET ALL INTAKE
intakeRouter.get("/intake", async (req, res) => {
  try {
    const intake = await prisma.userInfo.findMany();

      res.status(200).json(intake);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Failed to get intake information",
      });
    }
  }
);
// UPDATE INTAKE
intakeRouter.put( "/survey",passport.authenticate("jwt", { session: false }),async (req, res) => {
  try {
    const user = req.user;

if (!user) {
  return res.status(401).json({
    error: "Unauthorized",
  });
}
    const {
      age,
      feet,
      inches,
      weight,
      sex,
      bmi,
      activityFrequency,
      activityType,
      fitnessGoal,
    } = req.body;

    const existingInfo = await prisma.userInfo.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!existingInfo) {
      return res.status(404).json({
        error: "Intake information not found",
      });
    }
    const intake = await prisma.userInfo.update({
  where: {
    userId: user.id,
  },
  data: {
    age: Number(age),
    heightFeet: Number(feet),
    heightInches: Number(inches),
    weight: Number(weight),
    sex,
    activityFrequency,
    activityType,
    fitnessGoal,
  },
});

return res.status(200).json(intake);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update intake information" });
  }
  }
);


// DELETE CURRENT USER'S INTAKE
intakeRouter.delete(
  "/survey",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          error: "Unauthorized",
        });
      }

      const existingInfo = await prisma.userInfo.findUnique({
        where: {
          userId: user.id,
        },
      });

      if (!existingInfo) {
        return res.status(404).json({
          error: "Intake information not found",
        });
      }

      await prisma.userInfo.delete({
        where: {
          userId: user.id,
        },
      });

      return res.status(200).json({
        message: "Intake information deleted successfully",
      });

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error: "Failed to delete intake information",
      });
    }
  }
);

export default intakeRouter;