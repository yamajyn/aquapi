import AWS from "aws-sdk";
import uuidv4 from "uuid/v4";
import moment from "moment-timezone";
import { getCognitoUserName } from "../util";

AWS.config.update({ region: "ap-northeast-1" });

moment.tz.setDefault("Asia/Tokyo");

const db = new AWS.DynamoDB.DocumentClient();
const cognito = new AWS.CognitoIdentityServiceProvider();
const tableName = "aquapi-tanks";

/**
 * 水槽一覧取得API
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 */
export const tankList = (event, context, callback) => {
  const defaultLimit = 20;
  const params = {
    TableName: tableName,
    ProjectionExpression: "id, tankName, createdAt",
    Limit: defaultLimit
  };
  if (event.queryStringParameters) {
    if (event.queryStringParameters.limit)
      params.Limit = event.queryStringParameters.limit;
    if (event.queryStringParameters.startId)
      params.ExclusiveStartKey = { id: event.queryStringParameters.startId };
  }

  db.scan(params)
    .promise()
    .then(data => {
      console.log("Get UserList Response ", data);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(data.Items)
      });
    })
    .catch(err => {
      console.log("Get UserList Error ", err);
      callback(null, {
        statusCode: 400,
        body: JSON.stringify({ message: "Failed.", error: err })
      });
    });
};

/**
 * 水槽取得API
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 */
export const tank = (event, context, callback) => {
  const params = {
    TableName: tableName,
    Key: {
      id: event.pathParameters.id
    }
  };

  db.get(params)
    .promise()
    .then(data => {
      console.log("Get Tank Response ", data);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: "Succeeded.",
          data: data
        })
      });
    })
    .catch(err => {
      console.log("Get Tank Error ", err);
      callback(null, {
        statusCode: 400,
        body: JSON.stringify({ message: "Failed.", error: err })
      });
    });
};

/**
 * 水槽登録API
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 */
export const tankRegist = (event, context, callback) => {
  const userName = getCognitoUserName(event);
  const body = JSON.parse(event.body);

  const params = {
    TableName: tableName,
    Item: {
      id: uuidv4(),
      tankName: body.tankName,
      userName: userName,
      createdAt: moment().format()
    },
    Expected: {
      id: { Exists: false }
    }
  };
  db.put(params)
    .promise()
    .then(_ => {
      console.log("Tank Regiest ", params.Item);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: "Succeeded."
        })
      });
    })
    .catch(err => {
      console.log("Tank Regiest Error", err);
      callback(null, {
        statusCode: 400,
        body: JSON.stringify({ message: "Failed.", error: err })
      });
    });
};
