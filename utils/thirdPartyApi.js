import axios from "axios";

export const MtbCheckUser = async (type, data, provider) => {
  let res = await axios.get(
    `https://www.mytravelbiz-api.com/0.1/mtb3/user/verify-data?type=${type}&data=${data}&provider=${provider}`
  );

  return res;
};

export const MtbRegistration = async body => {
  let res = await fetch(
    "https://www.mytravelbiz-api.com/0.1/mtb/user/registration",
    {
      method: "POST",
      body: JSON.stringify(body)
    }
  );
  return res;
};

export const TlcCheckUser = async () => {
  let res = await fetch("https://tlc.crytosecureapi.com/1/verify-email");

  return res;
};

export const TlcRegistration = async body => {
  let res = await fetch("https://tlc.crytosecureapi.com/1/user-registration", {
    method: "POST",
    body: JSON.stringify(body)
  });
  return res;
};
