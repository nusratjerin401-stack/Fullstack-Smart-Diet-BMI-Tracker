// @ts-nocheck
// JC approved nocheck 2026-08-11
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

import express from "express";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/prisma/client.js";

const router = express.Router();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });


// CREATE USER
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: "Account created successfully",
      uuid: user.uuid,
      name: user.name,
      email: user.email,
    });

  } catch (error) {
    console.error(error);
    console.log(req.body);
   res.status(500).json({
  message: "Failed to create user",
    });
  }
});


// GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    res.json(users);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get users",
    });
  }
});


// GET ONE USER
router.get("/users/:id", async (req, res) => {
  try {
    const { uuid } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

   console.log('puta');
    res.json(user);
  } catch (error) {
    console.error(error);
    console.error(req.params);
    res.status(500).json({
      message: "Failed to get user",
    });
  }
});


// UPDATE USER, /users/:id
router.put("/", async (req, res) => {
  try {
    const { uuid } = req.params;
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        uuid,
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const data: {
      name?: string;
      email?: string;
      password?: string;
    } = {};

    if (name) data.name = name;
    if (email) data.email = email;

    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
      where: {
        uuid,
      },
      data,
      select: {
        uuid: true,
        name: true,
        email: true,
      },
    });

    res.json(user);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update user",
    });
  }
});


// DELETE USER
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const existingUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await prisma.user.delete({
      where: {
        uuid,
      },
    });

    res.json({
      message: "User deleted successfully",
    });

  } catch (error) {
    console.error(error);
   console.log(req.params);
    res.status(500).json({
      message: "Failed to delete user",
    });
  }
});


export default router;