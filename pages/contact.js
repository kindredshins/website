import React, { useState } from 'react';
import styled from 'styled-components';
import { Page, PageSidebar, PageBody } from '@/components/Page';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { NetlifyForm } from '@/components/NetlifyForm';

function getFirstName(name) {
  const [firstName] = name.split(' ');
  return firstName.charAt(0).toUpperCase() + firstName.slice(1);
}

const Contact = () => {
  const [name, setName] = useState('');
  const firstName = getFirstName(name);

  return (
    <Page>
      <PageSidebar title="Contact" />
      <PageBody>
        <NetlifyForm name="Contact">
          {({ isSuccess, isError }) =>
            isSuccess ? (
              <p>
                Thank you for reaching out to us {firstName}. We will get back
                to you as soon as possible.
              </p>
            ) : isError ? (
              <p>
                Sorry {firstName}, there was a problem sending the form to us.
                Please try again later.
              </p>
            ) : (
              <>
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
              </>
            )
          }
        </NetlifyForm>
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

const Select = styled(Input).attrs({ as: 'select' })``;

const Textarea = styled(Input).attrs({ as: 'textarea' })`
  height: 300px;
`;

export default Contact;
