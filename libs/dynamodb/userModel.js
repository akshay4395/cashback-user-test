import dynamoose from "dynamoose";
const { Schema } = dynamoose;

const userSchema = new Schema(
  {
    // dist_id: String,
    cognitoUsername: String,
    country: String,
    email: String,
    last_name: String,
    level: Number,
    package: String,
    provider: String,
    vip: Boolean,
    username: String,
    firstname: String,
    uuid: String,
    phone_number: String,
    phoneCode: String,
    parentId: String,
    rankId: String
  },
  {
    timestamps: true
  }
);

export const User = dynamoose.model(
  `sixDegrees-${process.env.STAGE}`,
  userSchema
);
