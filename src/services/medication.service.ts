import medicationRepository from "../repositories/medication.repository";

class MedicationService {
  async getMedicationsByUserId(userId: string) {
    return await medicationRepository.getMedicationsByUserId(userId);
  }

  async updateMedication(
    id: string,
    name: string,
    description: string,
    intakeDate: string,
    destinationCount: string,
    count: string
  ) {
    return await medicationRepository.updateMedication(
      id,
      name,
      description,
      intakeDate,
      destinationCount,
      count
    );
  }

  async createMedication(
    name: string,
    description: string,
    intakeDate: string,
    destinationCount: string,
    count: string,
    userId: string
  ) {
    return await medicationRepository.createMedication(
      name,
      description,
      intakeDate,
      destinationCount,
      count,
      userId
    );
  }
}

export default new MedicationService();
