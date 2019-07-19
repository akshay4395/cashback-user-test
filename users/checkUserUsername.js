import vandium from 'vandium';
import { getUserByUsername } from '../libs/dynamodb/dynamo-request';
import { success, failure } from '../utils/response-lib';

export const checkUsername = vandium.api().POST(
  {
    body: {
      username: vandium.types.string().required()
    }
  },
  async (event, context, callback) => {
    const { body } = event;
    let userUsernameExist = await getUserByUsername(body.username);
    console.log(userUsernameExist);
    if (userUsernameExist.Count !== 1) {
      return callback(
        null,
        success({ result: false, message: 'User dose not exist' })
      );
    }
    return callback(null, failure({ result: true, message: 'User exist' }));
  }
);
