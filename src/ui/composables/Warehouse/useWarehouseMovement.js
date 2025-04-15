import { ref } from "vue";
import { useLoading } from 'vue-loading-overlay'
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';

import WarehouseMovement from "@/domain/useCases/WarehouseMovement"

const useWarehouseMovement = () => {

    const router = useRouter()
    const toast = useToast({
        timeout: 5000
    });
    const $loading = useLoading({
        color: '#007BFF'
    });

    const warehouseMovementModel = ref({
        id: '',
        userId: '',
        registerDate: new Date().toLocaleDateString('es-MX'),
        movementType: '',
        createdAt: '',
        movementDetails: [{
            id: '',
            warehouseMovementId: '',
            foodTypeId: '',
            quantity: '',
            unitPrice: '',
            description: '',
            createdAt: ''
        }]
    })
    const errors = ref({});


    return {
        warehouseMovementModel,
        errors,

    }
}

export default useWarehouseMovement