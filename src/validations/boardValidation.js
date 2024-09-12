import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  const correctConditon = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required (namphuongdev)',
      'string.empty': 'Title is not allowed to be empty (namphuongdev)',
      'string.min': 'Title length must be at least 3 char long (namphuongdev)',
      'string.max': 'Title length must be less than or equal to 50 char long (namphuongdev)',
      'string.trim': 'Title must not have whitespace'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    // cái log dưới đây để log ra data test ở postman
    // thằng abortAerly:false của thằng Joi sẽ check hết tất cả các lỗi Validation chứ ko dừng lại ở thằng đầu tiên nữa.
    await correctConditon.validateAsync(req.body, { abortEarly: false })
    // Validate dữ liệu hợp lệ xong thì mới cho request đi tiếp sang Controller
    next()
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}

export const boardValidation = {
  createNew
}