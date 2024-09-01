import client from "../utills/database";

class UserRepository {
  async createUser(email: string, password: string) {
    const query = `
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [email, password];

    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Could not create user");
    }
  }

  async getUserById(id: string) {
    const query = `
      SELECT * FROM users WHERE id = $1;
    `;
    const values = [id];

    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error retrieving user by id:", error);
      throw new Error("Could not retrieve user");
    }
  }

  async getUserByEmail(email: string) {
    const query = `
      SELECT * FROM users WHERE email = $1;
    `;
    const values = [email];

    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error retrieving user by email:", error);
      throw new Error("Could not retrieve user by email");
    }
  }

  async updateUser(id: string, email: string, password: string) {
    const query = `
      UPDATE users
      SET email = $2, password = $3
      WHERE id = $1
      RETURNING *;
    `;
    const values = [id, email, password];

    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Could not update user");
    }
  }

  async deleteUser(id: string) {
    const query = `
      DELETE FROM users WHERE id = $1
      RETURNING *;
    `;
    const values = [id];

    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Could not delete user");
    }
  }
}

export default new UserRepository();
