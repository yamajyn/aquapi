import AWS from "aws-sdk";
import uuidv4 from "uuid/v4";
import moment from "moment-timezone";

AWS.config.update({ region: "ap-northeast-1" });

moment.tz.setDefault("Asia/Tokyo");

const db = new AWS.DynamoDB.DocumentClient();
const tableName = "aquapi-conditions";

/**
 * 水槽状態一覧取得API
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 */
export const tankConditionList = (event, context, callback) => {
  const defaultLimit = 50;
  // TODO ユーザ識別
  const tankId = event.pathParameters.id;
  const params = {
    TableName: tableName,
    ProjectionExpression: "conditions, createdAt",
    KeyConditionExpression: "#key1= :tankId ",
    ExpressionAttributeNames: {
      "#key1": "tankId"
    },
    ExpressionAttributeValues: {
      ":tankId": tankId
    },
    ScanIndexForward: false, // 降順
    Limit: defaultLimit
  };
  if (event.queryStringParameters) {
    if (event.queryStringParameters.limit)
      params.Limit = event.queryStringParameters.limit;
  }

  db.query(params)
    .promise()
    .then(data => {
      console.log("Get TankCondition Response ", data);
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(data.Items.reverse())
      });
    })
    .catch(err => {
      console.log("Get TankCondition Error ", err);
      callback(null, {
        statusCode: 400,
        body: JSON.stringify({ message: "Failed.", error: err })
      });
    });
};

/**
 * 水槽状態登録API
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 */
export const tankConditionRegist = (event, context, callback) => {
  const body = JSON.parse(event.body);
  const tankId = event.pathParameters.id;

  // TODO tankIdとユーザのバリデーション

  const params = {
    TableName: tableName,
    Item: {
      tankId: tankId,
      conditions: body,
      createdAt: moment().format()
    }
  };
  db.put(params)
    .promise()
    .then(_ => {
      console.log("TankCondition Regiest ", params.Item);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: "Succeeded."
        })
      });
    })
    .catch(err => {
      console.log("TankCondition Regiest Error", err);
      callback(null, {
        statusCode: 400,
        body: JSON.stringify({ message: "Failed.", error: err })
      });
    });
};
