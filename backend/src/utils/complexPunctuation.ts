import ComplexModel from "../models/ComplexModel"
import ReviewsModel from "../models/ReviewsModel"

export const calculateComplexPuntuactionPercentage = async (complexId: number) => { 

  const complexReviews = await ReviewsModel.findAll({ 
    where: { 
        complex: complexId
    }
  })

  const quantityReviews = complexReviews.length
  console.log("cantidad de reviews", quantityReviews)
  const totalNumberOfPunctuations = complexReviews.reduce((acc, el) => acc + el.punctuation, 0)
  console.log("suma de todas las puntuaciones", totalNumberOfPunctuations)
  const percentage = totalNumberOfPunctuations / quantityReviews
  console.log("percangeReturn", percentage)
  return percentage
}