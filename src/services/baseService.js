import Axios from "axios";
import { API_KEY, DOMAIN } from "../util/settings";

export class baseService {
  get = (url) => {

    return Axios({
      url: `${DOMAIN}/${url}?api_key=${API_KEY}`,
      method: "get",
    });
  };
}
