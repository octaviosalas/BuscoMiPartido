import {Router} from "express"
import {body, param} from "express-validator"

const router = Router()


router.get("/everyComplex")

router.get("/complexData/:complexId")

router.get("/complexShifts/:complexId")

router.delete("/deleteComplex/:complexId")

router.put("/updateComplexData/:adminId")



export default Router