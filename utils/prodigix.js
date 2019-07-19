import request from "request";
import randomstring from "randomstring";
import { parseString } from "xml2js";
import moment from "moment-timezone";

export function options(soapXML, action, urlParam) {
  return {
    url: `${process.env.PRODIGIX_URL}${urlParam}.asmx`,
    method: "POST",
    body: soapXML,
    headers: {
      SOAPAction: `https://rep.mytravelbiz.com/${action}`,
      "Content-Type": "text/xml"
    }
  };
}

export function prodigixAPI(option) {
  return new Promise(function(resolve, reject) {
    request(option, function(error, response, body) {
      if (error) {
        reject(error);
      } else {
        resolve({
          body: body,
          response: response,
          header: response.headers
        });
      }
    });
  });
}

export const prodigixSoapRequest = data => {
  let date = moment(moment())
    .tz("America/New_York")
    .format();
  return `<?xml version='1.0' encoding='utf-8'?>
<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>
  <soap:Header>
    <AuthHeader Domain='rep.mytravelbiz.com' xmlns='https://rep.mytravelbiz.com/'>
      <AuthorizationKey>5ff8baee33e3990a5cc88a1ddb75e722</AuthorizationKey>
    </AuthHeader>
  </soap:Header>
  <soap:Body>
    <AddDistributor xmlns='https://rep.mytravelbiz.com/'>
      <Distributor>
        <EnterDate>${date}</EnterDate>
        <RankID>${data.rank}</RankID>
        <LName>${randomstring.generate({
          length: 5,
          charset: "alphabetic"
        })}</LName>
        <FName>${randomstring.generate({
          length: 5,
          charset: "alphabetic"
        })}</FName>
        <Email>${data.email}</Email>
        <CellPhone>${randomstring.generate({
          length: 10,
          charset: "alphabetic"
        })}</CellPhone>
        <UserName>${data.username}</UserName>
        <Password>${data.password}</Password>
      </Distributor>
      <DistBusinessCenter>
      <SponsorID>${data.sponsor}</SponsorID>
      </DistBusinessCenter>
    </AddDistributor>
  </soap:Body>
</soap:Envelope>`;
};

export function XMLtoJSON(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, function(err, result) {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}
