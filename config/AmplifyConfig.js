import Amplify from "aws-amplify";

export const AmplifyConfig = config => {
  return new Promise((res, rej) => {
    try {
      Amplify.configure({ Auth: { ...config } });
      res(true);
    } catch (e) {
      rej(e);
    }
  });
};
