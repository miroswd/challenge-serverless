import type { AWS } from '@serverless/typescript';


const serverlessConfiguration: AWS = {
  service: 'challenge-serverless',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild', 
    'serverless-dynamodb-local',
    'serverless-offline'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    lambdaHashingVersion: '20201221',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['dynamodb:*'],
        Resource: ['*']
      }
    ]
  },
  // import the function via paths
  functions: {
    createTodo: {
      handler: 'src/functions/createTodo.handler',
      events: [
        {
          http: {
            path: 'todos/{user_id}',
            method: 'post',
            cors: true
          }
        }
      ]
    },
    listTodos: {
      handler: 'src/functions/listTodos.handler',
      events: [
        {
          http: {
            path: 'todos/{user_id}',
            method: 'get',
            cors: true
          }
        }
      ]
    }
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb: {
      stages: ['dev', 'local'],
      start: {
        migrate: true,
        inMemory: true,
        port: 8000
      },
    }
  },
  resources: {
    Resources: {
      dbTodos: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'todos',
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
          },
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S'
            }, 
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH'
            }
          ]
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
