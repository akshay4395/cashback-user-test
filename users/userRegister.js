import vandium from "vandium";
import uuid from "uuid";
import uuidv4 from "uuid/v1";
import { User } from "../libs/dynamodb/userModel";
import { MtbUser } from "../libs/dynamodb/MTBUser";
import { SubTenants } from "../libs/dynamodb/SubTenants";
import { success, failure } from "../utils/response-lib";
import { dynamoConfigInstance } from "../config/dynamooseConfig";
import { MtbCheckUser, MtbRegistration } from "../utils/thirdPartyApi";
import { registerInCognito } from "../utils/cognito";
import {
  prodigixSoapRequest,
  prodigixAPI,
  options,
  XMLtoJSON
} from "../utils/prodigix";

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
      let userDetail;
      let mtbUser;
      let subtenants;
      const { body } = event;
      // let mtbUserName = await MtbCheckUser(
      //   "userName",
      //   body.username,
      //   "mytravelbiz"
      // );
      let sessionId = uuid();
      // let mtbUserEmail = await MtbCheckUser("email", body.email, "mytravelbiz");
      // if (mtbUserEmail.status && mtbUserName.status) {
      let userCognito = {
        email: body.email,
        password: body.password,
        username: uuid()
      };
      const cognitoResponse = await registerInCognito(userCognito);
      let prodigixBody = {
        username: body.username,
        email: body.email,
        password: body.password,
        sponsor: body.sponsor,
        country: body.country,
        rank: 0
      };
      let prodigix = await prodigixAPI(
        options(
          prodigixSoapRequest(prodigixBody),
          "AddDistributor",
          "distributorws"
        )
      );
      console.log(prodigix);
      let parsedData = await XMLtoJSON(prodigix.body);
      let success =
        parsedData["soap:Envelope"]["soap:Body"][0].AddDistributorResponse[0]
          .AddDistributorResult[0].Success[0];
      let distId;
      if (success) {
        distId =
          parsedData["soap:Envelope"]["soap:Body"][0].AddDistributorResponse[0]
            .AddDistributorResult[0].DistID[0];
      }
      console.log(distId, "iddd");
      const users_username = JSON.parse(
        JSON.stringify(cognitoResponse.user.username)
      );
      console.log(users_username, "username");
      userDetail = await User.create({
        dist_id: distId,
        username: body.username,
        email: body.email,
        domain: `${body.username}.6degrees.Cash`,
        country: body.country,
        provider: "6degrees",
        cognitoUsername: users_username,
        uuid: uuidv4()
      });
      mtbUser = await MtbUser.create({
        dist_id: distId,
        username: body.username,
        email: body.email,
        country: body.country,
        domain: `${body.username}.mytravelbiz.com`,
        provider: "mtb",
        cognitoUsername: users_username,
        uuid: uuidv4()
      });
      subtenants = await SubTenants.create({
        distId: distId,
        cognitoUsername: users_username,
        level: 0,
        package: 1,
        provider: "mytravelbiz",
        domain: `${body.username}.mytravelbiz.com`,
        RankId: 0,
        mainAccount: true,
        newUser: true,
        username: body.username,
        email: body.email,
        country: body.country
      });
      // }
      let responseBody = {
        mtb: mtbUser,
        degree: userDetail,
        subtenants
      };
      return callback(null, success(responseBody));
    } catch (e) {
      console.log(e);
      return callback(null, failure(e));
    }
  }
);
