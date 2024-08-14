import {Router} from "express"
import {body, param} from "express-validator"
import { createComplex, getEveryComplex, getComplexByLocation, getComplexById, deleteComplex, getComplexShifts } from "../controllers/Complex"
import { handleInputErrors } from "../middlewares/HandleErrors"
import { validateAdminExist } from "../middlewares/AdminValidations"
import { validateComplexExist } from "../middlewares/ComplexValidations"

const router = Router()

router.post("/createComplex/:adminId",
    param("adminId").notEmpty().withMessage("Es obligatorio indicar el ID del administrador"),
    body("name").notEmpty().withMessage("Es obligatorio indicar el nombre del complejo"),
    body("location").notEmpty().withMessage("Es obligatorio indicar la localidad del complejo"),
    body("shiftPrice").notEmpty().withMessage("Es obligatorio indicar el valor del turno del complejo"),
    body("address").notEmpty().withMessage("Es obligatorio indicar la direccion exacta del complejo"),
    body("numberOfCourts").notEmpty().withMessage("Es obligatorio indicar el numero de canchas disponibles del complejo"),
    body("phone").notEmpty().withMessage("Es obligatorio indicar el telefono del complejo"),
    handleInputErrors,
    validateAdminExist,
    createComplex
)

router.get("/everyComplex",
    getEveryComplex
)

router.get("/complexByLocation",
    body("location").notEmpty().withMessage("La localidad es obligatoria"),
    handleInputErrors,
    getComplexByLocation
)

router.get("/complexData/:complexId", 
    param("complexId").notEmpty().withMessage("Es obligatorio indicar el ID del complejo"),
    handleInputErrors,
    validateComplexExist,
    getComplexById
)

router.get("/complexShifts/:complexId",
    param("complexId").notEmpty().withMessage("Debes indicar de que complejo queres ver la disponibilidad"),
    handleInputErrors,
    validateComplexExist,
    getComplexShifts
)

router.delete("/deleteComplex/:complexId",
    param("complexId").notEmpty().withMessage("Es obligatorio indicar el ID del complejo"),
    handleInputErrors,
    validateComplexExist,
    deleteComplex
)

router.put("/updateComplexData/:adminId")



export default router