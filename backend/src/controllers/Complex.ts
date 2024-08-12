import { Request, Response } from "express";
import ComplexModel from "../models/ComplexModel";
import ComplexImages from "../models/ComplexImages";

export const createComplex = async (req: Request, res: Response): Promise <void> => { 
    const {name, location, address, shiftPrice, numberOfCourts, phone, images} = req.body
    const {adminId} = req.params
   try {
       const newComplex = new ComplexModel({ 
         name: name,
         location: location,
         address: address,
         shiftPrice: shiftPrice,
         numberOfCourts: numberOfCourts,
         phone: phone,
         adminId: adminId
       })
       await newComplex.save()

       if(images.length > 0) { 
         const imagesData = images.map((img : string) => { 
            const imageInstance = new ComplexImages({ 
                url: img,
                complexId: newComplex.id
            })
            return imageInstance.save();
         })
         await Promise.all(imagesData);
       }

       res.status(200).send("Complejo guardado")
    } catch (error) {
        
    }
}