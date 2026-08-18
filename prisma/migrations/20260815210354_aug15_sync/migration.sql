/*
  Warnings:

  - The primary key for the `meal_items` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `energy_kcal` on the `meal_items` table. All the data in the column will be lost.
  - You are about to drop the column `sugar` on the `meal_items` table. All the data in the column will be lost.
  - The primary key for the `meals` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `meal_id` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `meals` table. All the data in the column will be lost.
  - The primary key for the `user_info` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bmi` on the `user_info` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `user_info` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `user_info` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `calories` to the `meal_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `food_name` to the `meal_items` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `meals` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `meal_type` to the `meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height_feet` to the `user_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height_inches` to the `user_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `user_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_info` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MealType" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK');

-- DropForeignKey
ALTER TABLE "meal_items" DROP CONSTRAINT "meal_items_meal_id_fkey";

-- DropForeignKey
ALTER TABLE "meals" DROP CONSTRAINT "meals_uuid_fkey";

-- DropForeignKey
ALTER TABLE "user_info" DROP CONSTRAINT "user_info_uuid_fkey";

-- AlterTable
ALTER TABLE "meal_items" DROP CONSTRAINT "meal_items_pkey",
DROP COLUMN "energy_kcal",
DROP COLUMN "sugar",
ADD COLUMN     "calories" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "food_name" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "meal_items_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "meal_items_id_seq";

-- AlterTable
ALTER TABLE "meals" DROP CONSTRAINT "meals_pkey",
DROP COLUMN "meal_id",
DROP COLUMN "timestamp",
DROP COLUMN "uuid",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "meal_type" "MealType" NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "meals_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user_info" DROP CONSTRAINT "user_info_pkey",
DROP COLUMN "bmi",
DROP COLUMN "height",
DROP COLUMN "uuid",
ADD COLUMN     "height_feet" INTEGER NOT NULL,
ADD COLUMN     "height_inches" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "user_info_pkey" PRIMARY KEY ("user_id");

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "user_info" ADD CONSTRAINT "user_info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_items" ADD CONSTRAINT "meal_items_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
