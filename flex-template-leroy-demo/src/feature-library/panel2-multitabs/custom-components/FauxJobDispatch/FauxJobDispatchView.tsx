import React from 'react';
import { Box, Card, Column, Grid, Heading, Paragraph, Stack } from '@twilio-paste/core';

import FauxJobDetails from './FauxJobDetails';
import FauxCustomerInfo from '../FauxCustomerProfile/FauxCustomerInfo';

const FauxJobDispatchView = () => {
  return (
    <Box as="main" padding="space70">
      <Grid gutter="space30">
        <Column span={8}>
          <Stack orientation={'vertical'} spacing="space50">
            <FauxJobDetails />

            <Card padding="space70">
              <Heading as="h4" variant="heading40">
                TIP: Solve for the customer
              </Heading>
              <Paragraph>
                Rather than looking for shortcuts or handing the case off to another rep, be invested in the situation
                as the customer. Look for long-term solutions that foster customer success, not quick fixes that will
                require more attention later.
              </Paragraph>
            </Card>
          </Stack>
        </Column>

        <Column span={4}>
          <Stack orientation={'vertical'} spacing="space50">
            <FauxCustomerInfo />
          </Stack>
        </Column>
      </Grid>
    </Box>
  );
};

export default FauxJobDispatchView;
