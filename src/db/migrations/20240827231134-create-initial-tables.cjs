"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { USER_TABLE, UserSchema } = await import(
      "../../models/user.model.js"
    );
    const { FISCAL_TABLE, FiscalSchema } = await import(
      "../../models/fiscal.model.js"
    );
    const { CASE_TABLE, CaseSchema } = await import(
      "../../models/case.model.js"
    );

    try {
      await queryInterface.createTable(USER_TABLE, UserSchema);
      await queryInterface.createTable(FISCAL_TABLE, FiscalSchema);
      await queryInterface.createTable(CASE_TABLE, CaseSchema);
    } catch (error) {
      console.error("Migration error:", error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const { CASE_TABLE } = await import("../../models/case.model.js");
    const { FISCAL_TABLE } = await import("../../models/fiscal.model.js");
    const { USER_TABLE } = await import("../../models/user.model.js");
    try {
      await queryInterface.dropTable(CASE_TABLE);
      await queryInterface.dropTable(FISCAL_TABLE);
      await queryInterface.dropTable(USER_TABLE);
    } catch (error) {
      console.error("Migration error:", error);
      throw error;
    }
  },
};
