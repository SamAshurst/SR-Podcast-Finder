import axios from "axios";
const xml2js = require("xml2js");

const SrApi = axios.create({
  baseURL: "http://api.sr.se/api/v2",
});

export function getChannels() {
  return SrApi.get("/channels")
    .then(({ data }) => {
      const parser = new xml2js.Parser({
        explicitArray: false,
        mergeAttrs: true,
      });
      return parser.parseStringPromise(data);
    })
    .then(
      ({
        sr: {
          channels: { channel },
        },
      }) => {
        return channel;
      }
    )
    .catch((err) => {
      console.log(err);
    });
}
