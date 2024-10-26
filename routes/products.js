import express from "express";
const router = express.Router();
import fs from "fs";

// GET all products
router.get("/", (req, res) => {
    const productsBuffer = fs.readFileSync("./data/all_products.json");
    const products = JSON.parse(productsBuffer);

    res.send(products);
});

// GET a video by ID
router.get("/:id", (req, res) => {
    const videosId = req.params.id;

    const productsBuffer = fs.readFileSync("./data/all_products.json");
    const products = JSON.parse(productsBuffer);

    const foundProduct = products.find((video) => video.id === videosId);

    if (!foundProduct) {
        return res.status(404).send("Item not found with that id");
    }

    foundProduct.image = `http://localhost:8080/images/${foundProduct.image}`;

    res.send(foundProduct);
});

export default router;
