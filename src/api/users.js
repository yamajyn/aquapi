import AWS from "aws-sdk";
import uuidv4 from "uuid/v4";
import moment from "moment-timezone";

AWS.config.update({ region: "ap-northeast-1" });

moment.tz.setDefault("Asia/Tokyo");

const db = new AWS.DynamoDB.DocumentClient();
const tableName = 'aquapi-users'

/**
 * ユーザ一覧取得API
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 */
export const userList = (event, context, callback) => {
  const defaultLimit = 20
  const params = {
    TableName: tableName,
    ProjectionExpression: "id, userName, createdAt",
    Limit: defaultLimit,
  }
  if(event.queryStringParameters){
    if(event.queryStringParameters.limit) params.Limit = event.queryStringParameters.limit
    if(event.queryStringParameters.startId) params.ExclusiveStartKey = { id: event.queryStringParameters.startId}
  }

  db.scan(params)
    .promise()
    .then(data => {
      console.log("Get UserList Response ", data);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(data)
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
 * ユーザ取得API
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 */
export const user = (event, context, callback) => {
  const params = {
    TableName: tableName,
    Key: {
      id: event.pathParameters.id
    }
  };

  db.get(params)
    .promise()
    .then(data => {
      console.log("Get User Response ", data);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: "Succeeded.",
          data: data
        })
      });
    })
    .catch(err => {
      console.log("Get User Error ", err);
      callback(null, {
        statusCode: 400,
        body: JSON.stringify({ message: "Failed.", error: err })
      });
    });
};

/**
 * ユーザ登録API
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 */
export const userRegist = (event, context, callback) => {
  const params = {
    TableName: tableName,
    Item: {
      id: uuidv4(),
      userName: event.userName,
      email: event.request.userAttributes.email,
      createdAt: moment().format()
    },
    Expected: {
      id: { Exists: false }
    }
  };
  db.put(params)
    .promise()
    .then(_ => {
      console.log("User Regiest ", params.Item);
      callback(null, event);
    })
    .catch(err => {
      console.log("User Regiest Error", err);
      callback(null, {
        statusCode: 400,
        body: JSON.stringify({ message: "Failed.", error: err })
      });
    });
};
