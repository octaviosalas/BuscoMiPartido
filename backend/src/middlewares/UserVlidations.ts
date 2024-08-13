import type { Request, Response, NextFunction } from "express"
import UserModel from "../models/UserModel"

export const validateUserExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {userId} = req.params

    try {
       const user = await UserModel.findByPk(userId)

       if(!user) { 
          res.status(400).json("El usuario no existe")
        } else {
          next()
        }
    
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}