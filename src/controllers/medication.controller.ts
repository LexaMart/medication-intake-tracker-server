import { Router } from "express";
import { StatusCodes } from "../utills/constants";

// import guard from "../middleware/guard";
import medicationService from "../services/medication.service";
import { MedicationCreateBodyDto } from "../dto/medication/medication-create-body.dto";

export const medicationRouter = Router();
const prefix = "/medications/";

medicationRouter.get(`${prefix}user/:userId`, async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);

    const medications = await medicationService.getMedicationsByUserId(userId);
    res.status(StatusCodes.OK).send(medications);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send({
      error: error.message,
    });
  }
});

medicationRouter.put(`${prefix}:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, intakeDate, destinationCount, count } = req.body;
    const updatedMedication = await medicationService.updateMedication(
      id,
      name,
      description,
      intakeDate,
      destinationCount,
      count
    );
    res.status(StatusCodes.OK).send(updatedMedication);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send({
      error: error.message,
    });
  }
});

medicationRouter.post(
  `${prefix}`,
  async (req: { body: MedicationCreateBodyDto }, res) => {
    try {
      const { name, description, intakeDate, destinationCount, count, userId } =
        req.body;
      console.log(req.body);

      const newMedication = await medicationService.createMedication(
        name,
        description,
        intakeDate,
        destinationCount,
        count,
        userId
      );
      res.status(StatusCodes.OK).send(newMedication);
    } catch (error: any) {
      res.status(StatusCodes.BAD_REQUEST).send({
        error: error.message,
      });
    }
  }
);
