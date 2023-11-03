const { prepareFlexFunction, extractStandardResponse } = require(Runtime.getFunctions()[
  'common/helpers/function-helper'
].path);

const requiredParameters = [
  {
    key: 'conversationSid',
    purpose: 'Conversation SID',
  },
  {
    key: 'jobDetails',
    purpose: 'Details of dispatch job',
  },
];

exports.handler = prepareFlexFunction(requiredParameters, async (context, event, callback, response, handleError) => {
  const { conversationSid, jobDetails } = event;
  const parsedJobDetails = JSON.parse(jobDetails);
  const messageAuthor = 'Job Dispatch System';

  if (!conversationSid || !jobDetails) {
    throw new Error('Missing conversationSid or jobDetails parameters.');
  }

  try {
    const client = context.getTwilioClient();
    const adaptiveCard = {
      $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
      type: 'AdaptiveCard',
      version: '1.6',
      body: [
        {
          type: 'ColumnSet',
          columns: [
            {
              type: 'Column',
              width: 2,
              items: [
                {
                  type: 'Image',
                  url: 'https://media.licdn.com/dms/image/C510BAQErY9t7As0Caw/company-logo_200_200/0/1519940197221?e=2147483647&v=beta&t=pgC0oReeN2PfhqyUyNjGk6R9CV3x7-PmXilzKd__DMQ',
                  altText: 'Melco',
                  size: 'small',
                },
                {
                  type: 'TextBlock',
                  text: 'Your Request',
                  weight: 'bolder',
                  size: 'extraLarge',
                  spacing: 'none',
                  wrap: true,
                  style: 'heading',
                },
                {
                  type: 'TextBlock',
                  text: parsedJobDetails.status,
                  weight: 'bold',
                  size: 'large',
                  color: 'good',
                  wrap: true,
                  spacing: 'none',
                },
                {
                  type: 'TextBlock',
                  text: `Job ID: ${parsedJobDetails.jobId}`,
                  isSubtle: true,
                  spacing: 'none',
                  wrap: true,
                },
                {
                  type: 'TextBlock',
                  text: `Job Category: ${parsedJobDetails.jobCategory}`,
                  isSubtle: true,
                  spacing: 'none',
                  wrap: true,
                },
                {
                  type: 'TextBlock',
                  text: `${parsedJobDetails.estimatedCompletion}`,
                  size: 'small',
                  wrap: true,
                  maxLines: 3,
                },
              ],
            },
          ],
        },
      ],
    };
    const result = await client.conversations.v1.conversations(conversationSid).messages.create({
      author: messageAuthor,
      body: 'Here is the latest update on your request:',
      attributes: JSON.stringify({
        'adaptive-card': adaptiveCard,
      }),
    });
    response.setBody(result);
    return callback(null, response);
  } catch (error) {
    console.log('Error', error);
    return handleError(error);
  }
});
