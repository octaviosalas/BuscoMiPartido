import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { database } from "../database/db";//para usar la transaccion
import TeamModel from "../models/TeamModel";

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

export const createUserWithTeam = async (req: Request, res: Response) => { 

    console.log(req.body)

    let transaction; 

    try {
        const transaction = await database.transaction()

        const newUser = await UserModel.create({ 
             name: req.body.user.name, 
             email: req.body.user.email,
             password: req.body.user.password
        }, { transaction})
        
        const newTeam = await TeamModel.create({ 
             name: req.body.team.name,
             location: req.body.team.location,
             userOwner: newUser.id
        }, { transaction})

        await transaction.commit()
        res.status(200).json({message:"Usuario y equipo generado", data: newTeam})
    } catch (error) {
        await transaction.rollback(); // Revertir la transacción si algo falla
        res.status(500).send(error);
    }
    
}

