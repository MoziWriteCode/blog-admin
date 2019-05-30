import requestFile from "@/utils/requestFile";

export function addImage(data) {
  return requestFile({
    url: "api/uploadImage/add",
    method: "post",
    data: data
  });
}
export function delImage(id) {
  return requestFile({
    url: "api/uploadImage/del",
    method: "post",
    params: { id: id }
  });
}
