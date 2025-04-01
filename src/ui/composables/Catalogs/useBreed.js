import { ref } from "vue";
import { useLoading } from 'vue-loading-overlay'
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';

import Breed from "@/domain/useCases/Breed";

const useBreed = () => { 

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

    const breedList = ref([]);
    const breedModel = ref([{
        id: null,
        userId: '',
        name: '',
        status: ''
    }]);
    const errors = ref({});


    // FUNCIONES
    const getAllBreedsNoPag = async (loading = true) => {
        const loader = loading ? $loading.show() : null;
        try {
            
            const resp = await Breed.getAllBreedsNoPag();
            if (resp.success == false) throw resp;

            breedList.value = resp

            return resp

        } catch (error) {
            if (error.code == 401) {
                toast.warning('Tu sesión caducó por seguridad, ingresa nuevamente.')
                window.location.reload();
                return;
            }
            toast.error('Ha ocurrido un error al cargar el listado de razas. Inténtalo de nuevo más tarde')
            throw new Error('Error al obtener listado de razas: ' + error);
        } finally {
            loading ? loader.hide() : null
        }
    }

    return {
        page,
        totalPages,
        perPage,
        searchQuery,
        breedList,
        breedModel,
        errors,

        getAllBreedsNoPag,
    }
}

export default useBreed;