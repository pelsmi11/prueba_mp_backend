'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /* sp de usuarios */
    try{
    await queryInterface.sequelize.query(`
      CREATE PROCEDURE CreateUser
        @p_email NVARCHAR(255),
        @p_password NVARCHAR(255),
        @p_role NVARCHAR(255)
      AS
      BEGIN
        INSERT INTO users (email, password, role)
        VALUES (@p_email, @p_password, @p_role);
      END;
    `);

    await queryInterface.sequelize.query(`
      CREATE PROCEDURE ListUsers
      AS
      BEGIN
        SELECT * FROM users;
      END;
    `);

    await queryInterface.sequelize.query(`
      CREATE PROCEDURE GetUserById @id NVARCHAR(255)
      AS
      BEGIN
        SELECT * FROM users WHERE id = @id;
      END;
    `);

    await queryInterface.sequelize.query(`
      CREATE PROCEDURE UpdateUser
        @p_id INT,
        @p_email NVARCHAR(255),
        @p_password NVARCHAR(255),
        @p_role NVARCHAR(255)
      AS
      BEGIN
        UPDATE users
        SET email = @p_email,
            role = @p_role,
            password =  @p_password
        WHERE id = @p_id;
      END;
    `);

    await queryInterface.sequelize.query(`
      CREATE PROCEDURE DeleteUser
      @p_id INT
      AS
      BEGIN
        DELETE FROM users
        WHERE id = @p_id;
      END;
    `);

      /*sp de fiscal */
      await queryInterface.sequelize.query(`
        CREATE PROCEDURE CreateFiscal
          @p_name NVARCHAR(255),
          @p_lastName NVARCHAR(255),
          @p_phone NVARCHAR(255),
          @p_userId INT
        AS
        BEGIN
          INSERT INTO fiscals (name, last_name, phone, user_id)
          VALUES (@p_name, @p_lastName, @p_phone, @p_userId);
        END;
      `);

      await queryInterface.sequelize.query(`
        CREATE PROCEDURE ListFiscals
        AS
        BEGIN
          SELECT
            f.*,
            u.id,
            u.email,
            u.role
          FROM fiscals f
          INNER JOIN users u ON f.user_id = u.id;
        END;
      `);

      await queryInterface.sequelize.query(`
      CREATE PROCEDURE GetFiscalById
        @p_id INT
      AS
      BEGIN
        SELECT
          f.*,
          u.id,
          u.email,
          u.role
      FROM fiscals f
        INNER JOIN users u ON f.user_id = u.id
        WHERE f.id = @p_id;
      END;
      `);

      await queryInterface.sequelize.query(`
        CREATE PROCEDURE UpdateFiscal
          @p_id INT,
          @p_name NVARCHAR(255),
          @p_lastName NVARCHAR(255),
          @p_phone NVARCHAR(255),
          @p_userId INT
        AS
        BEGIN
          UPDATE fiscals
          SET name = @p_name,
              last_name = @p_lastName,
              phone = @p_phone,
              user_id = @p_userId
          WHERE id = @p_id;
        END;
      `);

      await queryInterface.sequelize.query(`
        CREATE PROCEDURE DeleteFiscal
          @p_id INT
        AS
        BEGIN
          DELETE FROM fiscals WHERE id = @p_id;
        END;
      `);

      /*sp de casos */
      await queryInterface.sequelize.query(`
        CREATE PROCEDURE CreateCase
          @p_fiscalId INT,
          @p_descrition NVARCHAR(100),
          @p_state NVARCHAR(50)
        AS
        BEGIN
          IF @p_state NOT IN ('terminado', 'en proceso')
            BEGIN
              RAISERROR('Invalid state value', 16, 1);
            RETURN;
          END

          INSERT INTO cases (fiscal_id, description, state)
          VALUES (@p_fiscalId, @p_descrition, @p_state);
        END;
      `);

      await queryInterface.sequelize.query(`
        CREATE PROCEDURE ListCases
        AS
        BEGIN
          SELECT
          c.*,           -- Selecciona todas las columnas de la tabla cases
          f.name,        -- Selecciona el nombre del fiscal
          f.last_name,   -- Selecciona el apellido del fiscal
          f.phone         -- Selecciona el teléfono del fiscal
        FROM cases c
        INNER JOIN fiscals f ON c.fiscal_id = f.id;
        END;
      `);

      await queryInterface.sequelize.query(`
        CREATE PROCEDURE GetCaseById
          @p_id INT
        AS
        BEGIN
          SELECT
            c.*,           -- Selecciona todas las columnas de la tabla cases
            f.name,        -- Selecciona el nombre del fiscal
            f.last_name,   -- Selecciona el apellido del fiscal
            f.phone         -- Selecciona el teléfono del fiscal
          FROM cases c
          INNER JOIN fiscals f ON c.fiscal_id = f.id
          WHERE c.id = @p_id;
        END;
      `);

      await queryInterface.sequelize.query(`
        CREATE PROCEDURE UpdateCase
          @p_id INT,
          @p_fiscalId INT,
          @p_descrition NVARCHAR(100),
          @p_state NVARCHAR(50)
        AS
        BEGIN
          IF @p_state NOT IN ('terminado', 'en proceso')
            BEGIN
              RAISERROR('Invalid state value', 16, 1);
            RETURN;
          END

          UPDATE cases
          SET fiscal_id = @p_fiscalId,
              description = @p_descrition,
              state = @p_state
          WHERE id = @p_id;
        END;
      `);

      await queryInterface.sequelize.query(`
        CREATE PROCEDURE DeleteCase
          @p_id INT
        AS
        BEGIN
          DELETE FROM cases WHERE id = @p_id;
        END;
      `);
    } catch (error) {
      console.error("Migration error:", error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP PROCEDURE IF EXISTS CreateUser;
    `);

    await queryInterface.sequelize.query(`
      DROP PROCEDURE IF EXISTS ListUsers;
    `);

    await queryInterface.sequelize.query(`
      DROP PROCEDURE IF EXISTS GetUserById;
    `);

    await queryInterface.sequelize.query(`
      DROP PROCEDURE IF EXISTS UpdateUser;
    `);

    await queryInterface.sequelize.query(`
      DROP PROCEDURE IF EXISTS DeleteUser;
    `);

    await queryInterface.sequelize.query(`
      DROP PROCEDURE IF EXISTS CreateFiscal;
    `);

    await queryInterface.sequelize.query(`
      DROP PROCEDURE IF EXISTS ListFiscals;
    `);

    await queryInterface.sequelize.query(`
      DROP PROCEDURE IF EXISTS GetFiscalById;
    `);

    await queryInterface.sequelize.query(`
      DROP PROCEDURE IF EXISTS UpdateFiscal;
    `);

    await queryInterface.sequelize.query(`
      DROP PROCEDURE IF EXISTS DeleteFiscal;
    `);

    await queryInterface.sequelize.query(`
      DROP PROCEDURE IF EXISTS CreateCase;
    `);

    await queryInterface.sequelize.query(`
      DROP PROCEDURE IF EXISTS ListCases;
    `);

    await queryInterface.sequelize.query(`
      DROP PROCEDURE IF EXISTS GetCaseById;
    `);

    await queryInterface.sequelize.query(`
      DROP PROCEDURE IF EXISTS UpdateCase;
    `);

    await queryInterface.sequelize.query(`
      DROP PROCEDURE IF EXISTS DeleteCase;
    `);
  },
};
