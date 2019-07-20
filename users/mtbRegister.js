import vandium from "vandium";
import uuid from "uuid";
import uuidv4 from "uuid/v1";

import { success, failure } from "../utils/response-lib";
import { dynamoConfigInstance } from "../config/dynamooseConfig";
import { MtbCheckUser, MtbRegistration } from "../utils/thirdPartyApi";
import { registerInCognito } from "../utils/cognito";
import { registerInTlcCognito } from "../utils/tlccognito";
import {
  prodigixSoapRequest,
  prodigixAPI,
  options,
  XMLtoJSON
} from "../utils/prodigix";
import { cashbackUserRegistration } from "../libs/dynamodb/dynamo-request";

export const index = async (event, context, callback) => {
  await dynamoConfigInstance();

  try {
    let userDetail;
    const { body } = event;
    userDetail = await cashbackUserRegistration(body, "sixDegrees");
    console.log(body);
    let responseBody = {
      degree: userDetail
    };
    return callback(null, success(responseBody));
  } catch (e) {
    console.log(e);
    return callback(null, failure(e));
  }
};
