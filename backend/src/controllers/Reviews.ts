import { Request, Response } from "express";
import ReviewsModel from "../models/ReviewsModel";

export const createReview = async (req: Request, res: Response) : Promise<void> => { 
    
    const {complexId, userId} = req.params

    try {
        const reviewReceived = new ReviewsModel({ 
            text: req.body.text,
            punctuation: req.body.punctuation,
            user: userId,
            complex: complexId
        })
        await reviewReceived.save()
        res.status(200).send("La reseña del complejo ha sido correctamente enviada")
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
} 

export const updateReview = async (req: Request, res: Response) : Promise<void> => { 
    
    const {reviewId} = req.params

    try {
        const review = await ReviewsModel.findByPk(reviewId)
        review.text = req.body.text
        review.punctuation = req.body.punctuation
        await review.save()
        res.status(200).send("La reseña del complejo ha sido correctamente actualizada")
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
} 

export const deleteReview = async (req: Request, res: Response) : Promise<void> => { 
    
    const {reviewId} = req.params

    try {
        const review = await ReviewsModel.findByPk(reviewId)
        review.destroy()
        res.status(200).send("La reseña del complejo ha sido correctamente eliminada")
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
} 