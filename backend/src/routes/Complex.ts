import {Router} from "express"
import {body, param} from "express-validator"
import { createComplex } from "../controllers/Complex"
import { handleInputErrors } from "../middlewares/HandleErrors"
import { validateAdminExist } from "../middlewares/AdminValidations"

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

router.get("/everyComplex")

router.get("/complexData/:complexId")

router.get("/complexShifts/:complexId")

router.delete("/deleteComplex/:complexId")

router.put("/updateComplexData/:adminId")



export default router