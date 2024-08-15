import PlayerModel from "../models/PlayerModel";
import TeamModel from "../models/TeamModel";
import { NextFunction, Request, Response } from "express";

export const validateTeamExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {teamId} = req.params

    try {
       const teamSelected = await TeamModel.findByPk(teamId)

       if(!teamSelected) { 
          res.status(400).json("El equipo no existe")
        } else {
          next()
        }
    
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}

export const validateTeamPlayersQuantity = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {teamId} = req.params

    try {
       const teamPlayers = await PlayerModel.findAll({ 
        where: { 
            teamId: teamId
        }
       })
       console.log("Los jugadores que encontre del equipo en validateTeamPlayersQuantity", teamPlayers)
       
       if(teamPlayers.length >= 5) { 
         res.status(404).send("El equipo ya cuenta con 5 jugadores. Para añadir a otro, deberas sacar a quien este de mas.")
       } else { 
        next()
       }
    
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}

export const validateIfAdminIsTeamOwner = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {teamId, adminId} = req.params

    console.log("El ID del admin que recibi", adminId)

    try {
       const teamSelected = await TeamModel.findByPk(teamId)
       const adminTeam = teamSelected.userOwner

       if(adminTeam !== Number(adminId)) { 
         res.status(404).send("Para poder agregar un jugador al equipo, debes ser el administrador del mismo")
         console.log("El ID del admin no es el ID del adminsitrador real del equipo")
        } else { 
            next()
        }
    
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}