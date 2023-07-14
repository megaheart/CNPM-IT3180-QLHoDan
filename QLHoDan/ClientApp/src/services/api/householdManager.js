import axios from './axios';
import config from './configHeader';
import { API_HOUSEHOLDS } from '~/AppConstant';

class HouseholdManager {
    async getHouseholdList(token) {
        const response = await axios.get(
            API_HOUSEHOLDS,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            console.log('ERROR IN GETTING HOUSEHOLD LIST')
        }
    }
    async getHouseholdListMove(token) {
        const response = await axios.get(
            `${API_HOUSEHOLDS}?movedOut=${true}`,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            console.log('ERROR IN GETTING HOUSEHOLD LIST MOVE OUT')
        }
    }
    async getHousehold(token, id) {
        const response = await axios.get(`${API_HOUSEHOLDS}/${id}`,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            console.log('ERROR IN GETTING HOUSEHOLD')
        }
    }
    async addHousehold(token, household) {
        const response = await axios.post(API_HOUSEHOLDS, household,
            config(token)
        );
        if (response && response.data) {
            return response;
        }
        else {
            console.log('ERROR IN ADDING HOUSEHOLD')
        }
    }
    async updateHousehold(token, id, household) {
        const response = await axios.put(
            `${API_HOUSEHOLDS}`,
            household,
            config(token)
        );
        if (response && response.data) {
            return response;
        }
        else {
            console.log('ERROR IN UPDATING HOUSEHOLD')
        }
    }
    async deleteHousehold(token, id) {
        const response = await axios.delete(
            `${API_HOUSEHOLDS}/${id}`,
            config(token)
        );
        if (response && response.data) {
            return response;
        }
        else {
            console.log('ERROR IN DELETING HOUSEHOLD')
        }
    }
}

const householdManager = new HouseholdManager();
export default householdManager;