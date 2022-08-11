import axios from "axios";
const xml2js = require("xml2js");

const SrApi = axios.create({
  baseURL: "http://api.sr.se/api/v2",
});

const parser = new xml2js.Parser({
  explicitArray: false,
  mergeAttrs: true,
});

export function getChannels() {
  return SrApi.get("/channels/?page=1&size=34")
    .then(({ data }) => {
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

export function getCategory() {
  return SrApi.get("programcategories?pagination=false")
    .then(({ data }) => {
      return parser.parseStringPromise(data);
    })
    .then(
      ({
        sr: {
          programcategories: { programcategory },
        },
      }) => {
        return programcategory;
      }
    );
}

export function getProgramsForChannelCategory(channelId, categoryId) {
  return SrApi.get(
    `programs/index?channelid=${channelId}&programcategoryid=${categoryId}&filter=program.haspod&filtervalue=true`
  )
    .then(({ data }) => {
      return parser.parseStringPromise(data);
    })
    .then(
      ({
        sr: {
          programs: { program },
        },
      }) => {
        if (program && !Array.isArray(program)) {
          return [program];
        }
        return program;
      }
    );
}

export function getEpisodes(programId) {
  return SrApi.get(`episodes/index?programid=${programId}&size=5`)
    .then(({ data }) => {
      return parser.parseStringPromise(data);
    })
    .then(
      ({
        sr: {
          episodes: { episode },
        },
      }) => {
        console.log(episode);
        return episode;
      }
    );
}
