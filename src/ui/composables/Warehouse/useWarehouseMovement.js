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
        movementDetails: []
    })
    const newMovementDetail = ref({
        foodType: '',
        foodTypeId: '',
        quantity: '',
        unitPrice: '',
        description: '',
    })
    const errors = ref({});


    // VALIDACIONES
    const validateAddMovementDetail = () => {
        const newErrors = {};
        if (!newMovementDetail.value.foodType) {
            newErrors.foodType = 'Selecciona un alimento'
        }
        if (!newMovementDetail.value.quantity) {
            newErrors.quantity = 'Selecciona una cantidad'
        }
        if (!newMovementDetail.value.unitPrice) {
            newErrors.unitPrice = 'Selecciona el precio por unidad'
        }
        errors.value = newErrors; // Actualizar los errores

        // Si no hay errores, retornar true para proceder con el registro
        return Object.keys(newErrors).length === 0;
    }

    // Agrega un nuevo detalle al arreglo
    const addMovementDetail = () => {
        if (!validateAddMovementDetail()) {
            toast.warning('Revisa los campos para continuar')
            return; // Si hay errores, no procedemos
        }
    
        warehouseMovementModel.value.movementDetails = [ ...warehouseMovementModel.value.movementDetails, newMovementDetail.value ]
    
        // Limpiar los campos después de agregar
        newMovementDetail.value = {
            foodType: '',
            foodTypeId: '',
            quantity: '',
            unitPrice: '',
            description: '',
        }
    }
    
    // Elimina un detalle por índice
    const removeMovementDetail = (indexToRemove) => {
        if (confirm('¿Estás seguro de eliminar la entrada?')) {
            warehouseMovementModel.value.movementDetails = warehouseMovementModel.value.movementDetails.filter((_, index) => index !== indexToRemove)
        }
    }



    return {
        warehouseMovementModel,
        newMovementDetail,
        addMovementDetail,
        removeMovementDetail,
        errors,

    }
}

export default useWarehouseMovement