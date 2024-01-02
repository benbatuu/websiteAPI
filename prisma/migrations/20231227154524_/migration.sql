-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "users";

-- CreateTable
CREATE TABLE "users"."apiclient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdby" INTEGER NOT NULL,
    "updatedat" TIMESTAMP(3),
    "updatedby" INTEGER,
    "isactive" BOOLEAN NOT NULL,

    CONSTRAINT "apiclient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."refreshtoken" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3),
    "expiresat" TIMESTAMP(3),

    CONSTRAINT "refreshtoken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."revokedtoken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "revokedtoken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdby" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedby" INTEGER,
    "updatedat" TIMESTAMP(3),

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."permission" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdby" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedby" INTEGER,
    "updatedat" TIMESTAMP(3),

    CONSTRAINT "permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."rolepermission" (
    "id" SERIAL NOT NULL,
    "roleid" INTEGER NOT NULL,
    "permissionid" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdby" INTEGER NOT NULL,
    "updatedby" INTEGER,
    "updatedat" TIMESTAMP(3),

    CONSTRAINT "rolepermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."user" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdby" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedby" INTEGER,
    "updatedat" TIMESTAMP(3),
    "status" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."userpermission" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "permissionid" INTEGER NOT NULL,
    "createdby" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedby" INTEGER,
    "updatedat" TIMESTAMP(3),

    CONSTRAINT "userpermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."userrole" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "roleid" INTEGER NOT NULL,
    "createdby" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedby" INTEGER,
    "updatedat" TIMESTAMP(3),

    CONSTRAINT "userrole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "apiclient_key_key" ON "users"."apiclient"("key");

-- CreateIndex
CREATE UNIQUE INDEX "apiclient_secret_key" ON "users"."apiclient"("secret");

-- CreateIndex
CREATE UNIQUE INDEX "revokedtoken_token_key" ON "users"."revokedtoken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "permission_value_key" ON "users"."permission"("value");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "users"."user"("email");

-- AddForeignKey
ALTER TABLE "users"."apiclient" ADD CONSTRAINT "apiclient_createdby_fkey" FOREIGN KEY ("createdby") REFERENCES "users"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."apiclient" ADD CONSTRAINT "apiclient_updatedby_fkey" FOREIGN KEY ("updatedby") REFERENCES "users"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."refreshtoken" ADD CONSTRAINT "refreshtoken_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."role" ADD CONSTRAINT "role_createdby_fkey" FOREIGN KEY ("createdby") REFERENCES "users"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."role" ADD CONSTRAINT "role_updatedby_fkey" FOREIGN KEY ("updatedby") REFERENCES "users"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."permission" ADD CONSTRAINT "permission_createdby_fkey" FOREIGN KEY ("createdby") REFERENCES "users"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."permission" ADD CONSTRAINT "permission_updatedby_fkey" FOREIGN KEY ("updatedby") REFERENCES "users"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."rolepermission" ADD CONSTRAINT "rolepermission_createdby_fkey" FOREIGN KEY ("createdby") REFERENCES "users"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."rolepermission" ADD CONSTRAINT "rolepermission_permissionid_fkey" FOREIGN KEY ("permissionid") REFERENCES "users"."permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."rolepermission" ADD CONSTRAINT "rolepermission_roleid_fkey" FOREIGN KEY ("roleid") REFERENCES "users"."role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."rolepermission" ADD CONSTRAINT "rolepermission_updatedby_fkey" FOREIGN KEY ("updatedby") REFERENCES "users"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."user" ADD CONSTRAINT "user_createdby_fkey" FOREIGN KEY ("createdby") REFERENCES "users"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."user" ADD CONSTRAINT "user_updatedby_fkey" FOREIGN KEY ("updatedby") REFERENCES "users"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."userpermission" ADD CONSTRAINT "userpermission_createdby_fkey" FOREIGN KEY ("createdby") REFERENCES "users"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."userpermission" ADD CONSTRAINT "userpermission_permissionid_fkey" FOREIGN KEY ("permissionid") REFERENCES "users"."permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."userpermission" ADD CONSTRAINT "userpermission_updatedby_fkey" FOREIGN KEY ("updatedby") REFERENCES "users"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."userpermission" ADD CONSTRAINT "userpermission_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."userrole" ADD CONSTRAINT "userrole_createdby_fkey" FOREIGN KEY ("createdby") REFERENCES "users"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."userrole" ADD CONSTRAINT "userrole_roleid_fkey" FOREIGN KEY ("roleid") REFERENCES "users"."role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."userrole" ADD CONSTRAINT "userrole_updatedby_fkey" FOREIGN KEY ("updatedby") REFERENCES "users"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."userrole" ADD CONSTRAINT "userrole_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
