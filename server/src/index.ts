import express from "express";
import router from "./routes/meals.js";
import type { Request, Response } from "express";
import cors from "cors";

<<<<<<< HEAD
//const express = await import("express") as any;
//import express = require('express');
// @ts-ignore
const app = express(); 
=======
const app = express();
>>>>>>> main
const json = express.json;

app.use(cors({
  origin: "http://localhost:8100",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))
app.use(json());
app.use("/meal", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Diet API is running!");
});

//app.use("/api", mealRoutes);
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
