import { ref } from "vue";
import { useLoading } from 'vue-loading-overlay'
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';

import Sex from "@/domain/useCases/Sex";

const useSex = () => { 

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

    const sexList = ref([]);
    const sexModel = ref([{
        id: null,
        name: ''
    }]);
    const errors = ref({});

    // FUNCIONES
    const getAllSexesNoPag = async (loading = true) => {
        const loader = loading ? $loading.show() : null;
        try {
            
            const resp = await Sex.getAllSexesNoPag();
            if (resp.success == false) throw resp;

            sexList.value = resp

            return resp

        } catch (error) {
            if (error.code == 401) {
                toast.warning('Tu sesión caducó por seguridad, ingresa nuevamente.')
                window.location.reload();
                return;
            }
            toast.error('Ha ocurrido un error al cargar el listado de sexos. Inténtalo de nuevo más tarde')
            throw new Error('Error al obtener listado de sexos: ' + error);
        } finally {
            loading ? loader.hide() : null
        }
    }




    return {
        page,
        totalPages,
        perPage,
        searchQuery,
        sexList,
        sexModel,
        errors,

        getAllSexesNoPag,
    }
}

export default useSex;