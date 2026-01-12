import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "X-API-KEY": import.meta.env.VITE_API_KEY
    }
});

export default api;

interface BatchJobResponse {
    job_id: string;
}
interface BatchStatusResponse {
    status: string;
}

export const enviarBatch = async (file: File): Promise<BatchJobResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<BatchJobResponse>('/previsoes/batch', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};
export const statusBatch = async (job_id: string): Promise<BatchStatusResponse> => {

    const response = await api.get<BatchStatusResponse>(`/previsoes/batch/${job_id}/status`);
    return response.data;
};
export const downloadBatch = async (jobId: string) => {
    const response = await api.get(`/previsoes/batch/${jobId}/download`, {
        responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    
    link.setAttribute('download', `resultado.csv`);
    
    document.body.appendChild(link);
    link.click();
    
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
};