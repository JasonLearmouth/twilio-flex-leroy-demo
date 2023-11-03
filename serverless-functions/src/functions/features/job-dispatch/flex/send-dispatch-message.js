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
  const messageAuthor = 'Job Dispatch System';

  if (!conversationSid || !jobDetails) {
    throw new Error('Missing conversationSid or jobDetails parameters.');
  }

  try {
    const client = context.getTwilioClient();
    const adaptiveCard = {
      type: 'AdaptiveCard',
      $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
      version: '1.5',
      body: [
        {
          type: 'TextBlock',
          text: 'Your Dispatch Job',
          wrap: true,
          style: 'heading',
        },
        {
          type: 'Table',
          columns: [
            {
              width: 1,
            },
            {
              width: 1,
            },
            {
              width: 1,
            },
          ],
          rows: [
            {
              type: 'TableRow',
              cells: [
                {
                  type: 'TableCell',
                  items: [
                    {
                      type: 'Image',
                      size: 'Large',
                      url: 'https://upload.wikimedia.org/wikipedia/en/7/70/Melco_logo.png',
                      altText: 'Melco',
                    },
                  ],
                },
                {
                  type: 'TableCell',
                },
                {
                  type: 'TableCell',
                  items: [
                    {
                      type: 'TextBlock',
                      text: 'Status',
                      horizontalAlignment: 'Right',
                      isSubtle: true,
                      wrap: true,
                    },
                    {
                      type: 'TextBlock',
                      text: jobDetails.status,
                      horizontalAlignment: 'Right',
                      spacing: 'None',
                      size: 'Large',
                      color: 'Good',
                      wrap: true,
                    },
                  ],
                },
              ],
            },
            {
              type: 'TableRow',
              cells: [
                {
                  type: 'TableCell',
                  items: [
                    {
                      type: 'TextBlock',
                      text: 'Job ID',
                      isSubtle: true,
                      weight: 'Bolder',
                      wrap: true,
                    },
                    {
                      type: 'TextBlock',
                      text: jobDetails.jobId,
                      spacing: 'Small',
                      wrap: true,
                    },
                  ],
                },
                {
                  type: 'TableCell',
                  items: [
                    {
                      type: 'TextBlock',
                      text: 'Type',
                      isSubtle: true,
                      horizontalAlignment: 'Center',
                      weight: 'Bolder',
                      wrap: true,
                    },
                    {
                      type: 'TextBlock',
                      text: jobDetails.jobCategory,
                      color: 'Default',
                      weight: 'Bolder',
                      horizontalAlignment: 'Center',
                      spacing: 'Small',
                      wrap: true,
                    },
                  ],
                },
                {
                  type: 'TableCell',
                  items: [
                    {
                      type: 'TextBlock',
                      text: 'Estimated Completion',
                      isSubtle: true,
                      horizontalAlignment: 'Right',
                      weight: 'Bolder',
                      wrap: true,
                    },
                    {
                      type: 'TextBlock',
                      text: jobDetails.estimatedCompletion,
                      color: 'Default',
                      horizontalAlignment: 'Right',
                      weight: 'Bolder',
                      spacing: 'Small',
                      wrap: true,
                    },
                  ],
                },
              ],
            },
          ],
          showGridLines: false,
        },
      ],
    };
    const result = await client.conversations.v1.conversations(conversationSid).messages.create({
      author: messageAuthor,
      body: 'Job Dispatch Status',
      attributes: {
        'adaptive-card': adaptiveCard,
      },
    });
    response.setBody(result);
    return callback(null, response);
  } catch (error) {
    console.log('Error', error);
    return handleError(error);
  }
});
