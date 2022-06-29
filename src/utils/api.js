import axios from "axios";
const xml2js = require("xml2js");

const SrApi = axios.create({
  baseURL: "http://api.sr.se/api/v2",
});

export function getSomething() {
  return SrApi.get("/channels").then(({ data }) => {
    xml2js.parseString(data, { mergeAttrs: true }, (err, result) => {
      if (err) {
        throw err;
      }
      const xmlDataString = JSON.stringify(result, null, 4);

      const xmlToJSON = JSON.parse(xmlDataString);

      console.log(xmlToJSON.sr.channels[0].channel[0].name[0]);
    });
  });
}
