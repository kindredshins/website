import React, { useState } from 'react';
import wretch from 'wretch';
import styled from 'styled-components';
import { Page, PageSidebar, PageBody } from '@/components/Page';
import { Button } from '@/components/Button';

const FORM_NAME = 'contact';

const Contact = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [name, setName] = useState('');

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

  function getFirstName() {
    const [firstName] = name.split(' ');
    return firstName.charAt(0).toUpperCase() + firstName.slice(1);
  }

  return (
    <Page>
      <PageSidebar title="Contact" />
      <PageBody>
        {isSuccess ? (
          <p>
            Thank you for reaching out to us {getFirstName()}. We will get back
            to you as soon as possible.
          </p>
        ) : isError ? (
          <p>
            Sorry {getFirstName()}, there was a problem sending the form to us.
            Please try again later.
          </p>
        ) : (
          <form
            name={FORM_NAME}
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleFormSubmit}
          >
            <input type="hidden" name="form-name" value={FORM_NAME} />
            <Row>
              <Label>Full name</Label>
              <Input
                type="text"
                name="name"
                onChange={event => setName(event.target.value)}
                required
              />
            </Row>
            <Row>
              <Label>Email</Label>
              <Input type="email" name="email" required />
            </Row>
            <Row>
              <Label>Subject</Label>
              <Select name="subject">
                <option value="enquiry">General enquiry</option>
                <option value="booking">Bookings</option>
              </Select>
            </Row>
            <Row hidden>
              <Label>Don&apos;t fill this out if you&apos;re human</Label>
              <input type="text" name="bot-field" />
            </Row>
            <Row>
              <Label>Message</Label>
              <Textarea name="message" required />
            </Row>
            <Row hasLabel={false}>
              <Button type="submit" style={{ flex: '0 0 auto' }}>
                Send
              </Button>
            </Row>
          </form>
        )}
      </PageBody>
    </Page>
  );
};

const Row = styled.p`
  display: ${props => (props.hidden ? 'none' : 'flex')};
  flex-direction: column;

  @media (min-width: 635px) {
    flex-direction: row;
    padding-left: ${props => !props.hasLabel && '200px'};
  }
`;

Row.defaultProps = {
  hasLabel: true,
};

const Label = styled.label`
  vertical-align: top;
  margin-top: 5px;
  display: inline-block;
  width: 200px;
  flex: 0 0 auto;
`;

const Input = styled.input`
  border: 1px solid #363636;
  color: inherit;
  padding: 5px 8px;
  background: linear-gradient(to bottom, #000, #1e1e1e);
  flex: 1 1 auto;

  &:focus {
    outline: none;
    border-color: #555;
  }

  &::-webkit-input-placeholder {
    color: #555;
  }

  &::-moz-placeholder {
    color: #555;
  }

  &:-ms-input-placeholder {
    color: #555;
  }
`;

const Select = styled(Input).attrs({ as: 'select' })``;

const Textarea = styled(Input).attrs({ as: 'textarea' })`
  height: 300px;
`;

export default Contact;
