/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'

const START_SERVER = () => {
  const app = express()

  app.get('/', async (req, res) => {
    res.end('<h1>Hello Con Cark Do</h1><hr>')
  })
  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`3. Hello ${env.AUTHOR}, Back-End Server is running succesfully at Host: ${env.APP_HOST} and Port: ${env.APP_PORT}`)
  })

  exitHook(() => {
    console.log('4. Server is shutting down...')
    CLOSE_DB()
    console.log('5. Disconnected MongoDB Cloud Atlas!')
  })
}


// //Chỉ khi connect tới database thành công thì mới Start Back-End lên
// console.log('1. Connecting to MongoDB CLoud Atlas...')
// CONNECT_DB()
//   .then(() => console.log('2. Connected to MongoDB CLoud Atlas!'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })

// Cách viết khác: IIFE in JS
//Chỉ khi connect tới database thành công thì mới Start Back-End lên
(async () => {
  try {
    console.log('1. Connecting to MongoDB CLoud Atlas...')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB CLoud Atlas!')
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()