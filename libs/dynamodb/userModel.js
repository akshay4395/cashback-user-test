import dynamoose from "dynamoose";

const UserModel = dynamoose.model("Cat", {
  user_id: String,
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  refer_through: String,
  user_type: String,
  latitude: String,
  longitude: String,
  refer_link: String,
  vip_member: Boolean,
  total_earnings: Number,
  refer_id: String,
  timestamps: true
});

module.exports = UserModel;
