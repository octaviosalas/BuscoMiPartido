import { Request, Response } from "express";
import TokenModel from "../models/TokenModel";

export const createToken = async (req: Request, res: Response) => { 

    const {number, referenceId, type} = req.body
    console.log(req.body)
    
    try {
        const newTokenToBeSaved = new TokenModel({ 
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