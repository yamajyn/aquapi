import AWS from "aws-sdk";
import uuidv4 from "uuid/v4";
import moment from "moment-timezone";

AWS.config.update({ region: "ap-northeast-1" });

moment.tz.setDefault("Asia/Tokyo");

const db = new AWS.DynamoDB.DocumentClient();

// export const userList = (event, context, callback) => {
//   const params = {
//     TableName: `${event.requestContext.stage}-users`
//   };

//   try {
//     db.getItem(params, (error, data) => {
//       if (error) {
//         callback(null, {
//           statusCode: 400,
//           body: JSON.stringify({ message: "Failed.", error: error })
//         });
//       }
//       callback(null, {
//         statusCode: 200,
//         body: JSON.stringify({ message: `Hello, ${data.Item.name.S}.` })
//       });
//     });
//   } catch (error) {
//     callback(null, {
//       statusCode: 400,
//       body: JSON.stringify({ message: "Failed.", error: error })
//     });
//   }
// };

export const user = (event, context, callback) => {
  const params = {
    TableName: `aquapi-users`,
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
      console.log("Get User Response ", err);
      callback(null, {
        statusCode: 400,
        body: JSON.stringify({ message: "Failed.", error: err })
      });
    });
};

export const userRegist = (event, context, callback) => {
  const params = {
    TableName: `aquapi-users`,
    Item: {
      id: uuidv4(),
      name: event.userName,
      email: event.request.userAttributes.email,
      createdAt: moment().format()
    },
    Expected: {
      id: { Exists: false }
    }
  };
  console.log("User Regiest ", params.Item);
  db.put(params)
    .promise()
    .then(_ => {
      callback(null, event);
    })
    .catch(err => {
      callback(null, {
        statusCode: 400,
        body: JSON.stringify({ message: "Failed.", error: err })
      });
    });
};
