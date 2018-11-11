import { user, userList, userRegist } from "./src/api/users";
import { auth } from "./src/api/auth"

/**
 * 認証API
 */
export const handleAuth = (event, context, callback) => {
  auth(event, context, callback);
};

/**
 * ユーザ一覧取得API
 */
export const handleUserList = (event, context, callback) => {
  userList(event, context, callback);
};

/**
 * ユーザ取得API
 */
export const handleUser = (event, context, callback) => {
  user(event, context, callback);
};

/**
 * ユーザ登録API
 */
export const handleUserRegist = (event, context, callback) => {
  userRegist(event, context, callback);
};
