import { ref } from "vue";
import { useLoading } from 'vue-loading-overlay'
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';

import FoodType from "@/domain/useCases/FoodType"

const useFoodType = () => {
    
    const router = useRouter()
    const toast = useToast({
        timeout: 5000
    });
    const $loading = useLoading({
        color: '#007BFF'
    });
    const foodTypePagination = ref({
        page: 1,
        totalPages: '',
        perPage: 15,
        searchQuery: '',
        searching: false
    })

    const foodTypeList = ref([]);
    const foodTypeModel = ref([{
        id: null,
        userId: '',
        name: ''
    }]);
    const errors = ref({});


    // FUNCIONES
    const getAllFoodTypesNoPag = async (loading = true) => {
        const loader = loading ? $loading.show() : null;
        try {
            
            const resp = await FoodType.getAllFoodTypesNoPag()
            if (resp.success == false) throw resp;

            foodTypeList.value = resp
            
            return resp

        } catch (error) {
            if (error.code == 401) {
                toast.warning('Tu sesión caducó por seguridad, ingresa nuevamente.')
                window.location.reload();
                return;
            }
            toast.error('Ha ocurrido un error al cargar el listado de alimentos. Inténtalo de nuevo más tarde')
            throw new Error('Error al obtener listado de razas: ' + error);
        } finally {
            loading ? loader.hide() : null
        }
    }


    return {
        getAllFoodTypesNoPag
    }
}

export default useFoodType