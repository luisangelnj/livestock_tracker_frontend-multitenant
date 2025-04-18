import { ref } from "vue";
import { useLoading } from 'vue-loading-overlay'
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';

import WarehouseStock from "@/domain/useCases/WarehouseStock";

const useWarehouseStock = () => {
    
    const router = useRouter()
    const toast = useToast({
        timeout: 5000
    });
    const $loading = useLoading({
        color: '#007BFF'
    });

    const warehouseStockPagination = ref({
        page: 1,
        totalPages: '',
        perPage: 15,
        searchQuery: '',
        searching: false
    })
    const warehouseStockList = ref([])
    const warehouseStockModel = ref({
        id: '',
        food: '',
        foodTypeId: '',
        quantity: '',
        createdAt: ''
    })
    const errors = ref({})


    // FUNCIONES
    const getAllWarehouseStock = async (loading = true) => {
        const loader = loading ? $loading.show() : null;
        try {
            
            const resp = await WarehouseStock.getAllWarehouseStock(warehouseStockPagination.value.page, warehouseStockPagination.value.perPage, warehouseStockPagination.value.searchQuery);
            if (resp.success == false) throw resp;

            warehouseStockList.value = resp.values
            warehouseStockPagination.value.totalPages = resp.totalPages

            return resp

        } catch (error) {
            if (error.code == 401) {
                toast.warning('Tu sesión caducó por seguridad, ingresa nuevamente.')
                window.location.reload();
                return;
            }
            toast.error('Ha ocurrido un error al cargar el listado de stock. Inténtalo de nuevo más tarde')
            throw new Error('Error al obtener listado de stock: ' + error);
        } finally {
            loading ? loader.hide() : null
        }
    }


    return {
        warehouseStockList,
        warehouseStockPagination,

        getAllWarehouseStock
    }
}

export default useWarehouseStock;