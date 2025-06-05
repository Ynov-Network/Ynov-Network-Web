import axios, {
    AxiosError,
    type AxiosInstance,
    type CreateAxiosDefaults,
} from "axios";

const axiosConfig: CreateAxiosDefaults = {
    baseURL: import.meta.env.VITE_SERVER_URL,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
};

const axiosClient: AxiosInstance = axios.create(axiosConfig);

const createServiceClient = (serviceName: string, options?: CreateAxiosDefaults): AxiosInstance => {
    const baseURL = new URL(serviceName, axiosConfig.baseURL).href;
    return axios.create({
        ...axiosConfig,
        ...options,
        baseURL
    });
};

axiosClient.interceptors.request.use(
    (config) => {
        console.log("Request initiated ", config);
        return config;
    },
    (error: AxiosError) => {
        console.error("Request error", error);
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        console.log("Response received", response);
        return response;
    },
    (error: AxiosError) => {
        console.error("Response error", error);
        return Promise.reject(error);
    }
);

export { axiosClient, createServiceClient };
