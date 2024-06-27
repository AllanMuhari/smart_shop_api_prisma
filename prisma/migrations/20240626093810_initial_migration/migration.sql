-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "product_thumbnail" TEXT NOT NULL,
    "product_title" TEXT NOT NULL,
    "product_description" TEXT NOT NULL,
    "product_cost" DOUBLE PRECISION NOT NULL,
    "on_offer" BOOLEAN NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
