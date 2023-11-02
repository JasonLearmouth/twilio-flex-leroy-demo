const { prepareStudioFunction, extractStandardResponse } = require(Runtime.getFunctions()[
  'common/helpers/function-helper'
].path);
const TaskOperations = require(Runtime.getFunctions()['common/twilio-wrappers/taskrouter'].path);

const requiredParameters = [
  {
    key: 'jsonAttributes',
    purpose: 'JSON calling tasks attributes to perpetuate onto new task',
  },
];

exports.handler = prepareStudioFunction(requiredParameters, async (context, event, callback, response, handleError) => {
  try {
    console.log('Incoming Event:', event);
    const {
      jsonAttributes,
      workflowSid: overriddenWorkflowSid,
      timeout: overriddenTimeout,
      priority: overriddenPriority,
    } = event;

    const parsedJsonAttributes = JSON.parse(jsonAttributes);
    console.log('Parsed JSON Attributes: ', parsedJsonAttributes);
    const parsedRawAttributes = JSON.parse(parsedJsonAttributes.raw);
    console.log('Parsed Raw Attributes', parsedRawAttributes);

    // use assigned values or use defaults
    const workflowSid = overriddenWorkflowSid || context.TWILIO_FLEX_JOB_DISPATCH_WORKFLOW_SID;
    const timeout = overriddenTimeout || 86400;
    const priority = overriddenPriority || 0;

    let newAttributes;
    if (
      parsedRawAttributes.taskType &&
      parsedRawAttributes.taskCategory &&
      parsedJsonAttributes.pre_engagement_data.friendly_name
    ) {
      let taskName = `Job Dispatch (${parsedRawAttributes.taskCategory}): ${parsedJsonAttributes.pre_engagement_data.friendly_name}`;
      newAttributes = {
        name: taskName,
        ...parsedRawAttributes,
        pre_engagement_data: {
          ...parsedJsonAttributes.pre_engagement_data,
        },
      };
    } else {
      newAttributes = {
        ...parsedRawAttributes,
      };
    }
    const result = await TaskOperations.createTask({
      context,
      workflowSid,
      taskChannel: 'default',
      attributes: newAttributes,
      priority,
      timeout,
    });
    const {
      task: {
        sid: taskSid,
        attributes: { channelSid },
      },
      success,
      status,
    } = result;
    response.setStatusCode(status);
    response.setBody({ taskSid, ...extractStandardResponse(result) });

    return callback(null, response);
  } catch (error) {
    return handleError(error);
  }
});
