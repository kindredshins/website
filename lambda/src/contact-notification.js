import sendmail from 'sendmail';
import querystring from 'query-string';
import dotenv from 'dotenv';

dotenv.config();

const { CONTACT_BOOKING, CONTACT_ENQUIRY } = process.env;
const emailAddresses = { booking: CONTACT_BOOKING, enquiry: CONTACT_ENQUIRY };
const send = sendmail();

export const handler = (event, context, callback) => {
  if (!CONTACT_BOOKING || !CONTACT_ENQUIRY) {
    return callback(null, {
      statusCode: 501,
      body: JSON.stringify({
        error: 'Missing CONTACT_* environment variables',
      }),
    });
  }

  const body = querystring.parse(event.body);

  if (!body.name || !body.email || !body.subject || !body.message) {
    return callback(null, {
      statusCode: 422,
      body: JSON.stringify({ error: 'Missing required fields' }),
    });
  }

  if (!emailAddresses[body.subject]) {
    return callback(null, {
      statusCode: 422,
      body: JSON.stringify({ error: 'Invalid subject' }),
    });
  }

  const descriptor = {
    from: `"${body.email}" <no-reply@kindredshins.com>`,
    to: emailAddresses[body.subject],
    subject: `${body.name} sent you a message from kindredshins.com`,
    text: body.message,
  };

  send(descriptor, error => {
    if (error) {
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: '',
      });
    }
  });
};
