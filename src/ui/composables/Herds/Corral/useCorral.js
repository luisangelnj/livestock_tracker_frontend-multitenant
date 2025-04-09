import { ref } from "vue";
import { useLoading } from 'vue-loading-overlay'
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';

import Corral from "@/domain/useCases/Corral";

const useCorral = () => { 

    const router = useRouter()
    const toast = useToast({
        timeout: 5000
    });
    const $loading = useLoading({
        color: '#007BFF'
    });

    const corralPagination = ref({
        page: 1,
        totalPages: '',
        perPage: 15,
        searchQuery: '',
        searching: false
    })
    const corralsList = ref([]);
    const corralModel = ref([{
        id: null,
        name: '',
        location: '',
        capacity: '',
        currentOccupancy: '',
        description: '',
        status: '',
        createdAt: ''
    }]);
    const corralCattlePagination = ref({
        page: 1,
        totalPages: '',
        perPage: 15,
        searchQuery: '',
        searching: false
    })
    const corralCattleList = ref([])
    const errors = ref({});

    // VALIDACIONES
    const validateAddForm = () => {
        const newErrors = {};
        // Validar que todos los campos estén llenos
        if (!corralModel.value.name) {
            newErrors.name = 'El nombre es obligatorio.';
        }
        errors.value = newErrors; // Actualizar los errores

        // Si no hay errores, retornar true para proceder con el registro
        return Object.keys(newErrors).length === 0;
    }

    // VALIDACIONES
    const validateUpdateForm = () => {
        const newErrors = {};
        // Validar que todos los campos estén llenos
        if (!corralModel.value.name) {
            newErrors.name = 'El nombre es obligatorio.';
        }
        errors.value = newErrors; // Actualizar los errores

        // Si no hay errores, retornar true para proceder con el registro
        return Object.keys(newErrors).length === 0;
    }


    // FUNCIONES
    const getAllCorralsNoPag = async (loading = true) => {
        const loader = loading ? $loading.show() : null;
        try {
            
            const resp = await Corral.getAllCorralsNoPag();
            if (resp.success == false) throw resp;

            corralsList.value = resp

            return resp

        } catch (error) {
            if (error.code == 401) {
                toast.warning('Tu sesión caducó por seguridad, ingresa nuevamente.')
                window.location.reload();
                return;
            }
            toast.error('Ha ocurrido un error al cargar el listado de corrales. Inténtalo de nuevo más tarde')
            throw new Error('Error al obtener listado de corrales: ' + error);
        } finally {
            loading ? loader.hide() : null
        }
    }

    const getAllCorrals = async (loading = true) => {
        const loader = loading ? $loading.show() : null;
        try {
            
            const resp = await Corral.getAllCorrals(corralPagination.value.page, corralPagination.value.perPage, corralPagination.value.searchQuery);
            if (resp.success == false) throw resp;

            corralsList.value = resp.values
            corralPagination.value.totalPages = resp.totalPages
            console.log(corralPagination.value);
            

            return resp

        } catch (error) {
            if (error.code == 401) {
                toast.warning('Tu sesión caducó por seguridad, ingresa nuevamente.')
                window.location.reload();
                return;
            }
            toast.error('Ha ocurrido un error al cargar el listado de corrales. Inténtalo de nuevo más tarde')
            throw new Error('Error al obtener listado de corrales: ' + error);
        } finally {
            loading ? loader.hide() : null
        }
    }

    const addCorral = async () => {
        const loader = $loading.show();
        try {
            if (!validateAddForm()) {
                toast.warning('Revisa los campos para continuar')
                return; // Si hay errores, no procedemos
            }

            const resp = await Corral.addCorral(corralModel.value);
            if (resp.success == false) throw resp;
            corralModel.value = resp

            toast.success('Se ha registrado exitosamente');
            router.push({ name: 'corrals-list' });
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
            throw new Error('Error al registrar el corral: ' + error);
        } finally {
            loader.hide()
        }
    }

    const getCorralDetail = async (loading = true, corralId) => {
        const loader = loading ? $loading.show() : null;
        try {
            
            const resp = await Corral.getCorralDetail(corralId);
            if (resp.success == false) throw resp;

            corralModel.value = resp

            return resp

        } catch (error) {
            if (error.code == 401) {
                toast.warning('Tu sesión caducó por seguridad, ingresa nuevamente.')
                window.location.reload();
                return;
            }
            if (error.code == 404) {
                toast.warning(error?.error ? error.error : 'No se encontró el corral solicitado')
                router.push({ name: 'cattle-list' });
                return;
            }
            toast.error('Ha ocurrido un error al obtener el registro solicitado')
            throw new Error('Error al obtener el corral: ' + error);
        } finally {
            loading ? loader.hide() : null
        }
    }

    const getCorralCattleList = async (loading = true, corralId) => {
        const loader = loading ? $loading.show() : null;
        try {

            const resp = await Corral.getCorralCattleList(corralId);
            if (resp.success == false) throw resp;

            corralCattleList.value = resp.values
            corralCattlePagination.value.totalPages = resp.totalPages

            return resp
            
        } catch (error) {
            if (error.code == 401) {
                toast.warning('Tu sesión caducó por seguridad, ingresa nuevamente.')
                window.location.reload();
                return;
            }
            if (error.code == 404) {
                toast.warning(error?.error ? error.error : 'No se encontró el corral solicitado')
                router.push({ name: 'cattle-list' });
                return;
            }
            toast.error('Ha ocurrido un error al obtener el registro solicitado')
            throw new Error('Error al obtener el corral: ' + error);
        } finally {
            loading ? loader.hide() : null
        }
    }

    const updateCorral = async () => {
        const loader = $loading.show();
        try {
            if (!validateUpdateForm()) {
                toast.warning('Revisa los campos para continuar')
                return; // Si hay errores, no procedemos
            }
            
            const resp = await Corral.updateCorral(corralModel.value);
            if (resp.success == false) throw resp;
            corralModel.value = resp

            toast.success('Se ha actualizado el registro');
            router.push({ name: 'corrals-list'});
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
            toast.error('Ha ocurrido un error al actualizar el registro. Inténtalo de nuevo más tarde')
            throw new Error('Error al actualizar el corral: ' + error);
        } finally {
            loader.hide()
        }
    }



    return {
        corralPagination,
        corralCattlePagination,
        corralsList,
        corralModel,
        corralCattleList,
        errors,

        getAllCorralsNoPag,
        getAllCorrals,
        addCorral,
        getCorralDetail,
        getCorralCattleList,
        updateCorral
    }
}

export default useCorral;