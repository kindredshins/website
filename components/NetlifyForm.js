import React, { useState } from 'react';
import PropTypes from 'prop-types';
import wretch from 'wretch';

export const NetlifyForm = ({ children, name, ...props }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleFormSubmit(event) {
    event.preventDefault();

    const data = [...event.target.elements]
      .filter(element => Boolean(element.name))
      .reduce((json, element) => {
        json[element.name] = element.value;
        return json;
      }, {});

    wretch(event.target.action)
      .formUrl(data)
      .post()
      .res(() => setIsSuccess(true))
      .catch(() => setIsError(true));
  }

  return isSuccess || isError ? (
    children({ isSuccess, isError })
  ) : (
    <form
      name={name}
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleFormSubmit}
      {...props}
    >
      <input type="hidden" name="form-name" value={name} />
      {children({})}
    </form>
  );
};

NetlifyForm.propTypes = {
  children: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
