// Utils
import axios from "axios";



// Constants
import { API_URL, API_KEY } from "../app/constants";

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      timeout: 60 * 1000, // 1 min
    });
  }

  apiCall({
    url = "",
    method = "GET",
    token = false,
    cancelToken = false,
    ...otherParams
  }) {
    let options = {
      url,
      method
    };

    if (otherParams) options = { ...options, ...otherParams };
    options.url = options.url + `apikey=${API_KEY}`
    return this.client(options)
      .then(this.handleCommonSuccess)
      .catch(this.handleCommonError);
  }



  handleCommonSuccess(response) {
    return response.data;
  }

  handleCommonError(error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled", error.message);
    }

    if (error.response?.status === 401) {
      alert('401')
      // history.push("/");
    }
    if (error.response?.status === 403) {
      alert('403')
      // history.push("/");
    }
    if (error.response?.status === 500) {
      alert('500 - server side')
      // history.push("/");
    }

    return error;
  }
}

export default new ApiService();
