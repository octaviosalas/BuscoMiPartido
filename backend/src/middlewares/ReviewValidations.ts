import ReviewsModel from "../models/ReviewsModel"
import type { Request, Response, NextFunction } from "express"


export const validateReviewExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {reviewId} = req.params

    try {
       const review = await ReviewsModel.findByPk(reviewId)

       if(!review) { 
          res.status(400).json("La reseña no existe")
        } else {
          next()
        }
    
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}


export const validateReviewIsUserReview = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {reviewId, userId} = req.params

    try {
       const review = await ReviewsModel.findByPk(reviewId)
       if(review.user !== Number(userId)) { 
         res.status(400).json("La reseña no es una reseña tuya, por lo cual no puedes editarla")
       } else { 
        next()
       }
      
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}
