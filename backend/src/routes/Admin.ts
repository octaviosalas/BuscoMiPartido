import {Router} from "express"
import {body, param} from "express-validator"
import { handleInputErrors } from "../middlewares/HandleErrors"
import { validateAdminNotExist, validateAdminExist } from "../middlewares/AdminValidations"
import { createNewAdminAccount, confirmAccountWithToken, adminData, updateAdminData, deleteAdminAccount} from "../controllers/Admin"

const router = Router()

router.get("/adminData/:adminId",
    param("adminId").notEmpty().withMessage("Es obligatorio indicar el ID del administrador"),
    handleInputErrors,
    adminData
)

router.post("/createAdmin",
    body("email").notEmpty().withMessage("El nombre del cliente es obligatorio"),
    body("name").notEmpty().withMessage("El nombre del cliente es obligatorio"),
    body("password").notEmpty().withMessage("La contraseña de tu futura cuenta es obligatoria"),
    body("password_confirmation").notEmpty().withMessage("La confirmacion de contraseña de tu futura cuenta es obligatoria"),
    body("password").isLength({min: 6}).withMessage("La contraseña debe tener mas de 6 caracteres"),
    body("password_confirmation").custom((value, {req}) => { 
        if(value !== req.body.password) {
            throw new Error("Las contraseñas deben ser iguales")
        }
        return true
    }),   
    handleInputErrors,
    validateAdminNotExist,
    createNewAdminAccount

)

router.post("/verifyAccountWithToken",
    body("token").notEmpty().withMessage("El Token es obligatorio"),     
    body("token").isLength({ min: 6, max: 6 }).withMessage("El Token debe tener exactamente 6 números"),  
    handleInputErrors,
    confirmAccountWithToken
)

router.put("/updateAdminData/:adminId",
    param("adminId").notEmpty().withMessage("Es obligatorio indicar el ID del administrador"),
    body("email").notEmpty().withMessage("El email del administrador es obligatorio"),
    body("name").notEmpty().withMessage("El nombre del administrador es obligatorio"),
    handleInputErrors,
    validateAdminExist,
    updateAdminData
)

router.delete("/deleteAdmin/:adminId",
    param("adminId").notEmpty().withMessage("Es obligatorio indicar el ID del administrador"),
    handleInputErrors,
    validateAdminExist,
    deleteAdminAccount
)


export default router