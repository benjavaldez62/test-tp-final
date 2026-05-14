import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { usuarios } from "../data/datos"

const router = express.Router()

router.post("/registro", async (req, res) => {

   try {

      const { email, password } = req.body

      if (!email.includes("@")) {
         return res.status(400).json({
            mensaje: "Email inválido"
         })
      }

      const hash = await bcrypt.hash(password, 10)

      usuarios.push({
         id: usuarios.length + 1,
         email,
         password: hash
      })

      res.json({
         mensaje: "Usuario registrado"
      })

   } catch (error) {

      res.status(500).json({
         mensaje: "Error del servidor"
      })
   }
})

router.post("/login", async (req, res) => {

   const { email, password } = req.body

   const usuario = usuarios.find(
      u => u.email === email
   )

   if (!usuario) {
      return res.status(404).json({
         mensaje: "Usuario no encontrado"
      })
   }

   const valido = await bcrypt.compare(
      password,
      usuario.password
   )

   if (!valido) {
      return res.status(401).json({
         mensaje: "Contraseña incorrecta"
      })
   }

   const token = jwt.sign(
      { email: usuario.email },
      "clave_secreta",
      { expiresIn: "1h" }
   )

   res.json({ token })
})

export default router
