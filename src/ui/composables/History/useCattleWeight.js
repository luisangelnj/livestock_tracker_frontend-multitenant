import { ref } from "vue";
import { useLoading } from 'vue-loading-overlay'
import { useToast } from "vue-toastification";

import CattleWeight from "@/domain/useCases/CattleWeight";

const useCattleWeight = () => { 

    const toast = useToast({
        timeout: 5000
    });
    const $loading = useLoading({
        color: '#007BFF'
    });

    const page = ref(1);
    const totalPages = ref()
    const perPage = ref(10)
    const searching = ref(false)

    const isRegisterWeightModalOpen = ref(false)

    const weightList = ref([]);
    const weightModel = ref([{
        id: null,
        cattleId: '',
        registerDate: '',
        weight: '',
        createdAt: ''
    }]);
    const errors = ref({});


    // VALIDACIONES
    const validateRegisterForm = () => {
        const newErrors = {};
        // Validar que todos los campos estén llenos
        if (!weightModel.value.registerDate) {
            newErrors.registerDate = 'Ingresa la fecha del pesaje';
        }
        if (!weightModel.value.weight) {
            newErrors.weight = 'Ingresar el pesaje es requerido.';
        }
        errors.value = newErrors; // Actualizar los errores

        // Si no hay errores, retornar true para proceder con el registro
        return Object.keys(newErrors).length === 0;
    }


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

    const registerWeight = async (cattleId) => {
        const loader = $loading.show();
        try {
            if (!validateRegisterForm()) {
                toast.warning('Revisa los campos para continuar')
                return; // Si hay errores, no procedemos
            }

            weightModel.value.cattleId = cattleId
            const resp = await CattleWeight.registerWeight(weightModel.value);
            if (resp.success == false) throw resp;

            toast.success('Pesaje registrado exitosamente');
            return true;

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
            toast.error('Ha ocurrido un error al registrar el pesaje. Inténtalo de nuevo más tarde')
            throw new Error('Error al registrar el pesaje: ' + error);
        } finally {
            loader.hide()
        }
    }

    const deleteWeight = async (loading=true, weightId) => {
        const loader = loading ? $loading.show() : null;
        try {

            const resp = await CattleWeight.deleteWeight(weightId);
            if (resp.success == false) throw resp;

            return true;
            
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
            toast.error('Ha ocurrido un error al eliminar el pesaje. Inténtalo de nuevo más tarde')
            throw new Error('Error al eliminar el pesaje: ' + error);
        } finally {
            loading ? loader.hide() : null
        }
    }


    return {
        pagination: { page, totalPages, perPage, searching },
        weightList,
        weightModel,
        isRegisterWeightModalOpen,
        errors,

        getAllWeightHistory,
        registerWeight,
        deleteWeight
    }

}

export default useCattleWeight;