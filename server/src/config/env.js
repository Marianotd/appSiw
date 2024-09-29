import dotenv from 'dotenv'

dotenv.config()

const configEnv = {
  port: process.env.PORT,
  cors_origin: process.env.CORS_ORIGIN,
  mysql_uri: process.env.MYSQL_URI,
  mysql_db: process.env.MYSQL_DBNAME,
  mysql_user: process.env.MYSQL_USER,
  mysql_pass: process.env.MYSQL_PASS,
  jwt_code: process.env.SECRET_JWT_CODE,
  jwt_refresh: process.env.SECRET_JWT_REFRESH,
  user_mail: process.env.USER_EMAIL,
  user_pass: process.env.USER_PASS
}

export default configEnv
