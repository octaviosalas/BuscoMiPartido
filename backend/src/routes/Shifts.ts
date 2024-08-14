import { Router } from "express";
import { param, body } from "express-validator";
import { handleInputErrors } from "../middlewares/HandleErrors";
import { validateComplexExist, validateComplexIsAdminComplex } from "../middlewares/ComplexValidations";
import { validateAdminExist } from "../middlewares/AdminValidations";
import { createNewShift } from "../controllers/Shifts";


const router = Router()

router.post("/createShift/:complexId/:adminId",
    param("adminId").notEmpty().withMessage("Es obligatorio indicar el ID del administrador"),
    param("complexId").notEmpty().withMessage("Es obligatorio indicar el ID del complejo"),
    body("date").notEmpty().withMessage("Debes indicar la fecha del turno"),
    body("start").notEmpty().withMessage("Debes indicar el horario de comienzo"),
    body("end").notEmpty().withMessage("Debes indicar el finalizacion del turno"),
    handleInputErrors,
    validateComplexExist,
    validateComplexIsAdminComplex,
    validateAdminExist,
    createNewShift
)


export default router