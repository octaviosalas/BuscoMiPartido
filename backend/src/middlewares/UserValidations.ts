import type { Request, Response, NextFunction } from "express"
import UserModel from "../models/UserModel"

export const validateUserExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {email} = req.body

    try {
        const userData = await UserModel.findOne({
            where: { 
                email: email
            }
        })
        if(userData) { 
            return res.status(404).send("El email con el que intentas ingresar ya existe almacenado")
        } else { 
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}



export const validateUserNotExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {email} = req.body

    try {
        const userData = await UserModel.findOne({
            where: { 
                email: email
            }
        })
        if(userData) { 
            return res.status(404).send("El email con el que intentas ingresar ya existe almacenado")
        } else { 
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}

export const validateUserNotExistInCreationWithTeam = async (req: Request, res: Response, next: NextFunction) => { 
     
    console.log("aca", req.body.user.email)

    try {
        const userData = await UserModel.findOne({
            where: { 
                email: req.body.user.email
            }
        })
        if(userData) { 
            return res.status(404).send("El email con el que intentas registrarte como usuario ya existe almacenado")
        } else { 
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}