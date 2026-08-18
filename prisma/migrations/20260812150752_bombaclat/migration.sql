/*
  Warnings:

  - You are about to drop the column `calories` on the `meal_items` table. All the data in the column will be lost.
  - You are about to drop the column `food_name` on the `meal_items` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `meal_items` table. All the data in the column will be lost.
  - The primary key for the `meals` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `meal_type` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `total_calories` on the `meals` table. All the data in the column will be lost.
  - Added the required column `energy_kcal` to the `meal_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portion` to the `meal_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sugar` to the `meal_items` table without a default value. This is not possible if the table is not empty.
  - The required column `meal_id` was added to the `meals` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `uuid` to the `meals` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "meal_items" DROP CONSTRAINT "meal_items_meal_id_fkey";

-- AlterTable
ALTER TABLE "meal_items" DROP COLUMN "calories",
DROP COLUMN "food_name",
DROP COLUMN "quantity",
ADD COLUMN     "energy_kcal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "portion" TEXT NOT NULL,
ADD COLUMN     "sugar" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "meal_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "meals" DROP CONSTRAINT "meals_pkey",
DROP COLUMN "created_at",
DROP COLUMN "date",
DROP COLUMN "id",
DROP COLUMN "meal_type",
DROP COLUMN "total_calories",
ADD COLUMN     "meal_id" TEXT NOT NULL,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "meals_pkey" PRIMARY KEY ("meal_id");

-- DropEnum
DROP TYPE "MealType";

-- CreateTable
CREATE TABLE "user" (
    "uuid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "user_info" (
    "uuid" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "sex" TEXT NOT NULL,
    "bmi" DOUBLE PRECISION NOT NULL,
    "activity_frequency" TEXT NOT NULL,
    "activity_type" TEXT NOT NULL,
    "fitness_goal" TEXT NOT NULL,

    CONSTRAINT "user_info_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "user_info" ADD CONSTRAINT "user_info_uuid_fkey" FOREIGN KEY ("uuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_uuid_fkey" FOREIGN KEY ("uuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_items" ADD CONSTRAINT "meal_items_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meals"("meal_id") ON DELETE CASCADE ON UPDATE CASCADE;
