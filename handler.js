'use strict';
import AWS from 'aws-sdk'

AWS.config.update({region: 'ap-northeast-1'})

const db = new AWS.DynamoDB()

export const hello = (event, context, callback) => {
  const params = {
    TableName: 'users',
    Key: {
      id: {N: event.pathParameters.id}
    }
  }

  try {
    db.getItem(params, (error, data) => {
      if (error) {
        callback(null, {statusCode: 400, body: JSON.stringify({message: 'Failed.', error: error})})
      }
      callback(null, {statusCode: 200, body: JSON.stringify({message: `Hello, ${data.Item.name.S}.`})});
    })
  } catch (error) {
    callback(null, {statusCode: 400, body: JSON.stringify({message: 'Failed.', error: error})})
  }
}

export const regist = (event, context, callback) => {
  const body = JSON.parse(event.body)
  const params = {
    TableName: 'users',
    Item: {
      id: {N: String(body.id)},
      name: {S: body.name}
    },
    Expected: {
      id: {Exists: false}
    }
  }


  try {
    db.putItem(params, (error, data) => {
      if (error) {
        callback(null, {statusCode: 400, body: JSON.stringify({message: 'Failed.', error: error})})
      }
      callback(null, {statusCode: 200, body: JSON.stringify({message: 'Succeeded!', params: params})});
    })
  } catch (error) {
    callback(null, {statusCode: 400, body: JSON.stringify({message: 'Failed.', error: error})})
  }
}
