import express from 'express';
import mysql from "mysql2/promise";

const app = express();
const port = 3000;

app.use(express.json());

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "energy_drinks",
});

app.get("/energy_drinks", async (req, res) => {
    try {
        const [rows] = await connection.execute("SELECT * FROM drinks");
        res.json(rows);
    } catch (error) {
        console.error("Error fetching drinks:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/energy_drinks", async (req, res) => {
   const { name, brand, caffeine, sugar_free } = req.body;
    let errors = [];
    if(!name) errors.push("A name mező megadása kötelező");
    if(!brand) errors.push("A brand mező megadása kötelező");
    if(caffeine === undefined) errors.push("A caffeine mező megadása kötelező");
    if(sugar_free === undefined) errors.push("A sugar_free mező megadása kötelező");
    if(errors.length > 0){
        console.error("Validation errors:", errors);
        return res.status(400).json({ errors });
    }
    if(typeof sugar_free !== "boolean" ){
        console.error("Invalid input types");
        return res.status(400).json({ error: "A sugar_free mezőnek boolean típusúnak kell lennie" });

    }
    if(typeof caffeine !== "number" ){
        console.error("Invalid input types");
        return res.status(400).json({ error: "A caffeine mezőnek szám típusúnak kell lennie" });
    }


    try {
        
        const [result] = await connection.execute(
            "INSERT INTO drinks (name, brand, caffeine, sugar_free, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
            [name, brand, caffeine, sugar_free]
        );
        
        res.status(201).json({ message: "Drink added", drinkId: result.insertId });
    } catch (error) {
        console.error("Error adding drink:", error);
        res.status(400).json({ error: "Bad Request" });
    }
});

app.delete("/energy_drinks/:id", async (req, res) => {
    const drinkId = req.params.id;
    try {
        const [result] = await connection.execute(
            "DELETE FROM drinks WHERE id = ?",
            [drinkId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Drink not found" });
        }
        
        res.status(200).json({ message: "Drink deleted" });
    } catch (error) {
        console.error("Error deleting drink:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put("/energy_drinks/:id", async (req, res) => {
    const drinkId = req.params.id;
    const { name, brand, caffeine, sugar_free } = req.body;
    if (!name || !brand || caffeine === undefined || sugar_free === undefined) {
        return res.status(400).json({ error: "Hiányzó mezők" });
    }
    try {
        const [result] = await connection.execute(
            "UPDATE drinks SET name = ?, brand = ?, caffeine = ?, sugar_free = ?, updated_at = NOW() WHERE id = ?",
            [name, brand, caffeine, sugar_free, drinkId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Drink not found" });
        }
        res.status(200).json({ message: "Drink updated" });
    } catch (error) {
        console.error("Error updating drink:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});