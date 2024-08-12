import { Router } from "express";
import { createToken } from "../controllers/Token";

const router = Router()

router.post("/createToken", 
    createToken
)

export default Router