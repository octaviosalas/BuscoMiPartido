import { Router } from "express";
import { createToken, getTokens } from "../controllers/Token";

const router = Router()

router.post("/createToken", 
    createToken
)

router.get("/everyTokens", 
    getTokens
)

export default router