"use strict";
const faker = require("faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { USER_TABLE } = await import("../../models/user.model.js");
    const { FISCAL_TABLE } = await import("../../models/fiscal.model.js");
    const { CASE_TABLE } = await import("../../models/case.model.js");

    const users = [];
    const fiscals = [];
    const cases = [];

    for (let i = 0; i < 10; i++) {
      const userId = i + 1;
      users.push({
        email: faker.internet.email(),
        password: faker.internet.password(),
        recovery_token: faker.datatype.boolean
          ? faker.internet.password()
          : null,
        role: faker.random.arrayElement(["user", "admin"]),
        create_at: new Date(),
      });

      fiscals.push({
        name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        phone: faker.phone.phoneNumber(),
        created_at: new Date(),
        user_id: userId,
      });

      cases.push({
        fiscal_id: userId,
        state: faker.random.arrayElement(["terminado", "en proceso"]),
        description: faker.lorem.sentence(),
        created_at: new Date(),
      });
    }

    await queryInterface.bulkInsert(USER_TABLE, users, {});
    await queryInterface.bulkInsert(FISCAL_TABLE, fiscals, {});
    await queryInterface.bulkInsert(CASE_TABLE, cases, {});
  },

  async down(queryInterface, Sequelize) {
    const { USER_TABLE } = await import("../../models/user.model.js");
    const { FISCAL_TABLE } = await import("../../models/fiscal.model.js");
    const { CASE_TABLE } = await import("../../models/case.model.js");

    await queryInterface.bulkDelete(CASE_TABLE, null, {});
    await queryInterface.bulkDelete(FISCAL_TABLE, null, {});
    await queryInterface.bulkDelete(USER_TABLE, null, {});
  },
};
