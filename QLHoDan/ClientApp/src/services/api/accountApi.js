import axios from 'axios';
// return axios.post(API_ACCOUNT_CHANGEPASSWORD_URL, { oldPassword, newPassword },
//     {
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `${token}`
//         }
//     });
import { API_ACCOUNT_CHANGEPASSWORD_URL } from '~/AppConstant';
class AccountApi {
    changePassword = async (token, oldPassword, newPassword) => {
        // return new Promise((resolve, reject) => {
        //     fetch(API_ACCOUNT_CHANGEPASSWORD_URL, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${token}`
        //         },
        //         body: JSON.stringify({
        //             oldPassword,
        //             newPassword
        //         })
        //     }).then((response) => {
        //         if (response.status === 200) {
        //             resolve(response);
        //         }
        //         else {
        //             console.log(response);
        //         }
        //     })
        //         .catch((error) => { reject(error); });
        // });
        return axios.post(API_ACCOUNT_CHANGEPASSWORD_URL, { oldPassword, newPassword },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    }
}

const accountApi = new AccountApi();
export default accountApi;

