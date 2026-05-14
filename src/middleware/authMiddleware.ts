import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export function verificarToken(
   req: Request,
   res: Response,
   next: NextFunction
) {

   const token = req.headers.authorization

   if (!token) {
      return res.status(401).json({
         mensaje: "Token requerido"
      })
   }

   try {

      jwt.verify(token, "clave_secreta")
      next()

   } catch {

      return res.status(403).json({
         mensaje: "Token inválido"
      })
   }
}
