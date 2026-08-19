import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import express from "express";
import mealRoutes from "./src/routes/meals.js";
import type { Request, Response } from "express";
import dayMealsRouter from "./src/dayMeals.js";
import intakeRoutes from "./src/routes/intake.js";
import signupRoutes from "./src/routes/sign-up.js";
import loginRoutes from "./src/routes/login.js";
import foodSearchRoutes from "./src/routes/foodSearch.js";

const app = express();


// JSON middleware MUST come before routes
app.use(express.json());

app.use(dayMealsRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Diet API is running!");
});

// Authentication routes
app.use("/", signupRoutes);
app.use("/", loginRoutes);

// API routes
app.use("/api", mealRoutes);
app.use("/api", intakeRoutes);
app.use("/api", foodSearchRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});