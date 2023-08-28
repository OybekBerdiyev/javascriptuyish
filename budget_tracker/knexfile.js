const config = require("./config");

/**
 * @type { import("knex").Knex.Config }
 */
module.exports = {

  development: {
    client: 'postgresql',
    migrations: {
      directory: './database'
    },
    connection: {
      connectionString: config.connectionSring 
    }
  },

  staging: {
    client: 'postgresql', 
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
