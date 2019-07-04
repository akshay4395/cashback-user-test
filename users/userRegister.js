import vandium from 'vandium';
import { User } from '../libs/dynamodb/userModel';
import { success, failure } from '../utils/response-lib';
import { dynamoConfigInstance } from '../config/dynamooseConfig';

export const index = vandium.api().post(
  {
    body: {
      username: vandium.types.string().required(),
      email: vandium.types.string().required()
    }
  },
  async (event, context, callback) => {
    await dynamoConfigInstance();
    try {
      User.create({
        username: event.body.username,
        email: event.body.email
      });
      return callback(null, success(res));
    } catch (e) {
      return callback(null, failure(e));
    }
  }
);
