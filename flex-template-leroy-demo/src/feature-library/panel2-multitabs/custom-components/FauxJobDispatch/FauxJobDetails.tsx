import {
  Box,
  Text,
  Separator,
  Card,
  Stack,
  MediaObject,
  MediaFigure,
  MediaBody,
  Table,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  Button,
  Heading,
  SkeletonLoader,
} from '@twilio-paste/core';

import * as Flex from '@twilio/flex-ui';
import React, { useEffect, useState } from 'react';

import { NotesIcon } from '@twilio-paste/icons/esm/NotesIcon';

import FauxLocationDetails from './FauxLocationDetails';
import JobDispatchService from '../../utils/JobDispatchService';

interface Props {
  task?: Flex.ITask;
}

const FauxJobDetails = ({ task }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dispatchButtonLoading, setDispatchButtonLoading] = useState<boolean>(false);
  const [jobDetails, setJobDetails] = useState<any>();
  const [jobAttributes, setJobAttributes] = useState<any>();
  const [jobID, setJobID] = useState<String>();

  useEffect(() => {
    if (task) {
      setJobDetails(task);
      setJobID(generateJobID(task));
      setJobAttributes(formulateJobAttributes(task));
      setIsLoading(false);
    }
  }, [task?.taskSid]);

  const sendDispatchMessage = () => {
    setDispatchButtonLoading(true);
    const jobDetails = {
      jobId: jobID,
      jobCategory: task?.attributes.taskCategory,
      status: 'Pending',
      estimatedCompletion: '3 Minutes',
    };
    JobDispatchService.sendDispatchMessage(task?.attributes?.dispatchTaskConversationSid, jobDetails)
      .then((response) => {})
      .catch((err) => console.error('Error sending dispatch message', err))
      .finally(() => setDispatchButtonLoading(false));
  };
  const formulateJobAttributes = (task: Flex.ITask) => {
    if (task.attributes?.taskType === 'dispatch_job') {
      const attributes = task.attributes;
      const newAttributes = Object.keys(attributes)
        .filter((key) => key.startsWith(task.attributes.taskCategory))
        .reduce((obj: any, key: any) => {
          obj[key] = attributes[key];
          return obj;
        }, {});
      return newAttributes;
    }
    return [];
  };

  const generateJobID = (task: Flex.ITask) => {
    const taskId = task.taskSid;
    const last4Characters = taskId.substring(taskId.length - 5).toUpperCase();
    return `JD-${last4Characters}`;
  };

  const beautifyTitle = (remove: string, text: string) => {
    let newText = text;
    // Remove Job Category
    if (text.startsWith(remove)) {
      newText = newText.replace(`${remove}_`, '');
    }
    // Split
    const splitAry = newText.split('_');
    let formattedText = '';
    splitAry.map((item) => {
      let result = [...item].map((char, index) => (index === 0 ? char.toUpperCase() : char)).join('');
      formattedText += `${result} `;
    });
    formattedText = formattedText.trim();
    return formattedText;
  };

  return (
    <Card>
      <Stack orientation={'vertical'} spacing={'space40'}>
        <MediaObject verticalAlign="center">
          <MediaFigure spacing="space40">
            <NotesIcon decorative={true} about="Job Dispatch" size="sizeIcon60" />
          </MediaFigure>
          <MediaBody>
            <Text as="h2" fontSize="fontSize60" lineHeight="lineHeight60">
              <Text as="span" color="inherit" fontSize="inherit" lineHeight="inherit">
                Current Job
              </Text>
            </Text>
            <Text as="h3" fontSize="fontSize20" lineHeight="lineHeight20" color="colorTextWeak">
              Job Dispatch System
            </Text>
          </MediaBody>
        </MediaObject>
        {isLoading && (
          <>
            <Stack orientation="vertical" spacing="space20">
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </Stack>
          </>
        )}
        {!isLoading && (
          <>
            <Table>
              <TBody>
                <Tr verticalAlign="middle">
                  <Th scope="row">Job ID</Th>
                  <Td>{jobID}</Td>
                </Tr>
                <Tr verticalAlign="middle">
                  <Th scope="row">Job Category</Th>
                  <Td>{task?.attributes.taskCategory}</Td>
                </Tr>
                <Tr verticalAlign="middle">
                  <Th scope="row">Creation Date</Th>
                  <Td>{task?.dateCreated.toString()}</Td>
                </Tr>
                {Object.keys(jobAttributes).map((itemName: any, index) => {
                  return (
                    <Tr verticalAlign="middle" key={`tr-${index}`}>
                      <Th scope="row" key={`th-${index}`}>
                        {beautifyTitle(task?.attributes.taskCategory, itemName)}
                      </Th>
                      <Td key={`td-${index}`}>
                        {beautifyTitle(task?.attributes.taskCategory, jobAttributes[itemName])}
                      </Td>
                    </Tr>
                  );
                })}
              </TBody>
            </Table>
            <Button onClick={sendDispatchMessage} variant="primary" loading={dispatchButtonLoading}>
              Pending
            </Button>
            {(task?.attributes.taskCategory === 'room_service' ||
              task?.attributes.taskCategory === 'request_amenities') && <FauxLocationDetails />}
          </>
        )}
      </Stack>
    </Card>
  );
};

export default Flex.withTaskContext(React.memo(FauxJobDetails));
