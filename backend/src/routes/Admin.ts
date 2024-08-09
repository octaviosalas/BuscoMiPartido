import {Router} from "express"
import {body, param} from "express-validator"

const router = Router()


router.get("/everyAdmins")

router.get("/adminData/:adminId")

router.post("/createAdmin")

router.put("/updateAdminData/:adminId")

router.delete("/deleteAdmin/:adminId")


export default Router