import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { NetlifyForm } from '@/components/NetlifyForm';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

export const MailingList = () => {
  return (
    <MailingListContainer>
      <MailingListNetlifyForm name="Mailing List">
        {({ isSuccess, isError }) => (
          <>
            <Title>Can We Spam You?</Title>
            <Tags>#nakedshins</Tags>
            {isSuccess ? (
              <p>👍</p>
            ) : isError ? (
              <p>Something broke. Please try again 🙏</p>
            ) : (
              <FieldGroup>
                <FieldGroupInput
                  type="email"
                  name="email"
                  required
                  placeholder="biggestfan@thisisstan.com"
                  size="25"
                />
                <FieldGroupButton>Yes</FieldGroupButton>
              </FieldGroup>
            )}
          </>
        )}
      </MailingListNetlifyForm>
    </MailingListContainer>
  );
};

const MailingListContainer = styled.div`
  text-transform: uppercase;
  margin: auto auto 0;
  text-align: center;
`;

const MailingListNetlifyForm = styled(NetlifyForm)`
  margin: 0;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.25em;
`;

const Tags = styled.p`
  font-size: ${rem(14)};
  color: #b3b3b3;
  margin: ${rem(10)} 0 ${rem(20)};
`;

const FieldGroup = styled.div`
  display: flex;
  justify-content: center;
`;

const FieldGroupInput = styled(Input)`
  flex: 1 1 auto;
`;

const FieldGroupButton = styled(Button)`
  border-left-color: transparent;
  flex: 0 0 auto;
  margin-left: -1px;

  &:focus {
    border-left-color: #363636;
  }

  ${FieldGroupInput}:focus + & {
    border-color: #555;
    border-left-color: transparent;
  }
`;
