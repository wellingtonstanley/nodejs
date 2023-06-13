const Sequelize = require("sequelize");
//configuracao do banco de dados com a utilizacao do framework sequelize
const db = new Sequelize(  process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,
  {
    host: process.env.DB_URL,
    dialect: 'mssql',
    port: process.env.DB_PORTA,
    driver: 'tedious',
    //se true exibe os logs de SQL
    logging: false,
    define: {
      timestamps: false,
      freezeTableName: true
    },
    dialectOptions: {
      requestTimeout: 30000,
      encrypt: true,
    }
  },
);
db.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

module.exports = db;
