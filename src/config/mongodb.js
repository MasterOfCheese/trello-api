import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

//khởi tạo 1 đối tượng trelloDatabaseInstance ban đầu là Null vì chưa connect
let trelloDatabaseInstance = null

//khởi tạo 1 đối tượng Client Instance để connect tới MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi : {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

// CONNECT to DataBase
export const CONNECT_DB = async ( ) => {
  // gọi kết nối tới MongoDB Atlas với URI đã khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect()
  // Kết nối thành công thì lấy ra database theo tên và gán ngược nó vào biến trelloDatabaseInstance ở trên
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

//Close connect to MongoDB when needed:
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

/* Function GET_DB (không có async) có nhiệm vụ export ra Trello Database Instance sau khi đã connect thành công
  tới MongoDB để sử dụng ở nhiều nơi khác nhau trong code.
*/
// Lưu ý: phải đảm bảo chỉ luôn gọi cái GET_DB này sau khi đã kết nối thành công tới MongoDB

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to DataBase first!')
  return trelloDatabaseInstance
}

