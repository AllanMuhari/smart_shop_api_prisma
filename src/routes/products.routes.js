import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  try {
    const {
      productthumbnail,
      producttitle,
      productcost,
      productdescription,
      onoffer,
    } = req.body;

    if (
      !producttitle ||
      !productcost ||
      !productdescription ||
      !productthumbnail
    ) {
      return res.status(400).json({
        message: "Missing required fields",
        error: "Product title, cost, description, and thumbnail are required.",
      });
    }

    const parsedProductCost = Number(productcost);
    if (isNaN(parsedProductCost)) {
      return res.status(400).json({
        message: "Invalid product cost",
        error: "Product cost should be a valid number.",
      });
    }
    const parsedOnOffer = onoffer === "true" || onoffer === true;

    const product = await prisma.product.create({
      data: {
        productThumbnail: productthumbnail,
        productTitle: producttitle,
        productCost: parsedProductCost,
        productDescription: productdescription,
        onOffer: parsedOnOffer,
      },
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).send({
      message: "Error creating product",
      error: err.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        id: "desc",
      },
    });
    res.json(products);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving products",
      error: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const products = await prisma.product.findMany({
      where: {
        id: String(id),
      },
    });

    res.json(products);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving products",
      error: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await prisma.product.delete({
      where: {
        id: String(id),
      },
    });

    res.status(200).json(product);
  } catch (err) {
    res.status(500).send({
      message: "Error deleting product",
      error: err.message,
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const {
      productthumbnail,
      producttitle,
      productcost,
      productdescription,
      onoffer,
    } = req.body;

    const product = await prisma.product.update({
      where: {
        id: String(id),
      },
      data: {
        productThumbnail: productthumbnail,
        productTitle: producttitle,
        productCost: productcost,
        productDescription: productdescription,
        onOffer: onoffer,
      },
    });

    res.status(200).json(product);
  } catch {}
});

export default router;
