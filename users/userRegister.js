import vandium from "vandium";
import UserModel from "../libs/dynamodb/userModel";
import { success, failure } from "../utils/response-lib";
import { dynamoConfigInstance } from "../config/dynamooseConfig";

export const index = vandium.api().post(
  {
    body: {
      username: vandium.types.string().required(),
      email: vandium.types.string().required()
    }
  },
  async (event, context, callback) => {
    const UserDetails = new UserModel({
      username: event.body.username,
      email: event.body.email
    });

    try {
      dynamoConfigInstance();
      let res = await UserDetails.save();
      return callback(null, success(res));
    } catch (e) {
      return callback(null, failure({ status: e.status, message: e.message }));
    }
  }
);
