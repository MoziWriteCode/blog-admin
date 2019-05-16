import request from "@/utils/request";

export function getArticles(data) {
  return request({
    url: "api/article/list",
    method: "get",
    params: data
  });
}
export function getArticle(id) {
  return request({
    url: "api/article/",
    method: "get",
    params: id
  });
}
export function addArticle(data) {
  return request({
    url: "api/article/add",
    method: "post",
    data: data
  });
}
export function editArticle(data) {
  return request({
    url: "api/article/edit",
    method: "post",
    data: data
  });
}
export function delArticle(id) {
  return request({
    url: "api/article/edit",
    method: "post",
    params: id
  });
}
