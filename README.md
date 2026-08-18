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





# RAMANPREET WORK — Database Phase

**Branch:** `ramanpreet` · **Scope:** Prisma schema, PostgreSQL database, the "Any Day's Meals" feature (backend + frontend), and dummy seed data.

This section discloses exactly what I built, which files it lives in, and how AI tools were used, so the team (and my instructor) can see my individual contribution clearly.

## 1. Prisma Schema (`prisma/schema.prisma`)

* Defined the `MealType` enum (`BREAKFAST`, `LUNCH`, `DINNER`, `SNACK`) and the `Meal` / `MealItem` models that replace the earlier BMI-tracker design.
* Set up a one-to-many relationship: one `Meal` has many `MealItem` records, with `onDelete: Cascade` on `MealItem` so deleting a meal automatically removes its line items.
* Mapped every model/field to snake_case table and column names with `@map` / `@@map` (e.g. `Meal` → `meals`, `mealType` → `meal_type`, `MealItem` → `meal_items`, `foodName` → `food_name`) to match SQL naming conventions.
* Configured the Prisma Client generator (`provider = "prisma-client"`, custom `output` path) and the PostgreSQL datasource.

## 2. Database Migration & Setup

* Ran `npx prisma migrate dev` to apply the schema as a single migration, `init_nutribloom_schema`, creating the `meals` and `meal_items` tables plus the `MealType` enum directly in PostgreSQL.
* Verified the generated SQL (foreign key, cascade rule, defaults) matches the intended schema before sharing the branch with the team.
* Cleaned up a stray `my-prisma-project/` folder at the repo root that referenced MySQL and could confuse teammates about which database/config is authoritative.

## 3. "Any Day's Meals" (Backend + Frontend)

* **Backend:** added a `GET /day-meals` Express route (`server/src/dayMeals.ts`), wired it into the app in `server/src/index.ts`.
* **Frontend:** built the `DayMeals` Ionic React page (`client/src/pages/DayMeals.tsx`) that lists a day's Breakfast/Lunch/Dinner/Snack entries, and registered the `/day-meals` route in `client/src/App.tsx`.
* **Current status:** the route and page currently serve representative sample meals so the feature is demoable end-to-end. Connecting `dayMeals.ts` to Prisma so it queries real `Meal`/`MealItem` rows is the next step (see *Next Steps* below).

## 4. Dummy Seed Data (`prisma/seed.ts`)

* Wrote a Prisma seed script using `@faker-js/faker` to generate realistic dummy records for local development and demos, and wired it into `prisma.config.ts` so it runs via `npx prisma db seed`.
* Used the seeded data to sanity-check the schema, relations, and cascade delete behavior in Prisma Studio before treating the migration as final.

---

## AI Usage Disclosure

* **Tools used:** Gemini (Google AI) during initial development on this branch; Claude (Anthropic) for reviewing/reorganizing this README and preparing a presentation of the work.
* **AI helped with:**
  * Drafting and refactoring the Prisma schema (models, enum, relations, cascade delete, `@map`/`@@map` naming).
  * Reconciling the database design with the final NutriBloom project spec and removing the deprecated user/BMI entities.
  * Structuring the `faker-js`-based seed script and the CLI migration/seeding workflow.
  * Scaffolding the `/day-meals` route and page, and organizing/cleaning up this README.
* **What I did myself:** reviewed and customized every AI suggestion, ran and verified all migrations and seed commands against my local PostgreSQL database, tested the API route and the Ionic page in the browser, and made the final calls on schema and file structure. No code was committed without reading and understanding it first.

## Known Issues / Next Steps (for transparency)

* `prisma/seed.ts` predates the current `Meal`/`MealItem`-only schema and still targets an older `User`-based data shape — it needs an update before it will run cleanly against the `init_nutribloom_schema` migration.
* `server/src/dayMeals.ts` and `DayMeals.tsx` currently return/display static sample data; the next unblocked task is wiring the route to Prisma (`POST /api/meals`, and a Prisma-backed `GET /day-meals`) so it reads real rows from the database.
* Need to confirm with Devonte that his branch's schema expectations still line up with `Meal`/`MealItem` before merging `ramanpreet` into `main`.

---

## Viewing Recharts (Charts)

To see the Recharts visualizations (MacroPieChart, CalorieBarChart, BMITrendChart) locally, run these steps from the project root.

1. Install root and client dependencies:

```bash
cd /Users/ramanpreetsingh/citytech-ttpr-2026-summer/Fullstack-Smart-Diet-BMI-Tracker
npm install
cd client
npm install
```

2. Seed the database (ensure `DATABASE_URL` in `.env` is set):

```bash
cd /Users/ramanpreetsingh/citytech-ttpr-2026-summer/Fullstack-Smart-Diet-BMI-Tracker
npx prisma db seed
```

3. Start the backend API (optional — needed if you want server-driven pages/endpoints):

```bash
cd server
npm run dev
```

4. Start the client dev server and open the dashboard:

```bash
cd client
npm run dev
# Open http://localhost:5173 (Vite default) and navigate to /dashboard
# Or open the app root and click the "Dashboard" button on the Home page
```

Notes:
- If the dev server uses a different port, follow the terminal output link (Vite prints the local URL).
- The dashboard page is at `/dashboard`; the Home page includes a quick navigation button to the Dashboard.

---

## Recharts Display Implementation (What I did)

Branch: `ramanpreet`

- **Files added:**
  - [client/src/components/charts/MacroPieChart.tsx](client/src/components/charts/MacroPieChart.tsx)
  - [client/src/components/charts/CalorieBarChart.tsx](client/src/components/charts/CalorieBarChart.tsx)
  - [client/src/components/charts/BMITrendChart.tsx](client/src/components/charts/BMITrendChart.tsx)
  - [client/src/pages/Dashboard.tsx](client/src/pages/Dashboard.tsx)

- **Client routing & navigation:**
  - Added a `/dashboard` route in [client/src/App.tsx](client/src/App.tsx#L1) and a Dashboard button on the Home page ([client/src/pages/Home.tsx](client/src/pages/Home.tsx#L1)).

- **Dependencies:**
  - Added `recharts` to `client/package.json` and installed it locally.

- **Seed & data flow:**
  - Created/updated `prisma/seed.ts` to generate dummy users, BMI history and meals.
  - Verified seed data via `npx prisma db seed` and optionally `npx prisma studio`.

- **How the charts are wired:**
  - Charts are self-contained React components using static demo data by default (in the chart files) so the Dashboard renders immediately.
  - To wire charts to real seeded data: implement a fetch to the backend endpoint (e.g. `/day-meals`) from `Dashboard` or a child component, map DB fields to chart data shapes, and pass results as props to the chart components.

* **Tools Used:** Gemini (Google AI)
* **Scope of Assistance:**
  * Drafted technical documentation, pull request summaries, and conceptual overviews for database synchronization and seeding workflows.
  * Assisted in structuring synthetic data generation patterns using `@faker-js/faker` within Prisma transaction methods.
* **Human Oversight & Verification:** All database schema changes, client paths, dependency installations, and seed scripts were reviewed, customized, executed, and validated directly in the local repository environment on branch `ramanpreet`.

## BMI, Activity Level, and Daily Recommended Values

### 1. BMI Calculation
BMI is calculated from the user's height and weight.

Formula:
BMI = (weight in pounds × 703) / height in inches²

BMI categories:
- Below 18.5 → Underweight
- 18.5–24.9 → Healthy Weight
- 25–29.9 → Overweight
- 30 or higher → Obesity

### 2. Activity Level
The user's activity type and frequency will be mapped to an activity category.

- None/Infrequent → Sedentary
- 1–2 times/week → Lightly Active
- 3–5 times/week → Moderately Active
- 6+ times/week → Very Active

The activity category will be used to determine the user's daily calorie needs.

### 3. Daily Recommended Values (DRV)

Daily Recommended Values are nutrition targets used to compare a user's daily nutrient intake with recommended amounts.

Examples include:
- Calories
- Protein
- Carbohydrates
- Fat
- Cholesterol

# Daily Values Calculation
 %DV= ( anount the user ate % Daily Values) * 100

For example: if a food contains 15 g of fat:
%DV = (15 % 78) * 100
%DV = 19.2%

Some nutrients have recommended minimum amounts, while others have recommended maximum limits. Recommended values may vary based on factors such as age and sex.

### 4. Application Flow
User enters information → BMI is calculated → Activity level is determined → Daily Recommended Values are determined → Results can be displayed on the dashboard.


*AI disclosure for this Recharts work is covered under the [AI Usage Disclosure](#ai-usage-disclosure) above — Gemini helped scaffold the chart components, the `Dashboard` route, and this section's run instructions; I reviewed, adapted, and tested all of it locally.*git 
