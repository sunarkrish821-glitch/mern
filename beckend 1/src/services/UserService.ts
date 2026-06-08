import UserModel from "../model/UserModel"

class UserService {
  static async getSingleRowByFile(filter: Record<string, string>) {
    try {
      const userDetail = await UserModel.findOne(filter, {password: 0, __v: 0})
      return userDetail
    } catch(exception) {
      throw exception
    }
  }
}

export default UserService;