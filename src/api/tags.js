import request from "@/utils/request";

export function getTags(data) {
  return request({
    url: "api/tag/",
    method: "get",
    data: data
  });
}
export function addTags(data) {
  return request({
    url: "api/tag/add",
    method: "post",
    data: data
  });
}
export function editTags(data) {
  return request({
    url: "api/tag/edit",
    method: "post",
    data: data
  });
}
export function delTags(data) {
  return request({
    url: "api/tag/del",
    method: "post",
    data: data
  });
}
