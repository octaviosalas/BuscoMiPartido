import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middlewares/HandleErrors";
import { validateComplexExist } from "../middlewares/ComplexValidations";
import { validateUserExist } from "../middlewares/UserVlidations";
import { createReview, updateReview, deleteReview } from "../controllers/Reviews";
import { validateReviewExist, validateReviewIsUserReview } from "../middlewares/ReviewValidations";

const router = Router()

router.post("/createComplexReview/:complexId/:userId",
    param("complexId").notEmpty().withMessage("Es obligatorio indicar el ID del complejo"),
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del complejo"),
    body("text").notEmpty().withMessage("Es obligatorio escribir una reseña"),
    body("punctuation").notEmpty().withMessage("Es obligatorio indicar una puntuacion"),
    handleInputErrors,
    validateComplexExist,
    validateUserExist,
    createReview
)

router.put("/updateMyReview/:userId/:reviewId",
    param("reviewId").notEmpty().withMessage("Es obligatorio indicar el ID del complejo"),
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del complejo"),
    body("text").notEmpty().withMessage("Es obligatorio escribir una reseña"),
    body("punctuation").notEmpty().withMessage("Es obligatorio indicar una puntuacion"),
    handleInputErrors,
    validateUserExist,
    validateReviewExist,
    validateReviewIsUserReview,
    updateReview
)

router.delete("/deleteReview/:userId/:reviewId",
    param("reviewId").notEmpty().withMessage("Es obligatorio indicar el ID del complejo"),
    param("userId").notEmpty().withMessage("Es obligatorio indicar el ID del complejo"),
    body("text").notEmpty().withMessage("Es obligatorio escribir una reseña"),
    body("punctuation").notEmpty().withMessage("Es obligatorio indicar una puntuacion"),
    handleInputErrors,
    validateUserExist,
    validateReviewExist,
    validateReviewIsUserReview,
    deleteReview
)

export default router