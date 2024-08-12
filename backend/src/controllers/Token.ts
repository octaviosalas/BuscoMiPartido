import { Request, Response } from "express";
import TokenAdminModel from "../models/TokenAdminModel";

export const createToken = async (req: Request, res: Response): Promise<void> => { 

    const {number, referenceId, type} = req.body
    console.log(req.body)
    
    try {
        const newTokenToBeSaved = new TokenAdminModel({ 
            number: number,
            type: type,
            referenceId: referenceId
        })    
        await newTokenToBeSaved.save()
        res.status(200).send("Token generado")
    } catch (error) {
        res.status(500).send(error)
    }
    
}

export const getTokens = async (req: Request, res: Response): Promise<void> => { 
    
    try {
        const tokens = await TokenAdminModel.findAll()
        res.status(200).send(tokens)
    } catch (error) {
        res.status(500).send(error)
    }
    
}
/*

export const confirmAccountWithToken = async (req: Request, res: Response) => { 

    const {token} = req.body
    console.log(token)

    try {
        const verifyToken = await TokenAdminModel.findOne({token: token})
        console.log("Token encontrado", verifyToken)

        if(!verifyToken) { 
 
            const error = new Error("El Token es incorrecto. Intenta nuevamente. En caso de haber pasado los 15 minutos, intenta iniciar sesion nuevamente para recibir un token nuevo")
            res.status(202).json({error: error.message})
            console.log("Token NO encontrado")

        } else { 
            const getUserTokenOwner = await UserModel.findById(verifyToken.user)
            getUserTokenOwner.confirmed = true
            await getUserTokenOwner.save() 
            await verifyToken.deleteOne() 
            res.status(200).json("La cuenta ha sido confirmada exitosamente")
        }


    } catch (error) {
       res.status(500).json({error: "Hubo un error en la creacion de la cuenta"})
    }
} */