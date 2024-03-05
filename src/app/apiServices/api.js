import axios from 'axios';
let apiPath = 'api';
export const createContactApi = async (formData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(`${apiPath}/contact_us`, formData);
            resolve(response.data);
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                const res = {
                    status,
                    data,
                };
               return reject(res);
            } else {
                console.error('Error creating contact:', error.message);
                reject({ status: 500, data: 'Internal Server Error' });
            }
        }
    });
};
export const getContactData = async (formData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(`${apiPath}/get_contact_data`);
            resolve(response.data);
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                const res = {
                    status,
                    data,
                };
               return reject(res);
            } else {
                console.error('Error creating contact:', error.message);
                reject({ status: 500, data: 'Internal Server Error' });
            }
        }
    });
}