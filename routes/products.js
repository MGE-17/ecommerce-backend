import express from "express";
const router = express.Router();
import fs from "fs";
import path from "path";

// Base URL for images
const BASE_URL = "http://localhost:8585/images/";

// GET all products
router.get("/", (req, res) => {
    const productsBuffer = fs.readFileSync("./data/all_products.json");
    const products = JSON.parse(productsBuffer);

    const productsWithImages = products.map(product => ({
        ...product,
       image: `${BASE_URL}${path.basename(product.image)}`
    }));

    res.send(productsWithImages);
});

// GET a product by ID
router.get("/:id", (req, res) => {
    const productId = Number(req.params.id); 

    const productsBuffer = fs.readFileSync("./data/all_products.json");
    const products = JSON.parse(productsBuffer);

    // Find product by ID
    const foundProduct = products.find(product => product.id === productId);

    if (!foundProduct) {
        return res.status(404).send("Item not found with that id");
    }

    // Update image path
    foundProduct.image = `${BASE_URL}${foundProduct.image}`;

    res.send(foundProduct);
});

export default router;
