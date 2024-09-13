import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {
  try {
    // console.log('req.body is showing here: ', req.body)
    // console.log('req.query is showing here: ', req.query)
    // console.log('req.params is showing here: ', req.params)
    // console.log('req.files is showing here: ', req.files)
    // console.log('req.cookies is showing here: ', req.cookies)
    // console.log('req.jwtDecoded is showing here: ', req.jwtDecoded)

    // Điều hướng request sang tầng service
    const createdBoard = await boardService.createNew(req.body)
    // Có kết quả thì trả về phía client sau
    res.status(StatusCodes.CREATED).json (createdBoard)
  } catch (error) { next(error) }
}

export const boardController = {
  createNew
}