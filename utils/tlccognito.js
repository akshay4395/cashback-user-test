import _ from "lodash";
import uuidv1 from "uuid/v1";
import { CognitoIdentityServiceProvider } from "aws-sdk";
import {
  CognitoUserAttribute,
  CognitoUserPool
} from "amazon-cognito-identity-js";
// import { config } from "../config";

export function registerInTlcCognito(obj, domain, userType) {
  return new Promise(function(resolve, reject) {
    const userPool = new CognitoUserPool({
      UserPoolId: process.env.TLC_USER_POOL_ID,
      ClientId: process.env.TLC_CLIENT_ID
    });
    let attributeList = [];
    let email = { Name: "email", Value: obj.email },
      // referrerLink = { Name: "website", Value: domain },
      firstName = { Name: "name", Value: obj.firstName },
      // type = { Name: "custom:type", Value: userType },
      uuid = uuidv1();
    let attributeEmail = new CognitoUserAttribute(email);
    // let attributeReferrerLink = new CognitoUserAttribute(referrerLink);
    let attributeFirstName = new CognitoUserAttribute(firstName);
    // let attributeUserType = new CognitoUserAttribute(type);
    attributeList.push(
      attributeEmail,
      attributeFirstName
      // attributeReferrerLink,
      // attributeFirstName,
      // attributeUserType
    );
    // if (obj.package && obj.domain && obj.distId) {
    //   // // let packageType = { Name: "custom:package", Value: obj.package };
    //   // let domainCog = {
    //   //   Name: "custom:domain",
    //   //   Value: JSON.stringify(obj.domain)
    //   // };
    //   // let dist_id = { Name: "custom:dist_id", Value: obj.distId[0] };
    //   // let attributePackage = new CognitoUserAttribute(packageType);
    //   // let attributeDomain = new CognitoUserAttribute(domainCog);
    //   // let attributeDistId = new CognitoUserAttribute(dist_id);
    //   // attributeList.push(attributePackage, attributeDomain, attributeDistId);
    // }
    userPool.signUp(uuid, obj.password, attributeList, null, function(
      error,
      result
    ) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

// export const updateCognitoAttributes = (attributes, username) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const validAttributes = _.omitBy(attributes, _.isNil);
//       if (!Object.keys(validAttributes).length) {
//         console.log("**** NOTHING TO UPDATE IN COGNITO ****");
//         resolve(false);
//       }
//       validAttributes.email_verified = "true";
//       let UserAttributes = [];
//       _.forEach(validAttributes, (value, key) => {
//         UserAttributes.push({ Name: key, Value: value });
//       });
//       let params = {
//         UserAttributes,
//         Username: username,
//         UserPoolId: config.UserPoolId
//       };
//       let cognitoidentityserviceprovider = new CognitoIdentityServiceProvider({
//         region: config.region,
//         accessKeyId: config.accessKeyId,
//         secretAccessKey: config.secretAccessKey
//       });
//       console.log(
//         "cognitoidentityserviceprovider",
//         cognitoidentityserviceprovider
//       );
//       cognitoidentityserviceprovider.adminUpdateUserAttributes(params, err => {
//         if (err) {
//           console.log(err, err.stack); // an error occurred
//           resolve(false);
//         } else {
//           console.log("data");
//           resolve(true);
//         }
//       });
//     } catch (err) {
//       console.log(err);
//       reject(err);
//     }
//   });
// };

// export const userSignout = username => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let params = {
//         UserPoolId: config.UserPoolId,
//         Username: username
//       };
//       let cognitoidentityserviceprovider = new CognitoIdentityServiceProvider();
//       cognitoidentityserviceprovider.adminUserGlobalSignOut(params, function(
//         err,
//         data
//       ) {
//         if (err) {
//           console.log("================ERROR====================");
//           console.log(err, err.stack);
//           console.log("====================================");
//           resolve(false);
//         } else {
//           console.log("================data====================");
//           console.log(data);
//           console.log("====================================");
//           resolve(true);
//         }
//       });
//     } catch (err) {
//       console.log(err);
//       reject(err);
//     }
//   });
// };

// export const userDisable = username => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let params = {
//         UserPoolId: config.UserPoolId,
//         Username: username
//       };
//       let cognitoidentityserviceprovider = new CognitoIdentityServiceProvider();
//       cognitoidentityserviceprovider.adminDisableUser(params, function(
//         err,
//         data
//       ) {
//         if (err) {
//           console.log("================ERROR====================");
//           console.log(err, err.stack);
//           console.log("====================================");
//           resolve(false);
//         } else {
//           console.log("================data====================");
//           console.log(data);
//           console.log("====================================");
//           resolve(true);
//         }
//       });
//     } catch (err) {
//       console.log(err);
//       reject(err);
//     }
//   });
// };

// export const userEnable = username => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let params = {
//         UserPoolId: config.UserPoolId,
//         Username: username
//       };
//       let cognitoidentityserviceprovider = new CognitoIdentityServiceProvider();
//       cognitoidentityserviceprovider.adminEnableUser(params, function(
//         err,
//         data
//       ) {
//         if (err) {
//           console.log("================ERROR====================");
//           console.log(err, err.stack);
//           console.log("====================================");
//           resolve(false);
//         } else {
//           // console.log('================data====================');
//           // console.log(data);
//           // console.log('====================================');
//           resolve(true);
//         }
//       });
//     } catch (err) {
//       console.log(err);
//       reject(err);
//     }
//   });
// };

// export const getUserByAttribute = (attrName, attrValue) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let cognitoidentityserviceprovider = new CognitoIdentityServiceProvider();

//       let filter = `${attrName} = '${attrValue}'`;
//       let params = {
//         UserPoolId: config.UserPoolId,
//         Filter: filter
//       };

//       cognitoidentityserviceprovider.listUsers(params, function(err, data) {
//         if (err) {
//           console.log(err);
//         } else if (data.Users.length === 1) {
//           // as far as we search by sub, should be only one user.
//           let user = data.Users[0];
//           console.log("================user====================");
//           console.log(JSON.stringify(user));
//           console.log("====================================");
//           let attributes = data.Users[0].Attributes;
//           resolve(user);
//         } else {
//           console.log("Something wrong.");
//         }
//       });
//     } catch (err) {
//       console.log(err);
//       reject(err);
//     }
//   });
// };

// export const getListOfCognitoUsers = getUsersList => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let userPoolData = [];
//       let paginationToken = "";
//       const eachCount = getUsersList.length / 60;
//       console.log("=================eachCount===================");
//       console.log(eachCount);
//       console.log("====================================");
//       for (let i = 1; i < eachCount; i++) {
//         let response = await getItemByPagination(paginationToken);
//         userPoolData = userPoolData.concat(response.Users);
//         paginationToken = response.PaginationToken;
//       }
//       console.log(userPoolData.length);
//       resolve(userPoolData);
//     } catch (err) {
//       console.log(err);
//       reject(err);
//     }
//   });
// };

// const getItemByPagination = paginatioToken => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let cognitoidentityserviceprovider = new CognitoIdentityServiceProvider();
//       let params = {
//         UserPoolId: config.UserPoolId,
//         Limit: 60
//       };
//       if (paginatioToken !== "") params.PaginationToken = paginatioToken;
//       cognitoidentityserviceprovider.listUsers(params, function(err, data) {
//         if (err) console.log(err, err.stack);
//         // an error occurred
//         else {
//           resolve(data);
//         }
//       });
//     } catch (err) {
//       console.log(err);
//       reject(err);
//     }
//   });
// };
