import { API_NOTIFICATION } from '../AppConstant';
import config from './configHeader';
import { API_HOUSEHOLDS } from '~/AppConstant';

class NotificationManager {
    async getNumberOfUnreadNotification(token) {
        const response = await axios.get(
            `${API_NOTIFICATION}/count`,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            console.log('ERROR IN GETTING NUMBER OF UNREAD NOTIFICATION')
        }
    }

    async getUnreadNotification(token) {
        const response = await axios.get(
            `${API_NOTIFICATION}?isRead=${false}}`,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            console.log('ERROR IN GETTING UNREAD NOTIFICATION')
        }
    }
    async getReadNotification(token) {
        const response = await axios.get(
            `${API_NOTIFICATION}?isRead=${true}}`,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            console.log('ERROR IN GETTING UNREAD NOTIFICATION')
        }
    }

    async markNotification(token, ids) {
        let idParams = ids.join(',');
        const response = await axios.post(
            `${API_NOTIFICATION}/read?msgIds=${idParams}`,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            console.log('ERROR IN MARKING NOTIFICATIONS')
        }
    }
}

const notificationManager = new NotificationManager();
export default notificationManager;