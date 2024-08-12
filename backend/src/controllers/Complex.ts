import { Request, Response } from "express";
import ComplexModel from "../models/ComplexModel";
import ComplexImages from "../models/ComplexImages";
import AdminModel from "../models/AdminModel";

export const createComplex = async (req: Request, res: Response): Promise <void> => { 
    const {name, location, address, shiftPrice, numberOfCourts, phone, images} = req.body
    const {adminId} = req.params
    console.log(req.body)
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
        console.log("varias imagenes")
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
         res.status(500).send(error)
        console.log(error)
    }
}

export const getEveryComplex = async (req: Request, res: Response): Promise<void> => {
  try {
      const complexes = await ComplexModel.findAll({
          include: [
          {
              model: ComplexImages,
              attributes: ['url'], 
          },
          {
            model: AdminModel,
            attributes: ['name'] 
        }]
      });

      res.status(200).json(complexes);
  } catch (error) {
      res.status(500).send(error);
      console.error(error);
  }
};

export const getComplexByLocation = async (req: Request, res: Response): Promise <void> => { 
 
  const {location} = req.body

  try {
      const complexes = await ComplexModel.findAll({
        where: {
          location: location 
         },
        include: [
            {
                model: ComplexImages,
                attributes: ['url'], 
            },
            {
              model: AdminModel,
              attributes: ['name'] 
          }
        ]
      });
  res.status(200).json(complexes);
   } catch (error) {
        res.status(500).send(error)
       console.log(error)
   }
}

