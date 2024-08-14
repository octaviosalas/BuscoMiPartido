import type { Request, Response, NextFunction } from "express"
import ComplexModel from "../models/ComplexModel"

export const validateComplexExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {complexId} = req.params

    try {
       const complexChoosen = await ComplexModel.findByPk(complexId)

       if(!complexChoosen) { 
           return res.status(400).json("El complejo no existe");
      } else {
          next()
        }
    
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}

export const validateComplexIsAdminComplex = async (req: Request, res: Response, next: NextFunction) => { 
     
  const {complexId, adminId} = req.params

  try {
     const complexChoosen = await ComplexModel.findByPk(complexId)

     if(complexChoosen.adminId !== Number(adminId)) { 
      res.status(400).json("No sos el administrador de este complejo")
     } else {
       next()
     }
  
  } catch (error) {
      console.log(error)
      res.status(500).json("Hubo un error en el midddleware")
  }
}