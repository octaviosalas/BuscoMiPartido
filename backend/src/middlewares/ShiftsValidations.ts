import type { Request, Response, NextFunction } from "express"
import ShiftsModel from "../models/ShiftsModel"

export const validateShiftExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {shiftId} = req.params

    try {
        const shiftChoosen = await ShiftsModel.findByPk(shiftId)
        if(!shiftChoosen) { 
            return res.status(404).send("El turno no existe almacenado")
        } else { 
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}

