import React from 'react';
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
} from '@twilio-paste/core';

import { InformationIcon } from '@twilio-paste/icons/esm/InformationIcon';

const FauxLocationDetails = () => {
  return (
    <Stack orientation="vertical" spacing="space20">
      <Separator orientation="horizontal" verticalSpacing="space80" />
      <MediaObject verticalAlign="center">
        <MediaFigure spacing="space40">
          <InformationIcon decorative={true} about="Job Dispatch" size="sizeIcon60" />
        </MediaFigure>
        <MediaBody>
          <Text as="h2" fontSize="fontSize60" lineHeight="lineHeight60">
            <Text as="span" color="inherit" fontSize="inherit" lineHeight="inherit">
              Location Details
            </Text>
          </Text>
          <Text as="h3" fontSize="fontSize20" lineHeight="lineHeight20" color="colorTextWeak">
            Job Dispatch System
          </Text>
        </MediaBody>
      </MediaObject>
      <Table>
        <TBody>
          <Tr verticalAlign="middle">
            <Th scope="row">Property Name</Th>
            <Td>Altira Macau</Td>
          </Tr>
          <Tr verticalAlign="middle">
            <Th scope="row">Building</Th>
            <Td>Main Building</Td>
          </Tr>
          <Tr verticalAlign="middle">
            <Th scope="row">Floor</Th>
            <Td>17</Td>
          </Tr>
          <Tr verticalAlign="middle">
            <Th scope="row">Room</Th>
            <Td>117</Td>
          </Tr>
        </TBody>
      </Table>
    </Stack>
  );
};

export default FauxLocationDetails;
