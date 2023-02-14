
import {
    TabsUnstyled,
    Tab,
    TabPanel,
    TabsList,
} from '~/components/Tabs';

import ReadNotification from './Read';
import UnReadNotification from './Unread';

function Notification() {
    return (
        <TabsUnstyled defaultValue={0}>
            <TabsList >
                <Tab >Thông báo chưa đọc</Tab>
                <Tab >Thông báo đã đọc</Tab>
            </TabsList>
            <TabPanel value={0}>
                <UnReadNotification />
            </TabPanel>
            <TabPanel value={1}>
                <ReadNotification />
            </TabPanel>
        </TabsUnstyled>
    );
}

export default Notification;