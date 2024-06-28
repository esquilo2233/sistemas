/*
  Warnings:

  - You are about to drop the `congress_numbers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `extra` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `senators` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "congress_numbers" DROP CONSTRAINT "congress_numbers_senator_id_fkey";

-- DropForeignKey
ALTER TABLE "extra" DROP CONSTRAINT "extra_senator_id_fkey";

-- DropTable
DROP TABLE "congress_numbers";

-- DropTable
DROP TABLE "extra";

-- DropTable
DROP TABLE "senators";

-- CreateTable
CREATE TABLE "Senator" (
    "id" SERIAL NOT NULL,
    "caucus" TEXT,
    "current" BOOLEAN,
    "description" TEXT,
    "district" TEXT,
    "enddate" TIMESTAMP(3),
    "leadership_title" TEXT,
    "party" TEXT,
    "bioguideid" TEXT,
    "birthday" TIMESTAMP(3),
    "cspanid" INTEGER,
    "firstname" TEXT,
    "gender" TEXT,
    "lastname" TEXT,
    "link" TEXT,
    "middlename" TEXT,
    "name" TEXT,
    "namemod" TEXT,
    "nickname" TEXT,
    "osid" TEXT,
    "sortname" TEXT,
    "twitterid" TEXT,
    "youtubeid" TEXT,
    "phone" TEXT,
    "role_type" TEXT,
    "senator_class" TEXT,
    "senator_rank" TEXT,
    "startdate" TIMESTAMP(3),
    "state" TEXT,
    "title" TEXT,
    "title_long" TEXT,
    "website" TEXT,
    "created_by" TEXT NOT NULL DEFAULT 'system',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Senator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CongressNumber" (
    "id" SERIAL NOT NULL,
    "senatorId" INTEGER NOT NULL,
    "congress_number" INTEGER NOT NULL,
    "created_by" TEXT NOT NULL DEFAULT 'system',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CongressNumber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Extra" (
    "id" SERIAL NOT NULL,
    "senatorId" INTEGER NOT NULL,
    "address" TEXT,
    "contact_form" TEXT,
    "office" TEXT,
    "rss_url" TEXT,
    "created_by" TEXT NOT NULL DEFAULT 'system',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Extra_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CongressNumber" ADD CONSTRAINT "CongressNumber_senatorId_fkey" FOREIGN KEY ("senatorId") REFERENCES "Senator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Extra" ADD CONSTRAINT "Extra_senatorId_fkey" FOREIGN KEY ("senatorId") REFERENCES "Senator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
