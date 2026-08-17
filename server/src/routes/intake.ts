// @ts-nocheck
// JC approved nocheck 2026-08-11
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import express from "express";
import passport from "passport";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/prisma/client.js";

const router = express.Router();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });


// CREATE INTAKE
router.post("/survey",passport.authenticate("jwt", { session: false }),async (req, res) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          error: "Unauthorized",
        });
      }

      const {
        age,
        sex,
        heightFeet,
        heightInches,
        weight,
        activityType,
        activityFrequency,
        fitnessGoal,
      } = req.body;

      const existingInfo = await prisma.userInfo.findUnique({
        where: {
          userId: user.id,
        },
      });

      if (existingInfo) {
        return res.status(409).json({
          error: "Intake information already exists for this user",
        });
      }

      const intake = await prisma.userInfo.create({
        data: {
          userId: user.id,
          age: Number(age),
          sex,
          heightFeet: Number(heightFeet),
          heightInches: Number(heightInches),
          weight: Number(weight),
          activityType,
          activityFrequency,
          fitnessGoal,
        },
      });

      res.status(201).json(intake);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Failed to create intake",
      });
    }
  }
);


// GET CURRENT USER'S INTAKE
router.get("/survey",passport.authenticate("jwt", { session: false }),async (req, res) => {
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

      if (!intake) {
        return res.status(404).json({
          error: "Intake information not found",
        });
      }

      res.status(200).json(intake);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Failed to get intake information",
      });
    }
  }
);


// UPDATE CURRENT USER'S INTAKE
router.put("/survey",passport.authenticate("jwt", { session: false }),async (req, res) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          error: "Unauthorized",
        });
      }

      const {
        age,
        sex,
        heightFeet,
        heightInches,
        weight,
        activityType,
        activityFrequency,
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
          sex,
          heightFeet: Number(heightFeet),
          heightInches: Number(heightInches),
          weight: Number(weight),
          activityType,
          activityFrequency,
          fitnessGoal,
        },
      });

      res.status(200).json(intake);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Failed to update intake information",
      });
    }
  }
);


// DELETE CURRENT USER'S INTAKE
router.delete("/survey",passport.authenticate("jwt", { session: false }),async (req, res) => {
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

      res.status(200).json({
        message: "Intake information deleted successfully",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Failed to delete intake information",
      });
    }
  }
);


export default router;