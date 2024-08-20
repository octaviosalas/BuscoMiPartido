import { Request, Response } from "express";
import ComplexModel from "../models/ComplexModel";
import ComplexImages from "../models/ComplexImages";
import AdminModel from "../models/AdminModel";
import ReviewsModel from "../models/ReviewsModel";
import { calculateComplexPuntuactionPercentage } from "../utils/complexPunctuation";
import ShiftsModel from "../models/ShiftsModel";
import UserModel from "../models/UserModel";
import { database } from "../database/db";//para usar la transaccion
import { Sequelize } from "sequelize";


//Ejemplo de creacion de complejo con transaccion.
export const createComplex = async (req: Request, res: Response): Promise<void> => {
  const { name, location, province, address, shiftPrice, numberOfCourts, phone, images } = req.body;
  const { adminId } = req.params;

  let transaction; 

  try {
      const transaction = await database.transaction();

      const newComplex = await ComplexModel.create({
          name,
          location,
          province,
          address,
          shiftPrice,
          numberOfCourts,
          phone,
          adminId
      }, { transaction });

      if (images && images.length > 0) {
          const imagesData = images.map((img: string) =>
              ComplexImages.create({
                  url: img,
                  complexId: newComplex.id
              }, { transaction })
          );

          await Promise.all(imagesData);
      }

      await transaction.commit(); 
      res.status(200).send("Complejo guardado");
  } catch (error) {
      await transaction.rollback();
      res.status(500).send(error);
      console.log(error);
  }
};

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
 
  const {location} = req.params

  try {
      const complexes = await ComplexModel.findAll({
        where: Sequelize.where(Sequelize.fn('lower', Sequelize.col('location')), Sequelize.fn('lower', location)),
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

export const getComplexById = async (req: Request, res: Response): Promise <void> => { 
 
  const {complexId} = req.params

    try {
      const complexChoosen = await ComplexModel.findByPk(complexId, { 
        include: [
          { 
           model: ComplexImages,
           attributes: ["url"]
        },
        {
          model: ReviewsModel,
          attributes: ["text", "punctuation"]
        }
      ]
      })

        const percentage = await calculateComplexPuntuactionPercentage(Number(complexId))
        res.status(200).send({ 
           data: complexChoosen,
           percentageReviews: percentage
        })
      
    } catch (error) {
       res.status(500).send(error)
       console.log(error)
   }
}

export const deleteComplex = async (req: Request, res: Response): Promise <void> => { 
 
  const {complexId} = req.params

    try {
      const complexChoosen = await ComplexModel.findByPk(complexId)
      await complexChoosen.destroy()

      await ComplexImages.destroy({ 
        where: { 
          complexId: complexChoosen.id
        }
      })
      
      res.status(200).send("Se elimino correctamente el complejo del sistema")

    } catch (error) {
       res.status(500).send(error)
       console.log(error)
   }
}

export const getComplexShifts = async (req: Request, res: Response): Promise <void> => { 
 
  const {complexId} = req.params

    try {
       const complexShiftsData = await ShiftsModel.findAll({ 
          where: { 
            complex: complexId
          },
          include: [{ 
            model: UserModel,
            attributes: ["name"]
          }]
       })
       res.status(200).send(complexShiftsData)
    } catch (error) {
       res.status(500).send(error)
       console.log(error)
   }
}


/*EJEMPLO DE CREATE COMPLEX SIN TRANSACCION

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

*/