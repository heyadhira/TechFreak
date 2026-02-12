import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

// Mock client to stop SDK auto-tracking errors while retaining necessary interfaces
export const base44 = {
    integrations: {
        Core: {
            UploadFile: async ({ file }) => {
                // Local upload implementation could go here
                console.warn("Base44 SDK is disabled. Using local mock for upload.");
                return { file_url: URL.createObjectURL(file) };
            }
        }
    },
    auth: {
        logout: (url) => { window.location.href = url || '/'; },
        redirectToLogin: (url) => { window.location.href = '/login'; }
    },
    appLogs: {
        logUserInApp: () => Promise.resolve()
    },
    entities: new Proxy({}, {
        get: () => ({
            list: () => Promise.resolve([]),
            get: () => Promise.resolve(null),
            create: () => Promise.resolve({}),
            update: () => Promise.resolve({}),
            delete: () => Promise.resolve({})
        })
    })
};

/*
const { appId, token, functionsVersion, appBaseUrl } = appParams;
export const base44 = createClient({
    appId,
    token,
    functionsVersion,
    serverUrl: '',
    requiresAuth: false,
    appBaseUrl
});
*/
