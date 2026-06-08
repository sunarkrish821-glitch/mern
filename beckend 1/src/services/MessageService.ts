import MessageModel from "../model/MessageModel"

class MessageService {
  // CRUD
  static async store(data: { sender: string; receiver: string; message: string }) {
    try {
      // ~ INSERT INTO messages SET sender=?, receiver=?, message=? ....
      const message = await MessageModel.create(data);
      return message;
    } catch (exception) {
      throw exception;
    }
  }

  // list all fetch
  static async getAllByFilter(
    filter: Record<string, any>,
    paginationConfig = { page: 1, limit: 10 },
  ) {
    try {
      const skip = (paginationConfig.page - 1) * paginationConfig.limit;
      const { rows, count } = await MessageModel.findAndCountAll({
        where: filter,
        // order: [["createdAt", "desc"]],
        offset: skip,
        limit: paginationConfig.limit,
      });

      return {
        rows,
        pagination: {
          total: count,
          limit: paginationConfig.limit,
          page: paginationConfig.page,
        },
      };
    } catch (exception) {
      throw exception;
    }
  }

  // detail
  static async getSingleRowByFilter(filter: Record<string, any>) {
    try {
      const data = await MessageModel.findOne({
        where: filter,
      });
      return data;
    } catch (exception) {
      throw exception;
    }
  }

  // Upadate
  static async updateSingleRowByFilter(
    filter: Record<string, any>,
    data: { sender: string; receiver: string; message: string },
  ) {
    try {
      const updateResult = await MessageModel.update(data, {
        where: filter
      });
      return updateResult
    } catch (exception) {
      throw exception;
    }
  }

  // Delete 
  static async deleteSingleRowByFilter(filter: Record<string, any>) {
    try {
      const deletedResult = await MessageModel.destroy({
        where: filter
      })
      return deletedResult
    } catch(exception) {
      throw exception
    }
  }
}

export default MessageService;