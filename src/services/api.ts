import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { getToken, logout } from "./auth";

/**
 * @since 25/11/2024
 * @description Instância do Axios.
 * @author Lucas Ronchi <@lucas0headshot>
 * @return {AxiosInstance}
 */
const api: AxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8080"
});

api.interceptors.request.use(async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const token = getToken();
    if (token)
        config.headers.Authorization = `Bearer ${token}`;

    return config;
});

api.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 403) {
            logout();
            location.assign("/entrar");
        }

        return response;
    }
);

export default api;