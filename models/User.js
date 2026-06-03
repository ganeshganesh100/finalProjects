const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      phone: userData.phone,
      role: userData.role || 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
