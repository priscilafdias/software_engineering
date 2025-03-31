// models/user.js

const db = require('../services/db'); // Ensure you have a services/db.js file exporting your connection/query function
const bcrypt = require('bcryptjs');

class User {
  constructor(email) {
    this.email = email;
    this.id = null;
  }

  // Get an existing user's ID based on their email
  async getIdFromEmail() {
    const query = 'SELECT id FROM Users WHERE email = ?';
    try {
      const results = await new Promise((resolve, reject) => {
        db.query(query, [this.email], (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });

      if (results.length > 0) {
        this.id = results[0].id;
        return this.id;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  // Update an existing user's password (hashing it first)
  async setUserPassword(password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = 'UPDATE Users SET password = ? WHERE id = ?';
      await new Promise((resolve, reject) => {
        db.query(query, [hashedPassword, this.id], (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Add a new user to the database with a hashed password
  async addUser(password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = 'INSERT INTO Users (email, password) VALUES (?, ?)';
      const result = await new Promise((resolve, reject) => {
        db.query(query, [this.email, hashedPassword], (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
      this.id = result.insertId;
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Compare a submitted password with the stored hashed password
  async authenticate(submittedPassword) {
    try {
      const query = 'SELECT password FROM Users WHERE id = ?';
      const results = await new Promise((resolve, reject) => {
        db.query(query, [this.id], (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });
      if (results.length > 0) {
        const match = await bcrypt.compare(submittedPassword, results[0].password);
        return match;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { User };
