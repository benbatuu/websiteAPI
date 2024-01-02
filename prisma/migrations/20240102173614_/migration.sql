-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "services";

-- CreateTable
CREATE TABLE "services"."services" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "duration" INTEGER,
    "price" DOUBLE PRECISION,
    "thumbnail" TEXT,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdby" INTEGER NOT NULL,
    "updatedat" TIMESTAMP(3),
    "updatedby" INTEGER,
    "status" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);
