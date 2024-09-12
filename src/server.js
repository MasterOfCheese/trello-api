/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_v1 } from '~/routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
const app = express()

const START_SERVER = () => {

  // Enable req.body json data in Postman
  app.use(express.json())

  // Using API V1
  app.use('/v1', APIs_v1)

  // MiddleWare xử lý lỗi tập trung:
  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`3. Howdy ${env.AUTHOR}, backend server's running at host:${env.APP_HOST} and port:${env.APP_PORT}`)
  })

  // Thực hiện các tác vụ cleanup trước khi dừng server
  exitHook(() => {
    console.log('4. Server is shutting down...')
    CLOSE_DB()
    console.log('5. Disconnected from MongoDB CLoud Atlas')
  })
}

// Chỉ khi connect tới DB thành công thì mới start server backend lên
// Viết theo kiểu IIFE:
(async () => {
  try {
    console.log('1. Connecting to MongoDB Cloud Atlat...')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB Cloud Atlat')
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// // Chỉ khi connect tới DB thành công thì mới start server backend lên
// console.log('1. Connecting to MongoDB Cloud Atlat...')
// CONNECT_DB()
//   .then(() => console.log('2. Connected to MongoDB Cloud Atlat'))
//   .then(() => START_SERVER())
//   .catch( error => {
//     console.error(error)
//     process.exit(0)
//   })