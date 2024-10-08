import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from '~/routes/v1/boardRoute'

const Router = express.Router()

// Check APIs v1/status/
Router.get('/status', (req, res) => { //check status cua server
  res.status(StatusCodes.OK).json ({ message: 'APIs v1 are ready to use.' })
})

// Boards APIs
Router.use('/boards', boardRoute)

export const APIs_v1 = Router