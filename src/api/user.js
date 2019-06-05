import request from "@/utils/request";

export function master(data) {
  return request({
    url: "api/user/master",
    method: "post",
    data: data
  });
}
