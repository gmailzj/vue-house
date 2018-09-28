import axios from "@/common/axios";

const e = {};

function getList(data) {
  return axios({
    url: "admins",
    method: "GET",
    params: data
  });
}

function getItem(data, uid) {
  return axios({
    url: "item/" + uid,
    method: "GET",
    params: data
  });
}

function getUserinfo(data) {
  return axios({
    url: "userinfo/",
    method: "GET",
    params: data
  });
}
function login(data) {
  return axios({
    url: "login/",
    method: "GET",
    params: data
  });
}

// e.getList = getList;
e.getItem = getItem;
e.getUserinfo = getUserinfo;
e.login = login;


export default e;
