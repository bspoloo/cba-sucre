import api from "@/plugins/axios";
import { useToast } from "primevue";
import toast from "primevue/toast";

export class DocenteService {
    private toast;
    private endpoint_base = '/docentes';
    constructor() {
        this.toast = useToast()
    }
    public async getDocentes() {
        try {
            const { data } = await api.get(`${import.meta.env.VITE_BASE_URL_API}/docentes`);
            return data;
        } catch (error) {
            console.error(error)
            const response = JSON.parse((error as any)?.request?.responseText);
            this.toast.add({
                severity: 'error',
                summary: 'Error',
                detail: `Error traer los docentes ${response.message ?? 'Error desconocido'}`,
                life: 3000
            });
            return [];
        }
    }
}