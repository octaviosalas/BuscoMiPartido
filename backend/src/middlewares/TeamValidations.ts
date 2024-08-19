import PlayerModel from "../models/PlayerModel";
import TeamModel from "../models/TeamModel";
import { NextFunction, Request, Response } from "express";
import { Op } from 'sequelize';
import TeamSeekingMatchModel from "../models/TeamSeekingMatch";

export const validateTeamExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {teamId} = req.params
    console.log("RECIBI COMO ID", teamId)

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


    try {
       const teamSelected = await TeamModel.findByPk(teamId)
       const adminTeam = teamSelected.userOwner

       if(adminTeam !== Number(adminId)) { 
         res.status(404).send("Para poder agregar un jugador al equipo, debes ser el administrador del mismo")
        } else { 
            next()
        }
    
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}

export const validateIfPlayerAlreadyExistInTeam = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {teamId} = req.params
    const {name} = req.body
    console.log(name)

    try {
       const searchPlayer = await PlayerModel.findAll({ 
        where: { 
            name: { 
                [Op.iLike]: name 
            }
        }
       })

      if(searchPlayer.length > 0) { 
            const playerTeam = searchPlayer.map((player) => player.teamId)[0]
            if(playerTeam === Number(teamId)) { 
                res.status(404).send("El jugador ya forma parte del equipo")
            } else { 
                next()
            }
       } else { 
          next()
       }
    
     } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
     }
}

export const validateIfTeamHasOtherAlertInDay = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {teamId} = req.params
    const {dateTime} = req.body

    try {
       const searchAlert = await TeamSeekingMatchModel.findAll({ 
        where: {
            teamId: teamId,
            dateTime: dateTime
          }
       })

      if(searchAlert.length > 0) { 
            res.status(202).send("Ya tenes una alerta de busqueda de partido en esta fecha")           
       } else { 
          next()
       }
    
     } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
        console.log("UPS")
     }
}

export const validateTeamAlertExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {alertId} = req.params

    try {
       const alert = await TeamSeekingMatchModel.findByPk(alertId)

       if(!alert) { 
          res.status(400).json("La alerta de busqueda de rival no existe")
        } else {
          next()
        }
    
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}