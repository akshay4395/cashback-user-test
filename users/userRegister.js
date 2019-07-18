import vandium from "vandium";
import uuid from "uuid";
import uuidv4 from "uuid/v1";
import { User } from "../libs/dynamodb/userModel";
import { success, failure } from "../utils/response-lib";
import { dynamoConfigInstance } from "../config/dynamooseConfig";
import { MtbCheckUser, MtbRegistration } from "../utils/thirdPartyApi";
import { registerInCognito } from "../utils/cognito";
export const index = vandium.api().POST(
  {
    body: {
      username: vandium.types.string().required(),
      email: vandium.types.string().required()
    }
  },
  async (event, context, callback) => {
    // let poolData = {
    //   userPoolId: process.env.USER_POOL_ID,
    //   userPoolWebClientId: process.env.APP_CLIENT_ID,
    //   region: process.env.REGION,
    //   identityPoolId: process.env.IDENTITY_POOL_ID,
    //   mandatorySignIn: false
    // };
    await dynamoConfigInstance();

    try {
      const { body } = event;
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
      if (mtbUserEmail.status && mtbUserName.status) {
        let userCognito = {
          email: body.email,
          password: body.password,
          firstName: body.firstName
        };
        const cognitoResponse = await registerInCognito(userCognito);
        const userData = JSON.stringify(cognitoResponse.user);
        let userDetail = await User.create({
          username: body.username,
          email: body.email,
          country: body.country,
          provider: "6degrees",
          cognitoUsername: userData.username,
          uuid: uuidv4()
        });
        console.log(userDetail, "userData");
      }

      return callback(null, success("hello"));
    } catch (e) {
      console.log(e);
      return callback(null, failure(e));
    }
  }
);
