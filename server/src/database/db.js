import { Sequelize } from 'sequelize'
import configEnv from '../config/env.js'

const db = new Sequelize(
  configEnv.mysql_db,
  configEnv.mysql_user,
  configEnv.mysql_pass,
  {
    host: configEnv.mysql_uri,
    dialect: 'mysql'
  }
)

export default db
