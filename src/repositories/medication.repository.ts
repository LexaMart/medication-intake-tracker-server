import client from "../utills/database";

class MedicationRepository {
  async createMedication(
    name: string,
    description: string,
    intakeDate: string,
    destinationCount: string,
    count: string,
    userId: string
  ) {
    const query = `
      INSERT INTO medication (name, description, "intakeDate", "destinationCount", count, "userId")
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [
      name,
      description,
      intakeDate,
      destinationCount,
      count,
      userId,
    ];

    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error creating medication:", error);
      throw new Error("Could not create medication");
    }
  }

  async getMedicationById(id: string) {
    const query = `
      SELECT * FROM medication WHERE id = $1;
    `;
    const values = [id];

    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error retrieving medication by id:", error);
      throw new Error("Could not retrieve medication");
    }
  }

  async getMedicationsByUserId(userId: string) {
    const query = `
      SELECT * FROM medication WHERE "userId" = $1;
    `;
    const values = [userId];

    try {
      const result = await client.query(query, values);
      return result.rows;
    } catch (error) {
      console.error("Error retrieving medications for user:", error);
      throw new Error("Could not retrieve medications");
    }
  }

  async updateMedication(
    id: string,
    name: string,
    description: string,
    intakeDate: string,
    destinationCount: string,
    count: string
  ) {
    const query = `
      UPDATE medication
      SET name = $2, "description" = $3, "intakeDate" = $4, "destinationCount" = $5, count = $6
      WHERE id = $1
      RETURNING *;
    `;
    const values = [id, name, description, intakeDate, destinationCount, count];

    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error updating medication:", error);
      throw new Error("Could not update medication");
    }
  }

  async deleteMedication(id: string) {
    const query = `
      DELETE FROM medication WHERE id = $1
      RETURNING *;
    `;
    const values = [id];

    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error deleting medication:", error);
      throw new Error("Could not delete medication");
    }
  }
}

export default new MedicationRepository();
