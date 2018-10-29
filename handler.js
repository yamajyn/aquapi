import { user, userList, userRegist } from "./src/api/users";

/**
 * ユーザ一覧取得API
 */
// export const handleUserList = (event, context, callback) => {
//   userList(event, context, callback);
// };

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
