/*
  Warnings:

  - A unique constraint covering the columns `[store_id,name]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `products` table without a default value. This is not possible if the table is not empty.
  - Made the column `slug` on table `stores` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updated_at` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SampleStatus" AS ENUM ('RECEIVED', 'IN_ANALYSIS', 'COMPLETED', 'REPORTED', 'CANCELED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'TECHNICIAN';
ALTER TYPE "Role" ADD VALUE 'VIEWER';

-- AlterEnum
ALTER TYPE "SubscriptionStatus" ADD VALUE 'TRIALING';

-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "reports" ADD COLUMN     "observations" TEXT,
ADD COLUMN     "sample_id" TEXT,
ADD COLUMN     "sequence" INTEGER;

-- AlterTable
ALTER TABLE "stores" ADD COLUMN     "logo_url" TEXT,
ADD COLUMN     "primary_color" TEXT,
ADD COLUMN     "responsible_technician" TEXT,
ADD COLUMN     "technician_registration" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "subscriptions" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "samples" (
    "id" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "client_id" TEXT,
    "code" TEXT NOT NULL,
    "identification" TEXT,
    "location" TEXT,
    "collection_date" TIMESTAMP(3),
    "received_date" TIMESTAMP(3),
    "collector_name" TEXT,
    "latitude" TEXT,
    "longitude" TEXT,
    "weather_condition" TEXT,
    "ambient_temperature" TEXT,
    "status" "SampleStatus" NOT NULL DEFAULT 'RECEIVED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "samples_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lab_parameters" (
    "id" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "section" "ReportSection" NOT NULL,
    "unit" TEXT,
    "method" TEXT,
    "vmp" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lab_parameters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "user_id" TEXT,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "payload" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "samples_store_id_idx" ON "samples"("store_id");

-- CreateIndex
CREATE INDEX "samples_client_id_idx" ON "samples"("client_id");

-- CreateIndex
CREATE INDEX "samples_status_idx" ON "samples"("status");

-- CreateIndex
CREATE UNIQUE INDEX "samples_store_id_code_key" ON "samples"("store_id", "code");

-- CreateIndex
CREATE INDEX "lab_parameters_store_id_idx" ON "lab_parameters"("store_id");

-- CreateIndex
CREATE INDEX "lab_parameters_section_idx" ON "lab_parameters"("section");

-- CreateIndex
CREATE UNIQUE INDEX "lab_parameters_store_id_name_section_key" ON "lab_parameters"("store_id", "name", "section");

-- CreateIndex
CREATE INDEX "audit_logs_store_id_idx" ON "audit_logs"("store_id");

-- CreateIndex
CREATE INDEX "audit_logs_user_id_idx" ON "audit_logs"("user_id");

-- CreateIndex
CREATE INDEX "audit_logs_entity_entityId_idx" ON "audit_logs"("entity", "entityId");

-- CreateIndex
CREATE INDEX "cities_state_id_idx" ON "cities"("state_id");

-- CreateIndex
CREATE INDEX "clients_store_id_name_idx" ON "clients"("store_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "products_store_id_name_key" ON "products"("store_id", "name");

-- CreateIndex
CREATE INDEX "refresh_tokens_expires_at_idx" ON "refresh_tokens"("expires_at");

-- CreateIndex
CREATE INDEX "report_result_rows_section_idx" ON "report_result_rows"("section");

-- CreateIndex
CREATE INDEX "reports_sample_id_idx" ON "reports"("sample_id");

-- CreateIndex
CREATE INDEX "reports_store_id_created_at_idx" ON "reports"("store_id", "created_at");

-- CreateIndex
CREATE INDEX "reports_status_idx" ON "reports"("status");

-- CreateIndex
CREATE INDEX "stores_city_id_idx" ON "stores"("city_id");

-- CreateIndex
CREATE INDEX "subcategories_category_id_idx" ON "subcategories"("category_id");

-- CreateIndex
CREATE INDEX "subscriptions_status_idx" ON "subscriptions"("status");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- AddForeignKey
ALTER TABLE "samples" ADD CONSTRAINT "samples_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "samples" ADD CONSTRAINT "samples_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lab_parameters" ADD CONSTRAINT "lab_parameters_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_sample_id_fkey" FOREIGN KEY ("sample_id") REFERENCES "samples"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
