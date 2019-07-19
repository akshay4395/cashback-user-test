import * as AWS from 'aws-sdk';

AWS.config.update({ region: process.env.REGION });
export const call = (action, params) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  return dynamoDb[action](params).promise();
};

export const call1 = (action, params) => {
  console.log('AWS', AWS);
  const dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: config.region,
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey
  });
  console.log('dynamoDb', dynamoDb);
  return dynamoDb[action](params).promise();
};
