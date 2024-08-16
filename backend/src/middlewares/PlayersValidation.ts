import { NextFunction, Request, Response } from "express";
import PlayerModel from "../models/PlayerModel";



export const validatePlayerExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {playerId} = req.params

    try {
       const playerSelected = await PlayerModel.findByPk(playerId)

       if(!playerSelected) { 
          res.status(400).json("El jugador no existe almacenado en el sistema")
        } else {
          next()
        }
    
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}

export const validatePlayerExistIntoTeam = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {playerId, teamId} = req.params

    try {
       const playerSelected = await PlayerModel.findByPk(playerId)
       if(playerSelected.teamId !== Number(teamId)){ 
        res.status(400).json("El jugador no existe almacenado en el sistema")
          } else { 
            next()
        }
    
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}