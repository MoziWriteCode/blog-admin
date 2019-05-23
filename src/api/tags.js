import request from "@/utils/request";

export function getTags() {
  return request({
    url: "api/tag/",
    method: "get"
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
export function delTags(id) {
  return request({
    url: "api/tag/del",
    method: "post",
    params: { id: id }
  });
}
