// import thằng dotenv/config ở file này 1 lần để những
// file khác lấy các phần tử từ env ra thì sẽ ko cần phải gọi dotenv nữa
import 'dotenv/config'

export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  AUTHOR: process.env.AUTHOR
}