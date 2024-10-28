import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

// Base URL for images
const BASE_URL = "http://localhost:8585/images/";

const readJsonFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            try {
                const jsonData = JSON.parse(data);
                resolve(jsonData);
            } catch (parseError) {
                reject(parseError);
            }
        });
    });
}; 

// GET all products
router.get("/", async (req, res) => {
    try {
        const products = await readJsonFile("./data/all_products.json");
        const productsWithImages = products.map(product => ({
            ...product,
            image: `${BASE_URL}${path.basename(product.image)}`,
        }));
        res.send(productsWithImages);
    } catch (error) {
        res.status(500).send("Error reading all products data");
    }
});

// GET a product by ID
router.get("/:id", async (req, res) => {
    const productId = Number(req.params.id);

    try {
        const products = await readJsonFile("./data/all_products.json");
        const foundProduct = products.find(product => product.id === productId);

        if (!foundProduct) {
            return res.status(404).send("Item not found with that id");
        }

        foundProduct.image = `${BASE_URL}${foundProduct.image}`;
        res.send(foundProduct);
    } catch (error) {
        res.status(500).send("Error reading product data");
    }
});

// GET new collections
router.get("/new_collections", async (req, res) => {
    try {
        const newCollections = await readJsonFile("./data/new_collections.json");
        const collectionsWithImages = newCollections.map(collection => ({
            ...collection,
            image: `${BASE_URL}${path.basename(collection.image)}`,
        }));
        res.send(collectionsWithImages);
    } catch (error) {
        res.status(500).send("Error reading new collections data");
    }
});

// GET data
router.get("/data", async (req, res) => {
    try {
        const data = await readJsonFile("./data/data.json");
        const dataWithImages = data.map(item => ({
            ...item,
            image: `${BASE_URL}${path.basename(item.image)}`,
        }));
        res.send(dataWithImages);
    } catch (error) {
        res.status(500).send("Error reading data");
    }
});

export default router;
