import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "X-API-KEY": import.meta.env.VITE_API_KEY
    }
});

export default api;

interface BatchJobResponse {
    jobId: string;
}

export const enviarBatch = async (file: File): Promise<BatchJobResponse> => {
    const formData = new FormData();
    formData.append('File', file);

    const response = await api.post<BatchJobResponse>('/previsoes/batch', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};