import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

//Khoi tao 1 doi tuong trelloDatabaseInstace ban dau = null (vi chua connect toi db)
let trelloDatabaseInstace = null

//khoi tao 1 doi tuong mongoClientInstance de connect toi db
const mongoClientInstance = new MongoClient( env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

// Ket noi toi Database:
export const CONNECT_DB = async () => {
  // Gọi kết nối tới mongoDB Atlas với URI đã khai báo trong thân của ClientInstance
  await mongoClientInstance.connect()
  // Kết nối thành công thì lấy ra database theo tên và gán ngược vào biến trelloDatabaseInstace ở trên mà ban đầu = null
  trelloDatabaseInstace = mongoClientInstance.db(env.DATABASE_NAME)
}

//Đóng kết nối tới db khi cần:
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

export const GET_DB = () => {
  // chỉ luôn gọi cái GET_DB này khi đã kết nối tới db rồi
  if (!trelloDatabaseInstace)
    throw new Error('Must connect to database first!')
  return trelloDatabaseInstace
}
