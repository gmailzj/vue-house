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


// e.getList = getList;
e.getItem = getItem;


export default e;
