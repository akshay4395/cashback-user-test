import dynamoose from "dynamoose";
const { Schema } = dynamoose;

const SubTenantsSchema = new Schema(
  {
    distId: String,
    cognitoUsername: String,
    address: String,
    billing: Object,
    city: String,
    country: String,
    countryState: String,
    email: String,
    level: Number,
    package: String,
    provider: String,
    domain: String,
    personalInformation: Object,
    newsletter: Boolean,
    mobilePhone: String,
    mobileCode: String,
    RankId: String,
    mainAccount: Boolean,
    newUser: Boolean
  },
  {
    timestamps: true
  }
);

export const SubTenants = dynamoose.model(
  `SubTenants-${process.env.STAGE}`,
  SubTenantsSchema,
  { update: true }
);
