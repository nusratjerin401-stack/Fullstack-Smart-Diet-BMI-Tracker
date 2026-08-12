# Title
NutriBloom

# Description
NutriBloom is a full-stack diet planning application that creates personalized meal recommendations based on a user's age, height, weight, and BMI. It helps users make healthier food choices without eliminating their favorite meals by suggesting portion sizes and lower-calorie alternatives. The app features a balanced mix of American and Bangladeshi foods, nutrition information, and calorie tracking to support sustainable and realistic healthy eating habits

# Members:
    - MST
    - Nusrat
    - Jacob
    - Devonte
    - Ramanpreet



## Quickstart

1. install dependencies
```
cd server
yarn

cd ../client
yarn

cd ../
yarn
```

2. create .env
```
cp .env.example .env
# edit .env with your database credentials
```

3. update database
```
yarn prisma migrate dev
```

4. generate prisma client
```
yarn prisma generate
```

5. start server
```
cd server
yarn dev
```

6. start client
```
cd client
yarn dev
```



# RAMANPREET WORK


## Prisma Schema Disclosure

### What I created

* **Configured Prisma Client & Datasource:**
* Generator: `provider = "prisma-client"`, `output = "../generated/prisma"`
* Datasource: `provider = "postgresql"`


* **Defined Models & Enums:**
* `MealType` (Enum: `BREAKFAST`, `LUNCH`, `DINNER`, `SNACK`)
* `Meal`
* `MealItem`


* **Implemented Relationships & Constraints:**
* `Meal` has many `MealItem` (1 : Many)
* `MealItem` belongs to `Meal` with `onDelete: Cascade` (ensuring cascading deletion of items when a meal is removed)


* **Field Mappings (`@map` / `@@map`):**
* `Meal` table → `meals` (`mealType` → `meal_type`, `totalCalories` → `total_calories`, `createdAt` → `created_at`)
* `MealItem` table → `meal_items` (`mealId` → `meal_id`, `foodName` → `food_name`)



### AI usage disclosure

* I used generative AI assistance to draft, refactor, and review this schema design.
* Reconciling the initial database design with the final NutriBloom project specification.
* Restructuring models to drop deprecated user/BMI entities and implement the `Meal` / `MealItem` relational schema.
* Configuring PostgreSQL enums, cascading deletes, and snake_case column mappings.
* Formulating step-by-step CLI migration workflows (`prisma migrate dev`).


> This schema serves as the PostgreSQL persistence layer for NutriBloom, supporting meal logging, nutritional breakdown tracking (calories, protein, carbs, fat), and cascading meal deletions.

---

## Dummy Seed Data Development & Implementation Details

### Database Synchronization & Seeding Implementation
* **Schema Alignment:** Synchronized `schema.prisma` with the live PostgreSQL database structure (`meals` and `meal_items` tables) using Prisma introspection (`db pull`) to resolve schema drift.
* **Environment Configuration:** Configured the root project dependencies (`@prisma/client`, `@prisma/adapter-pg`, `@faker-js/faker`, `tsx`) and linked the seeding pipeline inside `prisma.config.ts`.
* **Seed Script Development (`prisma/seed.ts`):** 
  * Updated generated client imports to resolve from `../generated/prisma/client`.
  * Corrected payload fields to map directly to schema column names: `meal_type`, `total_calories`, and `food_name`.
  * Built relational batch seeding to generate 200 meals across a 90-day window with associated nested meal items (macronutrients, quantities, and calories).

---

## AI Collaboration Statement

* **Tools Used:** Gemini (Google AI)
* **Scope of Assistance:**
  * Drafted technical documentation, pull request summaries, and conceptual overviews for database synchronization and seeding workflows.
  * Assisted in structuring synthetic data generation patterns using `@faker-js/faker` within Prisma transaction methods.
* **Human Oversight & Verification:** All database schema changes, client paths, dependency installations, and seed scripts were reviewed, customized, executed, and validated directly in the local repository environment on branch `ramanpreet`.
