// @ts-nocheck
// JC approved nocheck 2026-08-11

import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import express from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/prisma/client.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

const loginRouter = express.Router();
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET){
  throw new Error("JWT SECRET not set. copy to .env first");
}

// verify email + password at login
passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return done(null, false, { message: "Invalid credentials" });
    }
    return done(null, user);
  })
);




// POST LOGIN, /login
loginRouter.post("/login", passport.authenticate("local", {session: false}), async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    const token = jwt.sign({sub: user.id}, JWT_SECRET, { expiresIn: "1h"});

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      message: "Login successful",
      uuid: user.id,
      name: user.name,
      email: user.email,
      token: token
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to login",
    });
  }
});

export default loginRouter;
