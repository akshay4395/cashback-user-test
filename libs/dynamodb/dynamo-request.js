import * as dynamoDbLib from './dynamo-lib';
import { success, failure } from '../../utils/response-lib';
import uuid from 'uuid';

export const cashbackUserRegistration = (data, tableName) => {
  return new Promise(async resolve => {
    try {
      let dataForDb = {
        dist_id: data.dist_id,
        username: data.username,
        email: data.email,
        country: data.country,
        domain: data.domain,
        provider: data.provider,
        cognitoUsername: data.cognitoUsername,
        uuid: data.uuid,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      };
      let params = {
        TableName: `${tableName}-${process.env.STAGE}`,
        Item: dataForDb
      };
      console.log('params', params);
      await dynamoDbLib.call('put', params);
      console.log('Success');
      resolve(dataForDb);
    } catch (error) {
      console.log('ERROR', error);
    }
  });
};

export const mtbUserRegistration = (data, tableName) => {
  return new Promise(async resolve => {
    try {
      let dataForDb = {
        dist_id: data.dist_id,
        username: data.username,
        email: data.email,
        country: data.country,
        domain: data.domain,
        provider: data.provider,
        package: Number(data.package),
        cognitoUsername: data.cognitoUsername,
        uuid: data.userId,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      };
      let params = {
        TableName: `${tableName}-${process.env.STAGE}`,
        Item: dataForDb
      };
      console.log('params', params);
      await dynamoDbLib.call('put', params);
      console.log('Success');
      resolve(dataForDb);
    } catch (error) {
      console.log('ERROR', error);
    }
  });
};

export const tlcUserRegistartion = (data, tableName) => {
  return new Promise(async resolve => {
    try {
      let dataForDb = {
        dist_id: data.dist_id,
        username: data.username,
        email: data.email,
        country: data.country,

        provider: data.provider,
        cognitoUsername: data.cognitoUsername,
        uuid: data.userId,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      };
      let params = {
        TableName: `${tableName}-${process.env.STAGE}`,
        Item: dataForDb
      };
      console.log('params', params);
      await dynamoDbLib.call('put', params);
      console.log('Success');
      resolve(dataForDb);
    } catch (error) {
      console.log('ERROR', error);
    }
  });
};

export const subtenantUserRegistration = (data, tableName) => {
  return new Promise(async resolve => {
    try {
      let dataForDb = {
        distId: data.distId,
        cognitoUsername: data.cognitoUsername,
        level: data.level,
        provider: data.provider,
        domain: data.domain,
        RankId: data.RankId,
        mainAccount: data.mainAccount,
        newUser: data.newUser,
        username: data.username,
        country: data.country,
        email: data.email,
        uuid: data.userId,
        package: Number(data.package),
        step: 'complete',
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      };
      let params = {
        TableName: `${tableName}-${process.env.STAGE}`,
        Item: dataForDb
      };
      console.log('params', params);
      await dynamoDbLib.call('put', params);
      console.log('Success');
      resolve(dataForDb);
    } catch (error) {
      console.log('ERROR', error);
    }
  });
};

export function getUserByEmail(email) {
  let params = {
    TableName: `sixDegrees-${process.env.STAGE}`,
    IndexName: 'email-createdAt-index',
    KeyConditionExpression: '#email = :userEmail',
    ExpressionAttributeNames: {
      '#email': 'email'
    },
    ExpressionAttributeValues: {
      ':userEmail': email
    }
  };
  return dynamoDbLib.call('query', params);
}

export function getUserByUsername(username) {
  console.log(username);
  let params = {
    TableName: `sixDegrees-${process.env.STAGE}`,
    IndexName: 'username-createdAt-index',
    KeyConditionExpression: '#username = :username',
    ExpressionAttributeNames: {
      '#username': 'username'
    },
    ExpressionAttributeValues: {
      ':username': username
    }
  };
  return dynamoDbLib.call('query', params);
}
