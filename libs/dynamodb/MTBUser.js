import dynamoose from "dynamoose";
const { Schema } = dynamoose;

const MtbuserSchema = new Schema(
  {
    dist_id: String,
    cognitoUsername: String,
    country: String,
    email: String,
    last_name: String,
    level: Number,
    package: String,
    provider: String,
    status: String,
    step: String,
    userType: Boolean,
    username: String,
    first_name: String,
    uuid: String,
    phoneNumber: String,
    phoneCode: String,
    parentId: String,
    RankId: String
  },
  {
    timestamps: true
  }
);

export const MtbUser = dynamoose.model(
  `MtbUsers-${process.env.STAGE}`,
  MtbuserSchema,
  { update: true }
);
