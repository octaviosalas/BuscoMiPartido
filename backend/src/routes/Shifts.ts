import { Router } from "express";
import { param, body } from "express-validator";
import { handleInputErrors } from "../middlewares/HandleErrors";
import { validateComplexExist, validateComplexIsAdminComplex } from "../middlewares/ComplexValidations";
import { validateAdminExist } from "../middlewares/AdminValidations";
import { createNewShift, updateShifStatus } from "../controllers/Shifts";
import { validateShiftExist } from "../middlewares/ShiftsValidations";


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

router.put("/updateShiftStatus/:shiftId/:complexId/:adminId",
    param("adminId").notEmpty().withMessage("Es obligatorio indicar el ID del administrador"),
    param("complexId").notEmpty().withMessage("Es obligatorio indicar el ID del complejo"),
    param("shiftId").notEmpty().withMessage("Es obligatorio indicar el ID del turno"),
    handleInputErrors,
    validateComplexExist,
    validateComplexIsAdminComplex,
    validateAdminExist,
    validateShiftExist,
    updateShifStatus
)

export default router