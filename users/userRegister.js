import vandium from "vandium";
import uuid from "uuid";
import { User } from "../libs/dynamodb/userModel";
import { success, failure } from "../utils/response-lib";
import { dynamoConfigInstance } from "../config/dynamooseConfig";
import {
  MtbCheckUser,
  MtbRegistration,
  TlcCheckUser,
  TlcRegistration
} from "../utils/thirdPartyApi";

export const index = vandium.api().POST(
  {
    body: {
      username: vandium.types.string().required(),
      email: vandium.types.string().required()
    }
  },
  async (event, context, callback) => {
    await dynamoConfigInstance();

    try {
      const {
        body: { username, email }
      } = event;

      let type;
      let mtbUser = await MtbCheckUser("userName", username, "mytravelbiz");
      console.log(mtbUser, "mtbUser");

      console.log(mtbUser);
      User.create({
        user_id: uuid(),
        username: username,
        email: email
      });
      return callback(null, success(res));
    } catch (e) {
      console.log(e);
      return callback(null, failure(e));
    }
  }
);
