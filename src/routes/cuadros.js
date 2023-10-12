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

routerCuadro.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query(
      `SELECT * FROM cuadros WHERE id_cuadro = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: " no encontrada" });
    }
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

routerCuadro.post("/", async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const estudio = req.body.estudio;
    const sinopsis = req.body.sinopsis;
    const link_anime = req.body.link_anime;
    const best_waifu = req.body.best_waifu;
    const codigo_obra = req.body.codigo_obra;
    const imagen = req.body.imagen;
    if (
      nombre.trim() !== "" &&
      typeof nombre !== "boolean" &&
      typeof nombre !== "number" &&
      estudio.trim() !== "" &&
      typeof estudio !== "boolean" &&
      typeof estudio !== "number" &&
      best_waifu.trim() !== "" &&
      typeof best_waifu !== "boolean" &&
      typeof best_waifu !== "number"
      ) {
      const resultado = await pool.query ( "INSERT INTO cuadros (nombre, estudio, sinopsis, link_anime, best_waifu, codigo_obra, imagen) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
       [nombre, estudio, sinopsis, link_anime, best_waifu, codigo_obra, imagen])
      res.status(201).json(resultado.rows[0])
    } else {
      res.status(300).json({error:("necesitas completar los demas campos")})
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

routerCuadro.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const nombre = req.body.nombre;
    const estudio = req.body.estudio;
    const sinopsis = req.body.sinopsis;
    const link_anime = req.body.tittle;
    const best_waifu = req.body.best_waifu;
    const codigo_obra = req.body.codigo_obra;
    const imagen = req.body.imagen;

    await pool.query(
      "UPDATE cuadros SET nombre = $1, estudio = $2, sinopsis = $3, link_anime = $4, best_waifu = $5, codigo_obra = $6, imagen = $7",
      [nombre, estudio, sinopsis, link_anime, best_waifu, codigo_obra, imagen]
    );
    res
      .status(201)
      .json({ message: "el cuadro se ha actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

routerCuadro.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await pool.query("DELETE FROM cuadros WHERE id_cuadro = $1", [id]);
    res
      .status(200)
      .json({ message: "el cuadro ha sido eliminado corectamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
