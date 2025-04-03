import { ref } from "vue";
import { useLoading } from 'vue-loading-overlay'
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';

import CattleWeight from "@/domain/useCases/CattleWeight";

const useCattleWeight = () => { 

    const router = useRouter()
    const toast = useToast({
        timeout: 5000
    });
    const $loading = useLoading({
        color: '#007BFF'
    });

    const page = ref(1);
    const totalPages = ref()
    const perPage = ref(15)

    const weightList = ref([]);
    const weightModel = ref([{
        id: null,
        cattleId: '',
        registerDate: '',
        weight: '',
        createdAt: ''
    }]);
    const errors = ref({});

    const getAllWeightHistory = async (loading = true, cattleId) => { 
        const loader = loading ? $loading.show() : null;
        try {
            
            const resp = await CattleWeight.getAllWeightHistory(page.value, perPage.value, cattleId);
            if (resp.success == false) throw resp;

            weightList.value = resp.values
            totalPages.value = resp.totalPages

            return resp

        } catch (error) {
            if (error.code == 401) {
                toast.warning('Tu sesión caducó por seguridad, ingresa nuevamente.')
                window.location.reload();
                return;
            }
            throw new Error('Error al obtener el historial de pesaje: ' + error);
        } finally {
            loading ? loader.hide() : null
        }
    }


    return {
        page,
        totalPages,
        perPage,
        weightList,
        weightModel,
        errors,

        getAllWeightHistory,
    }

}

export default useCattleWeight;