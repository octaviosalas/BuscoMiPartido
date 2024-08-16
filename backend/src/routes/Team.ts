import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middlewares/HandleErrors";
import { addPlayerToTeam, teamData } from "../controllers/Team";
import { validateTeamExist, validateTeamPlayersQuantity, validateIfAdminIsTeamOwner, validateIfPlayerAlreadyExistInTeam } from "../middlewares/TeamValidations";

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

router.delete("/teamData/:teamId", 
   param("teamId").notEmpty().withMessage("Debes indicar el ID del equipo que deseas obtenerr"),
   handleInputErrors,
   validateTeamExist,
   teamData
)



export default router