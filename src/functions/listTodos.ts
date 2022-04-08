import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

export const handler: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;
  
  const response = await document.scan({
    TableName:'todos',
    FilterExpression: 'user_id = :user_id',
    ExpressionAttributeValues: {
      ':user_id': user_id
    }

  }).promise()

  if (!response.Items.length) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "The user does not exists"
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response.Items),
  };
};