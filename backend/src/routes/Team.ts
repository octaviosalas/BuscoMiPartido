import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middlewares/HandleErrors";
import { addPlayerToTeam, deletePlayer, teamData, updatePlayerData } from "../controllers/Team";
import { validateTeamExist, validateTeamPlayersQuantity, validateIfAdminIsTeamOwner, validateIfPlayerAlreadyExistInTeam } from "../middlewares/TeamValidations";
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
   
)


export default router