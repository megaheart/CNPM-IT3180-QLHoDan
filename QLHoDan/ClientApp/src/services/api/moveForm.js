// form xin chuyen di

import axios from './axios';
import { API_MOVEMENT_FORM } from '~/AppConstant'; // API_MOVEMENT_FORM = /api/forms/MovingOut
import config from './configHeader';


class FormMovement {
    async getAllFormMovement(token) {
        const response = await axios.get(
            API_MOVEMENT_FORM,
            config(token)
        );
        if (response.data) {
            return response.data
        }
        else {
            return []
        }
    }

    async getAllCheckFormMovement(token, isChecked) {
        const response = await axios.get(
            `${API_MOVEMENT_FORM}?isChecked=${isChecked}`,
            config(token)
        );
        return response.data
    }

    async getDetailFormMovementById(token, id) {
        const response = await axios.get(
            `${API_MOVEMENT_FORM}/${id}`,
            config(token)
        );
        return response.data
    }

    async sendFormMovement(token, data) {
        const response = await axios.post(
            API_MOVEMENT_FORM,
            data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    }

    async acceptFormMovement(token, id, data) {
        const response = await axios.post(
            `${API_MOVEMENT_FORM}/accept/${id}`,
            data,
            config(token)
        )
        return response.data
    }

    async undoFormMovement(token, id) {
        const response = await axios.delete(
            `${API_MOVEMENT_FORM}/${id}`,
            config(token)
        )
        return response.data
    }
}

const formMovement = new FormMovement();
export default formMovement;