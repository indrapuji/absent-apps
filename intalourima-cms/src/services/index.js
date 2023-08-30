import axios from "axios";
import HostUrl from "../utilities/HostUrl";

export default class API {
  getReferal() {
    return axios.get(HostUrl + "/referal/all", { headers: { token: localStorage.getItem("token") } });
  }

  getEvent() {
    return axios.get(HostUrl + "/event/all", { headers: { token: localStorage.getItem("token") } });
  }
  getPengawas() {
    return axios.get(`${HostUrl}/user?role=pengawas&user_status=true`, {
      headers: { token: localStorage.getItem("token") },
    });
  }

  getKoordinator() {
    return axios.get(`${HostUrl}/user?role=koordinator&user_status=true`, {
      headers: { token: localStorage.getItem("token") },
    });
  }
  getLeader() {
    return axios.get(`${HostUrl}/user?role=leader&user_status=true`, {
      headers: { token: localStorage.getItem("token") },
    });
  }
}
