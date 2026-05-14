import express from "express"

import { productos } from "../data/datos"
import { verificarToken } from "../middleware/authMiddleware"

const router = express.Router()

router.get("/", (req, res) => {

   res.json(productos)
})

router.post(
   "/",
   verificarToken,
   (req, res) => {

      const { nombre, precio, categoria } = req.body

      if (!nombre || precio <= 0) {

         return res.status(400).json({
            mensaje: "Datos inválidos"
         })
      }

      const nuevoProducto = {
         id: productos.length + 1,
         nombre,
         precio,
         categoria
      }

      productos.push(nuevoProducto)

      res.json(nuevoProducto)
   }
   
)

router.delete(
   "/:id",
   verificarToken,
   (req, res) => {

      const id = Number(req.params.id)

      const indice = productos.findIndex(
         p => p.id === id
      )

      if (indice === -1) {

         return res.status(404).json({
            mensaje: "Producto no encontrado"
         })
      }

      productos.splice(indice, 1)

      res.json({
         mensaje: "Producto eliminado"
      })
   }
)
router.post(
   "/descripcion",
   verificarToken,
   (req, res) => {

      const { nombre } = req.body

      const descripcion =
         `${nombre} ideal para uso profesional y gaming.`

      res.json({
         descripcion
      })
   }
)


export default router
