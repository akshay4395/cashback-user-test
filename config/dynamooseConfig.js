import dynamoose from "dynamoose";
import AWS from "aws-sdk";

export const dynamoConfigInstance = () => {
  dynamoose.AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.REGION
  });

  const dynamoDB = new AWS.dynamoDB();
  dynamoose.setDDB(dynamoDB);
};
