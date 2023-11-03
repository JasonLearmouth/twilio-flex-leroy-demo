import React, { useState } from 'react';
import {
  Text,
  Separator,
  MediaObject,
  MediaFigure,
  MediaBody,
  Table,
  TBody,
  Td,
  Th,
  Tr,
  Stack,
  Button,
} from '@twilio-paste/core';

import { BusinessIcon } from '@twilio-paste/icons/esm/BusinessIcon';
import { ThumbsUpIcon } from '@twilio-paste/icons/esm/ThumbsUpIcon';
import { CalendarIcon } from '@twilio-paste/icons/esm/CalendarIcon';
import { AcceptIcon } from '@twilio-paste/icons/esm/AcceptIcon';

const FauxRestaurantReservationSystem = () => {
  const [checkAvailabilityPressed, setCheckAvailabilityPressed] = useState<boolean>(false);
  const [reservePressed, setReservePressed] = useState<boolean>(false);
  return (
    <Stack orientation="vertical" spacing="space20">
      <Separator orientation="horizontal" verticalSpacing="space80" />
      <MediaObject verticalAlign="center">
        <MediaFigure spacing="space40">
          <BusinessIcon decorative={true} about="Job Dispatch" size="sizeIcon60" />
        </MediaFigure>
        <MediaBody>
          <Text as="h2" fontSize="fontSize60" lineHeight="lineHeight60">
            <Text as="span" color="inherit" fontSize="inherit" lineHeight="inherit">
              Restaurant Reservation System
            </Text>
          </Text>
          <Text as="h3" fontSize="fontSize20" lineHeight="lineHeight20" color="colorTextWeak">
            Real-time integration
          </Text>
        </MediaBody>
      </MediaObject>
      <Table>
        <TBody>
          <Tr verticalAlign="middle">
            <Th scope="row">Check Availability</Th>
            <Td>
              <Button
                variant="secondary"
                pressed={checkAvailabilityPressed}
                onClick={() => setCheckAvailabilityPressed(!checkAvailabilityPressed)}
              >
                {checkAvailabilityPressed ? <ThumbsUpIcon decorative /> : <CalendarIcon decorative />}
                {checkAvailabilityPressed ? 'Available' : 'Check Availability'}
              </Button>
            </Td>
          </Tr>
          <Tr verticalAlign="middle">
            <Th scope="row">Reservation</Th>
            <Td>
              <Button variant="secondary" pressed={reservePressed} onClick={() => setReservePressed(!reservePressed)}>
                {reservePressed ? <ThumbsUpIcon decorative /> : <AcceptIcon decorative />}
                {reservePressed ? 'Reserved' : 'Make Reservation'}
              </Button>
            </Td>
          </Tr>
        </TBody>
      </Table>
    </Stack>
  );
};

export default FauxRestaurantReservationSystem;
