import vandium from 'vandium';
import { getUserByEmail } from '../libs/dynamodb/dynamo-request';
import { success, failure } from '../utils/response-lib';
export const checkUserEmail = vandium.api().POST(
  {
    body: {
      email: vandium.types.string().required()
    }
  },
  async (event, context, callback) => {
    const { body } = event;
    let userEmailExist = await getUserByEmail(body.email);
    if (userEmailExist.Count !== 1) {
      return callback(
        null,
        success({ result: false, message: 'Email dose not exist' })
      );
    }
    return callback(null, success({ result: true, message: 'Email  exist' }));
  }
);
