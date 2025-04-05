import { ref } from "vue";
import { useLoading } from 'vue-loading-overlay'
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';

import CattleStatus from "@/domain/useCases/CattleStatus";

const useCattleStatus = () => { 

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
    const searchQuery = ref('');

    const statusList = ref([]);
    const statusModel = ref([{
        id: null,
        code: '',
        name: ''
    }]);
    const errors = ref({});

    // FUNCIONES
    const getAllStatusNoPag = async (loading = true) => {
        const loader = loading ? $loading.show() : null;
        try {
            
            const resp = await CattleStatus.getAllStatusNoPag();
            if (resp.success == false) throw resp;

            statusList.value = resp
            return resp

        } catch (error) {
            if (error.code == 401) {
                toast.warning('Tu sesión caducó por seguridad, ingresa nuevamente.')
                window.location.reload();
                return;
            }
            toast.error('Ha ocurrido un error al cargar el listado de status. Inténtalo de nuevo más tarde')
            throw new Error('Error al obtener listado de status: ' + error);
        } finally {
            loading ? loader.hide() : null
        }
    }




    return {
        page,
        totalPages,
        perPage,
        searchQuery,
        statusList,
        statusModel,
        errors,

        getAllStatusNoPag,
    }
}

export default useCattleStatus;