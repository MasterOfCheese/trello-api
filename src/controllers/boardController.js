import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  try {
    console.log('req.body is showing here: ', req.body)
    console.log('req.query is showing here: ', req.query)
    console.log('req.params is showing here: ', req.params)
    console.log('req.files is showing here: ', req.files)
    console.log('req.cookies is showing here: ', req.cookies)
    console.log('req.jwtDecoded is showing here: ', req.jwtDecoded)

    // Điều hướng request sang tầng service
    // Có kết quả thì trả về phía client sau
    res.status(StatusCodes.CREATED).json ({ message: 'POST from Controller: API create new boards' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message
    })
  }
}

export const boardController = {
  createNew
}