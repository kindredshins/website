import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { format, compareDesc } from 'date-fns';
import { resetList } from '@/styles/mixins';
import { theme } from '@/styles/theme';
import { Page, PageSidebar, PageBody } from '@/components/Page';
import { Button } from '@/components/Button';
import gigs from '@/data/gigs';

const sortByDateDesc = (a, b) => compareDesc(a.date, b.date);
const upcomingGigs = [...gigs.upcoming].sort(sortByDateDesc);
const hasUpcomingGigs = Boolean(upcomingGigs.length);

const Gigs = () => (
  <Page>
    <PageSidebar title="Gigs" />
    <PageBody>
      {hasUpcomingGigs ? (
        <>
          <GigsItems>
            {upcomingGigs.map(gig => {
              const date = new Date(gig.date);

              return (
                <GigsItem key={gig.date}>
                  {gig.image && (
                    <a href={gig.info}>
                      <GigsImage src={gig.image} alt="" />
                    </a>
                  )}
                  <GigsDate href={gig.info}>
                    <GigsDay>{format(date, 'Do')}</GigsDay>
                    <GigsMonth>{format(date, 'MMM')}</GigsMonth>
                    <GigsYear>{format(date, 'YYYY')}</GigsYear>
                  </GigsDate>
                  <GigsBody>
                    <GigsTitle>{gig.title}</GigsTitle>
                    <GigsLocation>{gig.location}</GigsLocation>
                    <p>
                      Tickets are{' '}
                      <GigsPrice>
                        {gig.price === 0 ? 'Free' : `£${gig.price.toFixed(2)}`}
                      </GigsPrice>
                    </p>
                    {gig.info && (
                      <Button href={gig.info} as="a">
                        More info
                      </Button>
                    )}{' '}
                    {gig.tickets && (
                      <Button href={gig.tickets} as="a">
                        Get tickets
                      </Button>
                    )}
                  </GigsBody>
                </GigsItem>
              );
            })}
          </GigsItems>
        </>
      ) : (
        <p>
          Gigs to be announced, but don&apos;t be holding that breath
          now&hellip;
        </p>
      )}
    </PageBody>
  </Page>
);

const GigsItems = styled.ol`
  ${resetList};
  margin-bottom: 30px;
`;

const GigsItem = styled.li`
  display: flex;
  padding: 0 0 20px;
  flex-wrap: wrap;

  & + & {
    padding-top: 20px;
    border-top: 1px solid ${theme.divider};
  }
`;

const GigsImage = styled.img`
  width: 100%;
  /* override typography reset with high specificity
   * TODO: hate this, look into it later.
   */
  margin-bottom: 20px !important;
`;

const GigsDate = styled.time`
  order: 0;
  background-color: #101216;
  outline: 1px solid #25272a;
  text-align: center;
  flex: 0 0 auto;
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-right: 20px;
  line-height: 1;
`;

const GigsDay = styled.span`
  font-size: ${rem(26)};
`;

const GigsMonth = styled.span`
  font-size: ${rem(26)};
  text-transform: uppercase;
`;

const GigsYear = styled.span`
  font-size: ${rem(18)};
  opacity: 0.5;
`;

const GigsBody = styled.div`
  order: 1;
  flex: 1 1 auto;
`;

const GigsTitle = styled.h3`
  margin: 0;
`;

const GigsLocation = styled.p`
  opacity: 0.5;
  /* margin-bottom: 0; */
`;

const GigsPrice = styled.strong`
  color: ${theme.primary};
  text-transform: uppercase;
`;

export default Gigs;
