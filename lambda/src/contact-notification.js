import sendmail from 'sendmail';
import querystring from 'query-string';

const emailAddresses = {
  booking: 'booking@kindredshins.com',
  enquiry: 'contact@kindredshins.com',
};

const send = sendmail({
  logger: {
    debug: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error,
  },
});

export const handler = (event, context, callback) => {
  const body = querystring.parse(event.body);

  if (!body.name || !body.email || !body.subject || !body.message) {
    return callback(null, {
      statusCode: 403,
      body: JSON.stringify({ error: 'Missing required fields' }),
    });
  }

  if (!emailAddresses[body.subject]) {
    return callback(null, {
      statusCode: 403,
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
