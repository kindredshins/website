import sendmail from 'sendmail';
import querystring from 'query-string';

const emailAddresses = {
  booking: 'booking@kindredshins.com',
  enquiry: 'contact@kindredshins.com',
};

export const handler = (event, context, callback) => {
  const body = querystring.parse(event.body, { arrayFormat: 'bracket' });

  if (!body.name || !body.email || !body.subject || !body.message) {
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
