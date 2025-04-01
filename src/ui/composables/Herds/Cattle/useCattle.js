import { ref } from "vue";
import { useLoading } from 'vue-loading-overlay'
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';

import Cattle from "@/domain/useCases/Cattle";

const useCattle = () => { 

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

    const cattleList = ref([]);
    const cattleModel = ref([{
        id: null,
        tagNameNumber: '',
        acquisitionDate: '',
        purchaseCost: '',
        initialWeight: '',
        sex: '',
        sexId: '',
        breed: '',
        breedId: '',
        initialNotes: '',
        registerDate: '',
        status: ''
    }]);
    const errors = ref({});

    // VALIDACIONES
    const validateAddForm = () => {
        const newErrors = {};
        // Validar que todos los campos estén llenos
        if (!cattleModel.value.tagNameNumber) {
            newErrors.tagNameNumber = 'El nombre o número de etiqueta es obligatorio.';
        }
        if (!cattleModel.value.acquisitionDate) {
            newErrors.acquisitionDate = 'La fecha de adquisición es obligatoria.';
        }
        if (!cattleModel.value.purchaseCost) {
            newErrors.purchaseCost = 'El costo de compra es obligatorio.';
        }
        if (!cattleModel.value.initialWeight) {
            newErrors.initialWeight = 'El peso inicial es obligatorio.';
        }
        if (!cattleModel.value.sex) {
            newErrors.sex = 'El sexo es obligatorio.';
        }
        if (!cattleModel.value.breed) {
            newErrors.breed = 'La raza es obligatoria.';
        }
        // if (!cattle.initialNotes) {
        //   newErrors.initialNotes = 'Las notas iniciales son obligatorias.';
        // }
        errors.value = newErrors; // Actualizar los errores

        // Si no hay errores, retornar true para proceder con el registro
        return Object.keys(newErrors).length === 0;
    }


    // FUNCIONES
    const getAllCattle = async (loading = true) => {
        const loader = loading ? $loading.show() : null;
        try {
            
            const resp = await Cattle.getAllCattle(page.value, perPage.value, searchQuery.value);
            if (resp.success == false) throw resp;

            cattleList.value = resp.values
            totalPages.value = resp.totalPages

            return resp

        } catch (error) {
            if (error.code == 401) {
                toast.warning('Tu sesión caducó por seguridad, ingresa nuevamente.')
                window.location.reload();
                return;
            }
            toast.error('Ha ocurrido un error al cargar el listado de ganado. Inténtalo de nuevo más tarde')
            throw new Error('Error al obtener listado de ganado: ' + error);
        } finally {
            loading ? loader.hide() : null
        }
    }

    const addCattle = async () => {
        const loader = $loading.show();
        try {
            if (!validateAddForm()) {
                toast.warning('Revisa los campos para continuar')
                return; // Si hay errores, no procedemos
            }

            const resp = await Cattle.addCattle(cattleModel.value);
            if (resp.success == false) throw resp;

            toast.success('Se ha registrado exitosamente');
            router.push({ name: 'cattle-add' });
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
            throw new Error('Error al registrar al el ganado: ' + error);
        } finally {
            loader.hide()
        }
    }



    return {
        page,
        totalPages,
        perPage,
        searchQuery,
        cattleList,
        cattleModel,
        errors,

        getAllCattle,
        addCattle
    }
}

export default useCattle;