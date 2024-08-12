import type { Request, Response, NextFunction } from "express"
import AdminModel from "../models/AdminModel"

export const validateAdminNotExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {email} = req.body

    try {
       const verifyAdminNotExist = await AdminModel.findOne({ 
            where: { 
               email: email
            }
       })

       if(verifyAdminNotExist) { 
        res.status(400).json("El correo electronico ingresado ya pertenece a un adminastrador")
        } else {
            next()
        }
    
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}

export const validateAdminExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {adminId} = req.params

    try {
       const verifyAdminNotExist = await AdminModel.findByPk(adminId)

       if(!verifyAdminNotExist) { 
          res.status(400).json("El administrador no existe")
        } else {
          next()
        }
    
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}