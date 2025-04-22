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
    const newMovementDetailModel = ref({
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
        if (!newMovementDetailModel.value.foodTypeId || !newMovementDetailModel.value.foodType) {
            newErrors.foodType = 'Selecciona un alimento'
        }
        if (!newMovementDetailModel.value.quantity) {
            newErrors.quantity = 'Selecciona una cantidad'
        }
        if (!newMovementDetailModel.value.unitPrice) {
            newErrors.unitPrice = 'Selecciona el precio por unidad'
        }
        errors.value = newErrors; // Actualizar los errores

        // Si no hay errores, retornar true para proceder con el registro
        return Object.keys(newErrors).length === 0;
    }

    const validateRegisterEntryMovement = () => {
        const newErrors = {};
        if (!warehouseMovementModel.value.registerDate) newErrors.registerDate = 'La fecha de registro es requerida'

        if (warehouseMovementModel.value.movementDetails.length < 1) {
            newErrors.foodType = 'Agrega al menos un alimento a la tabla para registrar la entrada'
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
    
        warehouseMovementModel.value.movementDetails = [ ...warehouseMovementModel.value.movementDetails, newMovementDetailModel.value ]
    
        // Limpiar los campos después de agregar
        newMovementDetailModel.value = {
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


    // FUNCIONES API
    const registerWarehouseEntryMovement = async () => {
        const loader = $loading.show();
        try {
            if (!validateRegisterEntryMovement()) {
                toast.warning('Revisa los campos para continuar')
                return;
            }

            const resp = await WarehouseMovement.registerWarehouseEntryMovement(warehouseMovementModel.value);
            if (resp.success == false) throw resp;

            toast.success('Se registró la entrada en almacén')
            router.replace({ name: 'warehouse-stock' })
            return;

        } catch (error) {
            if (error.code == 401) {
                toast.warning('Tu sesión caducó por seguridad, ingresa nuevamente.')
                window.location.reload();
                return;
            }
            if (error.code == 422) {
                toast.warning(error?.error ? error.error : 'Verifica la información ingresada')
                return;
            }
            toast.error('Ha ocurrido un error al guardar el registro. Inténtalo de nuevo más tarde')
            throw new Error('Error al registrar el movimiento de almacén: ' + error);
        } finally {
            loader.hide()
        }
    }



    return {
        warehouseMovementModel,
        newMovementDetailModel,
        errors,
        addMovementDetail,
        removeMovementDetail,
        registerWarehouseEntryMovement,
    }
}

export default useWarehouseMovement