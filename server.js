import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "db.json");
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const readDb = async () => {
  const json = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(json);
};

const writeDb = async (data) => {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2) + "\n", "utf-8");
};

const getResourceArray = (db, resource) => {
  const collection = db[resource];
  return Array.isArray(collection) ? collection : null;
};

const validateResource = (db, resource, res) => {
  const collection = getResourceArray(db, resource);
  if (!collection) {
    res.status(404).json({ error: `Resource '${resource}' not found.` });
  }
  return collection;
};

const parseId = (value) => {
  const id = Number(value);
  return Number.isNaN(id) ? null : id;
};

app.get("/api/:resource", async (req, res) => {
  const db = await readDb();
  const collection = validateResource(db, req.params.resource, res);
  if (!collection) return;
  res.json(collection);
});

app.get("/api/:resource/:id", async (req, res) => {
  const db = await readDb();
  const collection = validateResource(db, req.params.resource, res);
  if (!collection) return;

  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: "Invalid id parameter." });
  }

  const item = collection.find((row) => row.id === id);
  if (!item) {
    return res.status(404).json({ error: `Item with id ${id} not found.` });
  }

  res.json(item);
});

app.post("/api/:resource", async (req, res) => {
  const db = await readDb();
  const collection = validateResource(db, req.params.resource, res);
  if (!collection) return;

  const newItem = req.body;
  if (typeof newItem !== "object" || newItem === null) {
    return res.status(400).json({ error: "Request body must be an object." });
  }

  const nextId =
    collection.length > 0
      ? Math.max(...collection.map((item) => item.id || 0)) + 1
      : 1;
  const savedItem = { ...newItem, id: nextId };
  collection.push(savedItem);
  await writeDb(db);

  res.status(201).json(savedItem);
});

app.put("/api/:resource/:id", async (req, res) => {
  const db = await readDb();
  const collection = validateResource(db, req.params.resource, res);
  if (!collection) return;

  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: "Invalid id parameter." });
  }

  const index = collection.findIndex((row) => row.id === id);
  if (index === -1) {
    return res.status(404).json({ error: `Item with id ${id} not found.` });
  }

  const updatedItem = { ...req.body, id };
  collection[index] = updatedItem;
  await writeDb(db);

  res.json(updatedItem);
});

app.patch("/api/:resource/:id", async (req, res) => {
  const db = await readDb();
  const collection = validateResource(db, req.params.resource, res);
  if (!collection) return;

  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: "Invalid id parameter." });
  }

  const index = collection.findIndex((row) => row.id === id);
  if (index === -1) {
    return res.status(404).json({ error: `Item with id ${id} not found.` });
  }

  const updatedItem = { ...collection[index], ...req.body, id };
  collection[index] = updatedItem;
  await writeDb(db);

  res.json(updatedItem);
});

app.delete("/api/:resource/:id", async (req, res) => {
  const db = await readDb();
  const collection = validateResource(db, req.params.resource, res);
  if (!collection) return;

  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: "Invalid id parameter." });
  }

  const index = collection.findIndex((row) => row.id === id);
  if (index === -1) {
    return res.status(404).json({ error: `Item with id ${id} not found.` });
  }

  const [deletedItem] = collection.splice(index, 1);
  await writeDb(db);

  res.json(deletedItem);
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

app.listen(port, () => {
  console.log(`CRUD API server is running at http://localhost:${port}/api`);
});
