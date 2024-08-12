import { Router } from "express";
import { createUser } from "../controllers/User";

const router = Router()

router.post("/createUser", 
    createUser
)


export default router