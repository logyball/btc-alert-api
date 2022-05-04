const AWS = require('aws-sdk');

const SES_CONFIG = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
};

const AWS_SES = new AWS.SES(SES_CONFIG);

let sendValidationEmail = (recipientEmail, name, url) => {
    let params = {
      Source: 'admin@btcalerter.com',
      Destination: {
        ToAddresses: [
          recipientEmail
        ],
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `Click this link to verify your registration: ${url}`,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Hello, ${name}! Please verify your email for btcalerter.com.`,
        }
      },
    };
    return AWS_SES.sendEmail(params).promise();
};

module.exports = {
    sendValidationEmail,
};