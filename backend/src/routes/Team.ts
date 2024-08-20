import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middlewares/HandleErrors";
import { 
   addPlayerToTeam, 
   deletePlayer, 
   teamData,
   updatePlayerData, 
   createTeamAlert, 
   getTeamsLookingForRival, 
   getTeamsLookingForRivalByLocation, 
   updateTeamAlert, 
   deleteTeamAlert } from "../controllers/Team";
import { 
   validateTeamExist, 
   validateTeamPlayersQuantity, 
   validateIfAdminIsTeamOwner, 
   validateIfPlayerAlreadyExistInTeam, 
   validateIfTeamHasOtherAlertInDay, 
   validateTeamAlertExist } from "../middlewares/TeamValidations";
import { validatePlayerExist } from "../middlewares/PlayersValidation";
import { validatePlayerExistIntoTeam } from "../middlewares/PlayersValidation";

const router = Router()

router.post("/addPlayer/:teamId/:adminId", 
   param("adminId").notEmpty().withMessage("Debes indicar el ID del administrador de este equipo"),
   param("teamId").notEmpty().withMessage("Debes indicar el ID del equipo que deseas agregar al jugador"),
   body("name").notEmpty().withMessage("Debes indicar el nombre del jugador"),
   body("age").notEmpty().withMessage("Debes indicar la edad de jugador"),
   handleInputErrors,
   validateTeamExist,
   validateTeamPlayersQuantity,
   validateIfAdminIsTeamOwner,
   validateIfPlayerAlreadyExistInTeam,
   addPlayerToTeam
)

router.get("/teamData/:teamId", 
   param("teamId").notEmpty().withMessage("Debes indicar el ID del equipo que deseas obtenerr"),
   handleInputErrors,
   validateTeamExist,
   teamData
)

router.delete("/deletePlayer/:teamId/:playerId", 
   param("teamId").notEmpty().withMessage("Debes indicar el ID del equipo que deseas obtenerr"),
   param("playerId").notEmpty().withMessage("Debes indicar el ID del equipo que deseas obtenerr"),
   handleInputErrors,
   validateTeamExist,
   validatePlayerExist,
   validatePlayerExistIntoTeam,
   deletePlayer
)

router.put("/updatePlayerData/:teamId/:playerId", 
   param("teamId").notEmpty().withMessage("Debes indicar el ID del equipo que deseas obtenerr"),
   param("playerId").notEmpty().withMessage("Debes indicar el ID del equipo que deseas obtenerr"),
   body("name").notEmpty().withMessage("Debes indicar el nombre del jugador"),
   body("age").notEmpty().withMessage("Debes indicar la edad del jugador"),
   handleInputErrors,
   validateTeamExist,
   validatePlayerExist,
   validatePlayerExistIntoTeam,
   updatePlayerData
)

router.post("/createTeamAlert/:teamId", 
   body("dateTime").notEmpty().withMessage("Debes indicar la fecha y hora del partido que quieres jugar"),
   handleInputErrors,
   validateTeamExist,
   validateIfTeamHasOtherAlertInDay,
   createTeamAlert
)

router.get("/teamsLookingForRival", 
   getTeamsLookingForRival
)

router.get("/teamsLookingForRivalByLocation/:location", 
   param("location").notEmpty().withMessage("Debes indicar el nombre del jugador"),
   handleInputErrors,
   getTeamsLookingForRivalByLocation
)

router.put("/updateTeamAlert/:teamId/:alertId", 
   param("teamId").notEmpty().withMessage("Debes indicar el ID del equipo"),
   param("alertId").notEmpty().withMessage("Debes indicar el ID de la alerta"),
   body("dateTime").notEmpty().withMessage("Debes indicar la fecha y horario nueva para la alerta"),
   handleInputErrors,
   validateTeamExist,
   validateTeamAlertExist,
   updateTeamAlert
)

router.delete("/deleteTeamAlert/:teamId/:alertId", 
   param("teamId").notEmpty().withMessage("Debes indicar el ID del equipo"),
   param("alertId").notEmpty().withMessage("Debes indicar el ID de la alerta"),
   handleInputErrors,
   validateTeamAlertExist,
   deleteTeamAlert
)



export default router