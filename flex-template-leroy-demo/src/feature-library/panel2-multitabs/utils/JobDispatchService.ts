import { EncodedParams } from '../../../types/serverless';
import ApiService from '../../../utils/serverless/ApiService';

class JobDispatchService extends ApiService {
  sendDispatchMessage = async (conversationSid: string, jobDetails: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      const encodedParams: EncodedParams = {
        conversationSid: encodeURIComponent(conversationSid),
        jobDetails: encodeURIComponent(JSON.stringify(jobDetails)),
        Token: encodeURIComponent(this.manager.user.token),
      };

      this.fetchJsonWithReject<any>(
        `${this.serverlessProtocol}://${this.serverlessDomain}/features/job-dispatch/flex/send-dispatch-message`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: this.buildBody(encodedParams),
        },
      )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.error(`Error fetching canned responses\r\n`, error);
          reject(error);
        });
    });
  };
}

export default new JobDispatchService();
