import React from 'react';
import styled from 'styled-components';
import { Page } from '@/components/Page';
import { Button } from '@/components/Button';

const Contact = () => (
  <Page title="Contact">
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
    >
      <Row>
        <Label>Full name</Label>
        <Input type="text" name="name" required />
      </Row>
      <Row>
        <Label>Email</Label>
        <Input type="email" name="email" required />
      </Row>
      <Row>
        <Label>Subject</Label>
        <Select name="subject[]">
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
  </Page>
);

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
