import { user, userList, userRegist } from "./src/api/users";
import { tank, tankList, tankRegist } from "./src/api/tanks";
import { tankConditionList, tankConditionRegist } from "./src/api/conditions";

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

/**
 * 水槽一覧取得API
 */
export const handleTankList = (event, context, callback) => {
  tankList(event, context, callback);
};

/**
 * 水槽取得API
 */
export const handleTank = (event, context, callback) => {
  tank(event, context, callback);
};

/**
 * 水槽登録API
 */
export const handleTankRegist = (event, context, callback) => {
  tankRegist(event, context, callback);
};

/**
 * 水槽状態一覧取得API
 */
export const handleTankConditionList = (event, context, callback) => {
  tankConditionList(event, context, callback);
};

/**
 * 水槽登録API
 */
export const handleTankConditionRegist = (event, context, callback) => {
  tankConditionRegist(event, context, callback);
};
