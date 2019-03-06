import sendmail from 'sendmail';
import querystring from 'querystring';

const emailAddresses = {
  booking: 'booking@kindredshins.com',
  enquiry: 'contact@kindredshins.com',
};

export const handler = (event, context, callback) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const body = querystring.parse(event.body);

  if (!body.name || !body.email || !body['subject[]'] || !body.message) {
    return callback(null, {
      statusCode: 403,
      body: JSON.stringify({
        error: 'Missing required fields',
      }),
    });
  }

  const descriptor = {
    from: `"${body.name}" <${body.email}>`,
    sender: 'contact@kindredshins.com',
    to: emailAddresses[body.subject],
    subject: `Message from kindredshins.com`,
    text: body.message,
  };

  sendmail(descriptor, error => {
    if (error) {
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          error: error.message,
        }),
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: '',
      });
    }
  });
};
