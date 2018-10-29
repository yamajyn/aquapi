import AWS from "aws-sdk";
import uuidv4 from "uuid/v4";

AWS.config.update({ region: "ap-northeast-1" });

const db = new AWS.DynamoDB();

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
    TableName: `aquapi-${event.requestContext.stage}-users`,
    Key: {
      id: { S: event.pathParameters.id }
    }
  };

  try {
    db.getItem(params, (error, data) => {
      if (error) {
        callback(null, {
          statusCode: 400,
          body: JSON.stringify({ message: "Failed.", error: error })
        });
      }
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: "Succeeded.",
          data: data
        })
      });
    });
  } catch (error) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({ message: "Failed.", error: error })
    });
  }
};

export const userRegist = (event, context, callback) => {
  const body = JSON.parse(event.body);
  const uuid = uuidv4();
  console.log("regist user uuid is", uuid);
  const params = {
    TableName: `aquapi-${event.requestContext.stage}-users`,
    Item: {
      id: { S: uuid },
      name: { S: body.name },
      password: { S: body.password }
    },
    Expected: {
      id: { Exists: false }
    }
  };

  try {
    db.putItem(params, (error, data) => {
      if (error) {
        callback(null, {
          statusCode: 400,
          body: JSON.stringify({ message: "Failed.", error: error })
        });
      }
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ message: "Succeeded!", params: params })
      });
    });
  } catch (error) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({ message: "Failed.", error: error })
    });
  }
};
