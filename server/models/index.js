const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const process = require('process');

const config = require(path.join(__dirname, '/../config/database'))[
  process.env.NODE_ENV || 'development'
];

const db = {};

const sequelize = config.use_env_variable
  ? new Sequelize(`${[config.use_env_variable]}?sslmode=no-verify`, config)
  : new Sequelize(config.database, config.username, config.password, config);

const loadModels = () => {
  const basename = path.basename(__filename);

  fs.readdirSync(__dirname)
    .filter(
      (file) =>
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js' &&
        file.indexOf('.test.js') === -1
    )
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(
        sequelize,
        Sequelize.DataTypes
      );
      db[model.name] = model;
    });
};

const initializeAssociations = () => {
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
};

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    loadModels();
    initializeAssociations();

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    console.log('\n' + '='.repeat(86).blue);
    console.log(`🌐 DATABASE CONNECTION STATUS`.bold.blue);
    console.log('='.repeat(86).blue);
    console.log(
      `✅ Connection: ${config.dialect} connection established!`.green
    );
    console.log(`🔗 Host:       ${sequelize.config.host}`.cyan);
    console.log(`📦 Database:   ${sequelize.config.database}`.cyan);
    console.log(`👤 Username:   ${sequelize.config.username}`.cyan);
    console.log(`⏰ Timestamp:  ${new Date().toLocaleString()}`.magenta);
    console.log(`🌍 Node ENV:   ${process.env.NODE_ENV}`.yellow);
    console.log('-'.repeat(86).blue);

    // Sync database with models
    await sequelize.sync({ alter: true });
    console.log(`🛠️  Models synchronized successfully!`.green);
    console.log(`📚 Loaded Models: ${Object.keys(db).join(', ')}`.cyan);
    console.log('='.repeat(86).blue);
  } catch (error) {
    console.error('\n' + '='.repeat(86).red);
    console.error(`❌ DATABASE CONNECTION ERROR`.red.bold);
    console.error('='.repeat(86).red);
    console.error(`📌 Error Type: ${error.name}`.red);
    console.error(`💬 Message: ${error.message}`.red);
    console.error('='.repeat(86).red);
    process.exit(1);
  }
};

module.exports = { db, connectDB };
