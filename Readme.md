## デプロイ

`sls deploy -v`

## ローカル DB 起動

`sls dynamodb start`

## ローカル実行

`sls offline`

## GET テスト

`curl "https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/dev/users/:id"`

## GET ローカルテスト

`curl "http://localhost:3000/users/:id"`


## POST テスト

`curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"name":"Taro", "password": "test" }' https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/dev/users`

## POST ローカル

`url -H "Accept: application/ntent-type: application/json" -X POST -d '{"name":"Taro", "password": "test" }' http://localhost:3000/users`
