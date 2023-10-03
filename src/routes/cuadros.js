import { Router } from "express";
import { pool } from "../db.js";

export const routerCuadro = Router();

routerCuadro.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cuadros");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

routerCuadro.get("/id:", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await pool.query(`SELECT * FROM cuadros WHERE id_cuadro = $1`,[id])
        res.result.rows
        if (result.rows.length=== 0) { 
           return res.status(404).json({error: "tarea no encontrada"})}
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
