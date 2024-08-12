import { Request, Response } from "express";
import UserModel from "../models/UserModel";

export const createUser = async (req: Request, res: Response) => { 

    const {name, email, password} = req.body
    console.log(req.body)
    
    try {
        const newUserToBeSaved = new UserModel({ 
            name: name,
            email: email,
            password: password
        })    
        await newUserToBeSaved.save()
        res.status(200).send("Usuario generado")
    } catch (error) {
        res.status(500).send(error)
    }
    
}

