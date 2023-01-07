import axiosClient from "./axios";

const url = '/accounts';
class AccountApi {
    addAccount = (params) => {
        return axiosClient.post(url, { params });
    };
    checkLogin = (params) => {
        return axiosClient.get(url, { params });
    };
    getAllAccount = () => {
        return axiosClient.get(url);
    };
    changePassword = (id, newPassword, oldAccount) => {
        return axiosClient.put(url + '/' + id, { ...oldAccount, password: newPassword });
    }
}

const accountApi = new AccountApi();
export default accountApi;