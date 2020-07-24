module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('professors', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      matricula_prof: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      cpf: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true,
      },
      rg: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true,
      },
      endereco: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      telefone: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      formacao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      escolaridade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bancodados: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      provider: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('professors');
  },
};
