/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'

const createNew = async(reqBody) => {
  try {
    // Xử lý logic dữ liệu tùy đặc thù dự án
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Gọi tới tầng Model để xử lý lưu bản ghi newBoard vào trong Database
    // Phai co return de tra ket qua ve, trong Service luon phai co return neu ko request se bi chet
    return newBoard
  } catch (error) { throw error }
}

export const boardService = {
  createNew
}