import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next-server/head';
import { Page } from '@/components/Page';

const statusCodes = {
  400: 'Bad Request',
  404: 'This page could not be found',
  500: 'Internal Server Error',
  501: 'Not Implemented',
};

export default class Error extends React.Component {
  static displayName = 'ErrorPage';

  static getInitialProps({ res, err }) {
    const statusCode =
      res && res.statusCode ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;
    const title = statusCodes[statusCode] || 'An unexpected error has occurred';

    return (
      <Page title={statusCode}>
        <Head>
          <title>
            {statusCode}: {title}
          </title>
        </Head>
        <h2>{title}</h2>
      </Page>
    );
  }
}

Error.propTypes = {
  statusCode: PropTypes.number.isRequired,
};
