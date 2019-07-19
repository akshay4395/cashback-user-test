import vandium from 'vandium';
import uuid from 'uuid';
import uuidv4 from 'uuid/v1';

import { success, failure } from '../utils/response-lib';
import { dynamoConfigInstance } from '../config/dynamooseConfig';
import { MtbCheckUser, MtbRegistration } from '../utils/thirdPartyApi';
import { registerInCognito } from '../utils/cognito';
import { registerInTlcCognito } from '../utils/tlccognito';
import {
  prodigixSoapRequest,
  prodigixAPI,
  options,
  XMLtoJSON
} from '../utils/prodigix';
import {
  mtbUserRegistration,
  subtenantUserRegistration,
  tlcUserRegistartion,
  getUserByEmail,
  cashbackUserRegistration
} from '../libs/dynamodb/dynamo-request';

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
      let sessionId = uuid();

      let userCognito = {
        email: body.email,
        password: body.password,
        username: uuid()
      };
      await checkUser(body.email);
      // const cognitoResponse = await registerInCognito(userCognito);
      // const tlccognitoResponse = await registerInTlcCognito(userCognito);
      // console.log(tlccognitoResponse);
      // let prodigixBody = {
      //   username: body.username,
      //   email: body.email,
      //   password: body.password,
      //   sponsor: body.sponsor,
      //   country: body.country,
      //   rank: 0
      // };
      // let prodigix = await prodigixAPI(
      //   options(
      //     prodigixSoapRequest(prodigixBody),
      //     'AddDistributor',
      //     'distributorws'
      //   )
      // );
      // console.log(prodigix);
      // let parsedData = await XMLtoJSON(prodigix.body);
      // let prodixsuccess =
      //   parsedData['soap:Envelope']['soap:Body'][0].AddDistributorResponse[0]
      //     .AddDistributorResult[0].Success[0];
      // let distId;
      // if (prodixsuccess) {
      //   distId =
      //     parsedData['soap:Envelope']['soap:Body'][0].AddDistributorResponse[0]
      //       .AddDistributorResult[0].DistID[0];
      // }
      // console.log(distId, 'iddd');
      // const users_username = JSON.parse(
      //   JSON.stringify(cognitoResponse.user.username)
      // );
      // console.log(users_username, 'username');
      // let cashbackbody = {
      //   dist_id: distId,
      //   username: body.username,
      //   email: body.email,
      //   domain: `${body.username}.6degrees.Cash`,
      //   country: body.country,
      //   provider: '6degrees',
      //   cognitoUsername: users_username,
      //   uuid: uuidv4()
      // };
      // userDetail = await cashbackUserRegistration(cashbackbody, 'sixDegrees');
      // let mtbBody = {
      //   dist_id: distId,
      //   username: body.username,
      //   email: body.email,
      //   country: body.country,
      //   package: 1,
      //   domain: `${body.username}.mytravelbiz.com`,
      //   provider: 'mtb',
      //   cognitoUsername: users_username,
      //   userId: uuidv4()
      // };
      // let subBody = {
      //   userId: uuidv4(),
      //   distId: distId,
      //   cognitoUsername: users_username,
      //   level: 0,
      //   package: 1,
      //   provider: 'mytravelbiz',
      //   domain: `${body.username}.mytravelbiz.com`,
      //   RankId: 0,
      //   mainAccount: true,
      //   newUser: true,
      //   username: body.username,
      //   email: body.email,
      //   country: body.country
      // };
      // mtbUser = await mtbUserRegistration(mtbBody, 'MtbUsers');
      // subtenants = await subtenantUserRegistration(subBody, 'SubTenants');

      // let tlcBody = {
      //   dist_id: distId,
      //   username: body.username,
      //   email: body.email,
      //   country: body.country,
      //   provider: 'tlc',
      //   cognitoUsername: users_username,
      //   userId: uuidv4()
      // };
      // let tlcUser = await tlcUserRegistartion(tlcBody, 'TlcUsers');
      // let responseBody = {
      //   mtb: mtbUser,
      //   degree: userDetail,
      //   subtenants,
      //   tlcUser
      // };
      // return callback(null, success(responseBody));
    } catch (e) {
      console.log(e);
      return callback(null, failure(e));
    }
  }
);
