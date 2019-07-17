import vandium from "vandium";
import uuid from "uuid";
import uuidv4 from "uuid/v1";
import { User } from "../libs/dynamodb/userModel";
import { success, failure } from "../utils/response-lib";
import { dynamoConfigInstance } from "../config/dynamooseConfig";
import { MtbCheckUser, MtbRegistration } from "../utils/thirdPartyApi";

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
      const { body } = event;
      // let sessionId = uuidv4();
      let mtbUserName = await MtbCheckUser(
        "userName",
        body.username,
        "mytravelbiz"
      );
      let mtbUserEmail = await MtbCheckUser(
        "email",
        body.email,
        "mytravelbiz",
        body.sessionId
      );
      if (mtbUserName.status && mtbUserEmail.status) {
        let userBody = {
          username: body.username,
          email: body.email,
          sessionId: body.sessionId,
          step: "registration",
          address: body.address,
          city: body.city,
          country: body.country,
          countryState: body.countryState,
          postalCode: body.postalCode,
          domain: body.domain,
          package: body.package,
          personalInformation: {
            firstName: "",
            lastName: ""
          }
        };
        let mtbUserRegister = await MtbRegistration(userBody);
        // console.log(mtbUserRegister, "register");
      }
      User.create({
        user_id: uuid(),
        username: body.username,
        email: body.email
      });
      return callback(null, success("hello"));
    } catch (e) {
      console.log(e);
      return callback(null, failure(e));
    }
  }
);
