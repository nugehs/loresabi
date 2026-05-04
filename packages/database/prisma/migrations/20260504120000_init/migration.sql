-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "ExplainerCategory" AS ENUM ('HISTORY', 'CURRENT_AFFAIRS', 'POP_CULTURE', 'CULTURE', 'SYMBOLS', 'POLITICS', 'ECONOMY', 'SPORTS', 'FOOD', 'LANGUAGE');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('DRAFT', 'IN_REVIEW', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('OFFICIAL', 'NEWS', 'ENCYCLOPEDIA', 'ACADEMIC', 'CULTURAL', 'SOCIAL', 'OTHER');

-- CreateEnum
CREATE TYPE "TrendSource" AS ENUM ('GOOGLE_TRENDS', 'NEWS', 'SOCIAL', 'INTERNAL_SEARCH', 'CURATED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "officialName" TEXT,
    "iso2" TEXT,
    "iso3" TEXT,
    "region" TEXT,
    "subregion" TEXT,
    "capital" TEXT,
    "demonym" TEXT,
    "population" BIGINT,
    "latitude" DECIMAL(9,6),
    "longitude" DECIMAL(9,6),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "countryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Explainer" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "category" "ExplainerCategory" NOT NULL,
    "status" "ReviewStatus" NOT NULL DEFAULT 'DRAFT',
    "readingTime" INTEGER,
    "countryId" TEXT NOT NULL,
    "topicId" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Explainer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publisher" TEXT,
    "type" "SourceType" NOT NULL DEFAULT 'OTHER',
    "accessedAt" TIMESTAMP(3),
    "explainerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "credit" TEXT,
    "sourceUrl" TEXT,
    "countryId" TEXT,
    "explainerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trend" (
    "id" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "source" "TrendSource" NOT NULL,
    "score" INTEGER,
    "countryId" TEXT,
    "region" TEXT,
    "capturedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SearchLog" (
    "id" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "locale" TEXT,
    "country" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SearchLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "explainerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Country_slug_key" ON "Country"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Country_iso2_key" ON "Country"("iso2");

-- CreateIndex
CREATE UNIQUE INDEX "Country_iso3_key" ON "Country"("iso3");

-- CreateIndex
CREATE INDEX "Country_region_idx" ON "Country"("region");

-- CreateIndex
CREATE INDEX "Country_name_idx" ON "Country"("name");

-- CreateIndex
CREATE INDEX "Topic_title_idx" ON "Topic"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_countryId_slug_key" ON "Topic"("countryId", "slug");

-- CreateIndex
CREATE INDEX "Explainer_category_idx" ON "Explainer"("category");

-- CreateIndex
CREATE INDEX "Explainer_status_idx" ON "Explainer"("status");

-- CreateIndex
CREATE INDEX "Explainer_publishedAt_idx" ON "Explainer"("publishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Explainer_countryId_slug_key" ON "Explainer"("countryId", "slug");

-- CreateIndex
CREATE INDEX "Source_type_idx" ON "Source"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Source_explainerId_url_key" ON "Source"("explainerId", "url");

-- CreateIndex
CREATE INDEX "Image_countryId_idx" ON "Image"("countryId");

-- CreateIndex
CREATE INDEX "Image_explainerId_idx" ON "Image"("explainerId");

-- CreateIndex
CREATE INDEX "Trend_query_idx" ON "Trend"("query");

-- CreateIndex
CREATE INDEX "Trend_source_idx" ON "Trend"("source");

-- CreateIndex
CREATE INDEX "Trend_countryId_idx" ON "Trend"("countryId");

-- CreateIndex
CREATE INDEX "Trend_capturedAt_idx" ON "Trend"("capturedAt");

-- CreateIndex
CREATE INDEX "SearchLog_query_idx" ON "SearchLog"("query");

-- CreateIndex
CREATE INDEX "SearchLog_country_idx" ON "SearchLog"("country");

-- CreateIndex
CREATE INDEX "SearchLog_createdAt_idx" ON "SearchLog"("createdAt");

-- CreateIndex
CREATE INDEX "SavedItem_explainerId_idx" ON "SavedItem"("explainerId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedItem_userId_explainerId_key" ON "SavedItem"("userId", "explainerId");

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Explainer" ADD CONSTRAINT "Explainer_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Explainer" ADD CONSTRAINT "Explainer_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_explainerId_fkey" FOREIGN KEY ("explainerId") REFERENCES "Explainer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_explainerId_fkey" FOREIGN KEY ("explainerId") REFERENCES "Explainer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trend" ADD CONSTRAINT "Trend_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchLog" ADD CONSTRAINT "SearchLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedItem" ADD CONSTRAINT "SavedItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedItem" ADD CONSTRAINT "SavedItem_explainerId_fkey" FOREIGN KEY ("explainerId") REFERENCES "Explainer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

