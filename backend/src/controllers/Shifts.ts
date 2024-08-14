import { Request, Response } from "express";
import ShiftsModel from "../models/ShiftsModel";

export const createNewShift = async (req: Request, res: Response): Promise<void> => { 
    
    const {adminId, complexId} = req.params;
    const {date, start, end} = req.body;

    try {
        const newShiftToBeSaved = await ShiftsModel.create({
            complex: complexId,
            date: new Date(date).toISOString(),
            start: new Date(start).toISOString(),
            end: new Date(end).toISOString(),
            user: null,
        });
        await newShiftToBeSaved.save()
        res.status(200).send("Turno almacenado");
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
} 

export const updateShifStatus = async (req: Request, res: Response): Promise<void> => { 
    
    const {shiftId} = req.params;

    try {
        const shift = await ShiftsModel.findByPk(shiftId)
        shift.available = !shift.available
        await shift.save()
        res.status(200).send("Turno almacenado");
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
} 