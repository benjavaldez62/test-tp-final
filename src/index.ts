import express from "express"

import authRoutes from "./routes/auth"
import productosRoutes from "./routes/productos"

import { logger } from "./middleware/logger"

const app = express()

app.use(express.json())

app.use(logger)

app.use("/auth", authRoutes)

app.use("/productos", productosRoutes)

app.listen(3000, () => {
   console.log("Servidor iniciado")
})
