import { Request, Response } from "express";
import AdminModel from "../models/AdminModel";
import { hashPassowrd } from "../utils/hashPassword";
import { createSixDigitsToken } from "../utils/createToken";
import TokenAdminModel from "../models/TokenAdminModel";
import { sendEmailToVerifyUserAccount } from "../utils/sendEmailToVerifyUserAccount";
import ComplexModel from "../models/ComplexModel";


export const createNewAdminAccount = async (req: Request, res: Response): Promise<void> => { 

    const {email, name, password} = req.body
    console.log("recibi", req.body)

    try {
        const newUserToBeAdded = new AdminModel({
            email: email,
            name: name,
            password: password
        })
        newUserToBeAdded.password = await hashPassowrd(password)
        await newUserToBeAdded.save();

        const token = new TokenAdminModel({
            number: createSixDigitsToken(),
            admin: newUserToBeAdded.id 
        })

        await sendEmailToVerifyUserAccount({ 
            email: newUserToBeAdded.email, 
            token: token.number, 
            name: newUserToBeAdded.name
       })

       await token.save();
       res.status(200).send("Hemos enviado un correo electronico a tu email para confirmar tu cuenta")

    } catch (error) {
        res.status(500).json({error: "Hubo un error en la creacion de la cuenta"})
    }
}


export const confirmAccountWithToken = async (req: Request, res: Response): Promise<void> => { 

    const {token} = req.body

    try {
        const verifyToken = await TokenAdminModel.findOne({
            where: {
              number: token
            }
          });

        if(!verifyToken) { 
            const error = new Error("El Token no ha sido encontrado. En caso de haber pasado los 15 minutos, intenta iniciar sesion nuevamente para recibir un token nuevo")
            res.status(202).json({error: error.message})
        } else { 
            const getUserTokenOwner = await AdminModel.findByPk(verifyToken.admin)
            getUserTokenOwner.confirmed = true
            await getUserTokenOwner.save() 
            await verifyToken.destroy() 
            res.status(200).json("La cuenta ha sido confirmada exitosamente")
        }


    } catch (error) {
       res.status(500).json({error: "Hubo un error en la creacion de la cuenta"})
    }
}


export const adminData = async (req: Request, res: Response): Promise<void> => { 
 
    const {adminId} = req.params

    try {
      const adminSelected = await AdminModel.findByPk(adminId, { 
        include: [{ 
            model: ComplexModel,
            as: "complexData"
        }]
      })
      if(!adminSelected) { 
        res.status(400).send(`No se encontraron datos del administrador con Referencia ${adminId}`)
      } else { 
        res.status(200).send(adminSelected)
      }
    } catch (error) {
       res.status(500).json({error: "Hubo un error en la creacion de la cuenta"})
    }
}

export const updateAdminData = async (req: Request, res: Response): Promise<void> => { 
    const {adminId} = req.params
    const {email, name} = req.body
    try {
        const adminSelected = await AdminModel.findByPk(adminId)
        if(!adminSelected) { 
            res.status(404).json({ 
                error: "Admin no encontrado"
            })
        } else { 
            adminSelected.name = name,
            adminSelected.email = email,
            await adminSelected.save()
            res.status(200).send(adminSelected)
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteAdminAccount = async (req: Request, res: Response): Promise<void> => { 

    const {adminId} = req.params
    try {
        const adminSelected = await AdminModel.findByPk(adminId)
        if(!adminSelected) { 
            res.status(404).json({error: "Admin no encontrado"})
        } else { 
            await ComplexModel.destroy({
                where: {
                    adminId: adminSelected.id
                }
            });
            await adminSelected.destroy(); 
            res.status(200).send("Has eliminado correctamente la cuenta");
        }
    } catch (error) {
        console.log(error)
    }

}