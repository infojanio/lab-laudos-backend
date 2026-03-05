/*
  Warnings:

  - You are about to drop the column `cashback_percentage` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `stores` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `stores` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `stores` table. All the data in the column will be lost.
  - You are about to drop the column `ratingCount` on the `stores` table. All the data in the column will be lost.
  - You are about to drop the column `cityId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `postal_code` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Plan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PaymentTypeToStore` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `banners` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `business_category_cities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cart_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `carts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cashback_transactions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cashbacks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `checkins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `coupon_redemptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `coupons` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mission_progresses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `missions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payment_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reels` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `store_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `store_discounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `store_draws` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `store_evaluations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `store_points_transactions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `store_points_wallets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `store_reward_redemptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `store_rewards` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_locations` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name,category_id]` on the table `subcategories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "AnalysisType" AS ENUM ('AGUA', 'SOLO', 'AMBIENTAL', 'CLINICO', 'INDUSTRIAL');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('VALIDO', 'SUBSTITUIDO', 'CANCELADO', 'EM_ANALISE');

-- CreateEnum
CREATE TYPE "ReportSection" AS ENUM ('FISICO_QUIMICO', 'MICROBIOLOGICO');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('REAGENT', 'MATERIAL', 'EQUIPMENT', 'OTHER');

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'SUPER_ADMIN';

-- DropForeignKey
ALTER TABLE "_PaymentTypeToStore" DROP CONSTRAINT "_PaymentTypeToStore_A_fkey";

-- DropForeignKey
ALTER TABLE "_PaymentTypeToStore" DROP CONSTRAINT "_PaymentTypeToStore_B_fkey";

-- DropForeignKey
ALTER TABLE "banners" DROP CONSTRAINT "banners_storeId_fkey";

-- DropForeignKey
ALTER TABLE "business_category_cities" DROP CONSTRAINT "business_category_cities_business_category_id_fkey";

-- DropForeignKey
ALTER TABLE "business_category_cities" DROP CONSTRAINT "business_category_cities_city_id_fkey";

-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_cart_id_fkey";

-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_product_id_fkey";

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_store_id_fkey";

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "cashback_transactions" DROP CONSTRAINT "cashback_transactions_orderId_fkey";

-- DropForeignKey
ALTER TABLE "cashback_transactions" DROP CONSTRAINT "cashback_transactions_store_id_fkey";

-- DropForeignKey
ALTER TABLE "cashback_transactions" DROP CONSTRAINT "cashback_transactions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "cashbacks" DROP CONSTRAINT "cashbacks_orderId_fkey";

-- DropForeignKey
ALTER TABLE "cashbacks" DROP CONSTRAINT "cashbacks_store_id_fkey";

-- DropForeignKey
ALTER TABLE "cashbacks" DROP CONSTRAINT "cashbacks_user_id_fkey";

-- DropForeignKey
ALTER TABLE "checkins" DROP CONSTRAINT "checkins_store_id_fkey";

-- DropForeignKey
ALTER TABLE "checkins" DROP CONSTRAINT "checkins_user_id_fkey";

-- DropForeignKey
ALTER TABLE "coupon_redemptions" DROP CONSTRAINT "coupon_redemptions_coupon_id_fkey";

-- DropForeignKey
ALTER TABLE "coupon_redemptions" DROP CONSTRAINT "coupon_redemptions_orderId_fkey";

-- DropForeignKey
ALTER TABLE "coupon_redemptions" DROP CONSTRAINT "coupon_redemptions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "coupons" DROP CONSTRAINT "coupons_store_id_fkey";

-- DropForeignKey
ALTER TABLE "mission_progresses" DROP CONSTRAINT "mission_progresses_mission_id_fkey";

-- DropForeignKey
ALTER TABLE "mission_progresses" DROP CONSTRAINT "mission_progresses_user_id_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_order_id_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_product_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_store_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_user_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_store_id_fkey";

-- DropForeignKey
ALTER TABLE "refresh_tokens" DROP CONSTRAINT "refresh_tokens_user_id_fkey";

-- DropForeignKey
ALTER TABLE "store_categories" DROP CONSTRAINT "store_categories_category_id_fkey";

-- DropForeignKey
ALTER TABLE "store_categories" DROP CONSTRAINT "store_categories_store_id_fkey";

-- DropForeignKey
ALTER TABLE "store_discounts" DROP CONSTRAINT "store_discounts_store_id_fkey";

-- DropForeignKey
ALTER TABLE "store_draws" DROP CONSTRAINT "store_draws_store_id_fkey";

-- DropForeignKey
ALTER TABLE "store_evaluations" DROP CONSTRAINT "store_evaluations_store_id_fkey";

-- DropForeignKey
ALTER TABLE "store_evaluations" DROP CONSTRAINT "store_evaluations_user_id_fkey";

-- DropForeignKey
ALTER TABLE "store_points_transactions" DROP CONSTRAINT "store_points_transactions_order_id_fkey";

-- DropForeignKey
ALTER TABLE "store_points_transactions" DROP CONSTRAINT "store_points_transactions_storePointsWalletId_fkey";

-- DropForeignKey
ALTER TABLE "store_points_transactions" DROP CONSTRAINT "store_points_transactions_store_id_fkey";

-- DropForeignKey
ALTER TABLE "store_points_transactions" DROP CONSTRAINT "store_points_transactions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "store_points_wallets" DROP CONSTRAINT "store_points_wallets_store_id_fkey";

-- DropForeignKey
ALTER TABLE "store_points_wallets" DROP CONSTRAINT "store_points_wallets_user_id_fkey";

-- DropForeignKey
ALTER TABLE "store_reward_redemptions" DROP CONSTRAINT "store_reward_redemptions_reward_id_fkey";

-- DropForeignKey
ALTER TABLE "store_reward_redemptions" DROP CONSTRAINT "store_reward_redemptions_store_id_fkey";

-- DropForeignKey
ALTER TABLE "store_reward_redemptions" DROP CONSTRAINT "store_reward_redemptions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "store_rewards" DROP CONSTRAINT "store_rewards_store_id_fkey";

-- DropForeignKey
ALTER TABLE "stores" DROP CONSTRAINT "stores_city_id_fkey";

-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_store_id_fkey";

-- DropForeignKey
ALTER TABLE "user_locations" DROP CONSTRAINT "user_locations_user_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_cityId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_storeId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "cashback_percentage",
DROP COLUMN "price",
ADD COLUMN     "expires_at" TIMESTAMP(3),
ADD COLUMN     "lot_number" TEXT,
ADD COLUMN     "type" "ProductType" NOT NULL DEFAULT 'REAGENT',
ADD COLUMN     "unit" TEXT,
ALTER COLUMN "quantity" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "stores" DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "rating",
DROP COLUMN "ratingCount",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "signature_image_url" TEXT,
ADD COLUMN     "state" TEXT,
ALTER COLUMN "city_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "cityId",
DROP COLUMN "postal_code",
DROP COLUMN "state",
DROP COLUMN "storeId",
DROP COLUMN "street",
ADD COLUMN     "store_id" TEXT;

-- DropTable
DROP TABLE "Plan";

-- DropTable
DROP TABLE "_PaymentTypeToStore";

-- DropTable
DROP TABLE "banners";

-- DropTable
DROP TABLE "business_category_cities";

-- DropTable
DROP TABLE "cart_items";

-- DropTable
DROP TABLE "carts";

-- DropTable
DROP TABLE "cashback_transactions";

-- DropTable
DROP TABLE "cashbacks";

-- DropTable
DROP TABLE "checkins";

-- DropTable
DROP TABLE "coupon_redemptions";

-- DropTable
DROP TABLE "coupons";

-- DropTable
DROP TABLE "mission_progresses";

-- DropTable
DROP TABLE "missions";

-- DropTable
DROP TABLE "order_items";

-- DropTable
DROP TABLE "orders";

-- DropTable
DROP TABLE "payment_types";

-- DropTable
DROP TABLE "reels";

-- DropTable
DROP TABLE "store_categories";

-- DropTable
DROP TABLE "store_discounts";

-- DropTable
DROP TABLE "store_draws";

-- DropTable
DROP TABLE "store_evaluations";

-- DropTable
DROP TABLE "store_points_transactions";

-- DropTable
DROP TABLE "store_points_wallets";

-- DropTable
DROP TABLE "store_reward_redemptions";

-- DropTable
DROP TABLE "store_rewards";

-- DropTable
DROP TABLE "user_locations";

-- DropEnum
DROP TYPE "CartStatus";

-- DropEnum
DROP TYPE "CashbackStatus";

-- DropEnum
DROP TYPE "CashbackTransactionType";

-- DropEnum
DROP TYPE "CouponType";

-- DropEnum
DROP TYPE "DiscountType";

-- DropEnum
DROP TYPE "MissionType";

-- DropEnum
DROP TYPE "OrderStatus";

-- DropEnum
DROP TYPE "RedemptionStatus";

-- DropEnum
DROP TYPE "RewardType";

-- DropEnum
DROP TYPE "StorePointsTxType";

-- CreateTable
CREATE TABLE "plans" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "report_limit" INTEGER NOT NULL DEFAULT 1000,
    "user_limit" INTEGER NOT NULL DEFAULT 10,
    "storage_gb" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "document" TEXT,
    "phone" TEXT,
    "company" TEXT,
    "address" TEXT,
    "municipality" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "client_id" TEXT,
    "report_number" TEXT,
    "analysisType" "AnalysisType" NOT NULL,
    "status" "ReportStatus" NOT NULL DEFAULT 'EM_ANALISE',
    "sample_date" TIMESTAMP(3),
    "issue_date" TIMESTAMP(3),
    "entry_date" TIMESTAMP(3),
    "collection_time" TEXT,
    "identification" TEXT,
    "location" TEXT,
    "collection_agent" TEXT,
    "responsible_technician" TEXT,
    "technician_registration" TEXT,
    "description" TEXT,
    "signed_pdf_url" TEXT,
    "vmp_reference" TEXT,
    "qr_code_url" TEXT,
    "public_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_result_rows" (
    "id" TEXT NOT NULL,
    "report_id" TEXT NOT NULL,
    "section" "ReportSection" NOT NULL,
    "parameter" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "unit" TEXT,
    "method" TEXT,
    "vmp" TEXT,
    "notes" TEXT,
    "order" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "report_result_rows_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "clients_store_id_idx" ON "clients"("store_id");

-- CreateIndex
CREATE UNIQUE INDEX "clients_store_id_document_key" ON "clients"("store_id", "document");

-- CreateIndex
CREATE INDEX "reports_store_id_idx" ON "reports"("store_id");

-- CreateIndex
CREATE INDEX "reports_client_id_idx" ON "reports"("client_id");

-- CreateIndex
CREATE INDEX "report_result_rows_report_id_idx" ON "report_result_rows"("report_id");

-- CreateIndex
CREATE INDEX "products_store_id_idx" ON "products"("store_id");

-- CreateIndex
CREATE INDEX "products_subcategory_id_idx" ON "products"("subcategory_id");

-- CreateIndex
CREATE INDEX "refresh_tokens_user_id_idx" ON "refresh_tokens"("user_id");

-- CreateIndex
CREATE INDEX "store_business_categories_store_id_idx" ON "store_business_categories"("store_id");

-- CreateIndex
CREATE INDEX "store_business_categories_category_id_idx" ON "store_business_categories"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "subcategories_name_category_id_key" ON "subcategories"("name", "category_id");

-- CreateIndex
CREATE INDEX "subscriptions_store_id_idx" ON "subscriptions"("store_id");

-- CreateIndex
CREATE INDEX "subscriptions_plan_id_idx" ON "subscriptions"("plan_id");

-- CreateIndex
CREATE INDEX "users_store_id_idx" ON "users"("store_id");

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_result_rows" ADD CONSTRAINT "report_result_rows_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;
