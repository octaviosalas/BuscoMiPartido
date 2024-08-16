import PlayerModel from "../models/PlayerModel"
import TeamModel from "../models/TeamModel"
import { Request, Response } from "express"
import { calculateTeamAverage } from "../utils/calculateTeamAgeAverage"

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
        
        const teamSelected = await PlayerModel.findAll({ 
            where: { 
                teamId: teamId
            }
        })

        console.log(teamSelected.length)
        const quantityPlayersOnTheTeam = teamSelected.length

        if(quantityPlayersOnTheTeam === 5) { 
            res.status(200).send("Has añadido correctamente al jugador, tu equipo esta completo")
        } else { 
            res.status(200).send(`Has añadido correctamente al jugador, ahora son ${quantityPlayersOnTheTeam} en el equipo`)
        }

    } catch (error) {
        res.status(500).send(error)
    }
}

export const teamData = async (req: Request, res: Response): Promise <void> => { 


    const {teamId} = req.params

   try {
       const teamSelected = await TeamModel.findByPk(teamId, { 
        include: [{ 
            model: PlayerModel,
            as: "players"
        }]
       })

       const teamData = teamSelected.get({ plain: true });
       const averageReturned = calculateTeamAverage(teamData)
       const quantityPlayersTeam = teamSelected.players.length
       res.json({teamData: teamSelected, averageAge: averageReturned, players: quantityPlayersTeam})
    } catch (error) {
        res.status(500).send(error)
    }
}

export const deletePlayer = async (req: Request, res: Response): Promise <void> => { 

    const {teamId, playerId} = req.params

    try {
       const playerSelected = await PlayerModel.findByPk(playerId)
       const playerName = playerSelected.name
       await playerSelected.destroy()

       const actualQuantityPlayer = await PlayerModel.findAll({
         where: { 
            teamId: teamId
         }
       })

       const quantity = actualQuantityPlayer.length 
       res.status(200).send(`Elminaste correctamente a ${playerName} del equipo. El equipo quedo con ${quantity} jugadores`)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const updatePlayerData = async (req: Request, res: Response): Promise <void> => { 

    const {teamId, playerId} = req.params

    try {
       const playerSelected = await PlayerModel.findByPk(playerId)
       playerSelected.name = req.body.name
       playerSelected.age = req.body.age
       await playerSelected.save()

       res.status(200).send(`Has modificado correctamente los datos del jugador`)
    } catch (error) {
        res.status(500).send(error)
    }
}