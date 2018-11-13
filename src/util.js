import { util } from "aws-sdk/global";

/**
 * cognitoのattributeを取得する
 * @param {*} event
 */
export const getCognitoAttributes = event => {
  const headers = event.headers;
  const payload = headers.Authorization.split(".")[1];
  return JSON.parse(util.base64.decode(payload).toString("utf8"));
};
/**
 * cognitoのユーザ名を取得する
 * @param {*} event
 */
export const getCognitoUserName = event => {
  return getCognitoAttributes(event)["cognito:username"];
};
