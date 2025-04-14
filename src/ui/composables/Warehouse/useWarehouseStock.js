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


    return {
        warehouseStockList,
        warehouseStockPagination,
        
    }
}

export default useWarehouseStock;