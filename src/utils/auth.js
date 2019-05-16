import Cookies from "js-cookie";

const TokenKey = "Admin-Token";

export function getToken() {
  let tokenName = "";
  if (arguments.length > 0) {
    tokenName = arguments[0];
  } else {
    tokenName = TokenKey;
  }
  return Cookies.get(tokenName);
}

export function setToken() {
  let tokenName;
  let token = "";
  if (arguments.length > 1) {
    tokenName = arguments[0];
    token = arguments[1];
  } else {
    tokenName = TokenKey;
    token = arguments[0];
  }
  return Cookies.set(tokenName, token, { expires: 1 / 24 });
}

export function removeToken() {
  let tokenName = "";
  if (arguments.length > 0) {
    tokenName = arguments[0];
  } else {
    tokenName = TokenKey;
  }
  return Cookies.remove(tokenName);
}
