import PlayerModel from "../models/PlayerModel"
import TeamModel from "../models/TeamModel"
import { Request, Response } from "express"

export const addPlayerToTeam = async (req: Request, res: Response): Promise <void> => { 

    const {name, age} = req.body
    const {teamId} = req.params

   try {
        const player = new PlayerModel ({ 
            name: name,
            age: age,
            teamId: teamId
        })
        await player.save()
        
        const teamSelected = await TeamModel.findByPk(teamId)
        const teamPlayersQuantity = teamSelected.players.length

        if(teamPlayersQuantity === 5) { 
            res.status(200).send("Has añadido correctamente al jugador, tu equipo esta completo")
        } else { 
            res.status(200).send(`Has añadido correctamente al jugador, ahora son ${teamPlayersQuantity} en el equipo`)
        }

    } catch (error) {
        
    }
}