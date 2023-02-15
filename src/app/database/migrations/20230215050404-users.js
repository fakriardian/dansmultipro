module.exports = {
    up: async (queryInterface, Sequelize) => queryInterface.createTable('users', {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        create_date: {
            type: Sequelize.DATE(),
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        update_date: {
            type: Sequelize.DATE
        },
        delete_date: {
            type: Sequelize.DATE
        }
    }, { schema: 'public' }),

    down: async (queryInterface) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable('users', {
            schema: 'public'
        });
    }
};
