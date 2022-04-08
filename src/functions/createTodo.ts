import { APIGatewayProxyHandler } from "aws-lambda"
import crypto from 'crypto';
import { document } from '../utils/dynamodbClient';

interface ITodo {
  title: string;
  done?: boolean;
  deadline: string;
}


export const handler: APIGatewayProxyHandler = async (event) => {

  const { user_id } = event.pathParameters;
  const { title, done, deadline } = JSON.parse(event.body) as ITodo
   
  const id = crypto.randomBytes(16).toString('hex')

  await document.put({
    TableName: 'todos',
    Item: {
      user_id,
      id, 
      title, 
      done: done || false,
      deadline: new Date(deadline).toUTCString()
    }
  }).promise();

  const response = await document.query({
    TableName: 'todos',
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": id
    }
  }).promise()


  const todo = response.Items[0]

  return {
    statusCode:200,
    body: JSON.stringify(todo)
  }
}