import {
    API_GET_ALL_RESIDENT
} from '~/AppConstant';
import config from './configHeader'
import axios from 'axios';

class ResidentManager {
    async getAllResident(token) {
        const response = await axios.get(
            API_GET_ALL_RESIDENT,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
    }

    async getResident(token, id) {
        const response = await axios.get(
            `${API_GET_ALL_RESIDENT}/${id}`, config(token)
        );
        if (response && response.data) {
            return response.data;
        }
    }

    async getResidentsById(token, ids) {
        let residents = [];
        for (let i = 0; i < ids.length; i++) {
            const response = await axios.get(
                `${API_GET_ALL_RESIDENT}/${ids[i]}`, config(token)
            );
            if (response && response.data) {
                residents.push(response.data);
            }
        }
        return residents;
    }


    async createResident(token, resident) {
        const response = await axios.post(
            API_GET_ALL_RESIDENT,
            resident,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
    }
    async updateResident(token, newResident) {
        const response = await axios.put(
            API_GET_ALL_RESIDENT,
            newResident,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
    }
    async deleteResident(token, id) {
        const response = await axios.delete(
            `${API_GET_ALL_RESIDENT}/${id}`,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
    }
}

const residentManager = new ResidentManager();
export default residentManager;