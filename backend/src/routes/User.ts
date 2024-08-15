import { Router } from "express";
import { createUser, createUserWithTeam } from "../controllers/User";
import { handleInputErrors } from "../middlewares/HandleErrors";
import { body, param } from "express-validator";
import { validateUserNotExist, validateUserNotExistInCreationWithTeam } from "../middlewares/UserValidations";


const router = Router()

router.post("/createUser", 
    body("name").notEmpty().withMessage("Debes indicar tu nombre"),
    body("email").notEmpty().withMessage("Debes indicar tu correo electronico"),
    body("password").notEmpty().withMessage("Debes indicar tu contraseña para poder iniciar sesion"),
    handleInputErrors,
    validateUserNotExist,
    createUser
)

router.post("/createUserAndCreateTeam", 
    body("user.name").notEmpty().withMessage("Debes indicar tu nombre"),
    body("user.email").notEmpty().withMessage("Debes indicar tu correo electronico"),
    body("user.password").notEmpty().withMessage("Debes indicar tu contraseña para poder iniciar sesion"),
    body("team.name").notEmpty().withMessage("Debes indicar el nombre del equipo para poder crearlo"),
    body("team.location").notEmpty().withMessage("Debes indicar la localidad del equipo para poder crearla"),
    handleInputErrors,
    validateUserNotExistInCreationWithTeam,
    createUserWithTeam
)


export default router