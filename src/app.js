import express from "express";
import cors from "cors"
import { routerCuadro } from "./routes/cuadros.js";

const app = express();
const port = process.env.PORT || 5004

app.use(express.json())
app.use(cors())

app.use("/cuadros", routerCuadro)

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})