import moment from "moment";
import "moment/locale/sv";

export default function publishedDate(dateutc) {
  return moment(dateutc).format("LLL");
}
