import { Tabs, Tab, TabList, TabPanel, TabPanels } from '@twilio-paste/core';
import { useUID } from '@twilio-paste/core/dist/uid-library';

import FauxJobDispatchView from '../FauxJobDispatch/FauxJobDispatchView';

const Panel2JobDispatchTabs = () => {
  const selectedId = useUID();

  return (
    <>
      <Tabs selectedId={selectedId} baseId="panel2-fitted-tabs" variant="fitted">
        <TabList aria-label="Panel 2 tabs">
          <Tab id={selectedId}>Dispatch Jobs</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FauxJobDispatchView />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Panel2JobDispatchTabs;
