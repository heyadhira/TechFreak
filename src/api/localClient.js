import { appParams } from '@/lib/app-params';

const BASE_URL = 'http://127.0.0.1:8000/api';

export const localClient = {
    request: async (endpoint, method = 'GET', data = null) => {
        try {
            const headers = {
                'Accept': 'application/json',
            };

            const options = {
                method,
                headers,
            };

            if (data) {
                if (data instanceof FormData) {
                    // Let the browser set the Content-Type header with the boundary
                    options.body = data;
                } else {
                    headers['Content-Type'] = 'application/json';
                    options.body = JSON.stringify(data);
                }
            }

            const response = await fetch(`${BASE_URL}${endpoint}`, options);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `API Error: ${response.statusText}`);
            }

            if (response.status === 204) {
                return null;
            }

            const result = await response.json();
            return result.data !== undefined ? result.data : result;
        } catch (error) {
            console.error(`${method} request error:`, error);
            throw error;
        }
    },

    get: (endpoint) => localClient.request(endpoint, 'GET'),
    post: (endpoint, data) => localClient.request(endpoint, 'POST', data),
    put: (endpoint, data) => localClient.request(endpoint, 'PUT', data),
    delete: (endpoint) => localClient.request(endpoint, 'DELETE'),
};
