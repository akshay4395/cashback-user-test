import axios from 'axios';
import randomstring from 'randomstring';

export const MtbCheckUser = async (type, data, provider) => {
  let res = await axios.get(
    `https://devnew.mytravelbiz-api.com/mtb3/user/verify-data?type=${type}&data=${data}&provider=${provider}`
  );

  return res;
};

export const MtbRegistration = async body => {
  console.log(body);
  let res = await axios.post('http://localhost:3001/user/registration', body);
  return res;
};

export const TlcCheckUser = async () => {
  let res = await fetch('https://tlc.crytosecureapi.com/1/verify-email');

  return res;
};

export const TlcRegistration = async body => {
  let res = await fetch('https://tlc.crytosecureapi.com/1/user-registration', {
    method: 'POST',
    body: JSON.stringify(body)
  });
  return res;
};
