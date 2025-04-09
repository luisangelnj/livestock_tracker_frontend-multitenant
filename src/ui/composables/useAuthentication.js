import { ref } from 'vue';
import { useToast } from "vue-toastification";
import Authentication from '@/domain/useCases/Authentication'
import { useAuthStore } from '@/stores/authStore.js';
import { useRouter } from 'vue-router';
import { useLoading } from 'vue-loading-overlay'
import { useSidebarStore } from '@/stores/sidebar'

const useAuthentication = () => {

    const router = useRouter()
    const toast = useToast({
        pauseOnHover: false,
        timeout: 5000,
        closeOnClick: false
    });
    const $loading = useLoading({
        color: '#007BFF'
    });
    const authStore = useAuthStore();
    const sidebarStore = useSidebarStore()

    // VARIABLES
    const userModel = ref({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const isEmailVerified = ref(null);

    const isForgotPasswordEmailSent = ref(false);

    const errors = ref({});

    // VALIDACIONES
    const validateRegisterForm = () => {
        const newErrors = {};

        // Validar que todos los campos estén llenos
        if (!userModel.value.first_name) {
            newErrors.first_name = 'El nombre es obligatorio.';
        }
        if (!userModel.value.last_name) {
            newErrors.last_name = 'El apellido es obligatorio.';
        }
        if (!userModel.value.email) {
            newErrors.email = 'El correo es obligatorio.';
        } else {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(userModel.value.email)) {
                newErrors.email = 'Ingrese un correo electrónico válido.';
            }
        }
        if (!userModel.value.password) {
            newErrors.password = 'La contraseña es obligatoria.';
        } else {
            if (userModel.value.password.length < 8) {
                newErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
            }
        }
        if (userModel.value.password !== userModel.value.password_confirmation) {
            newErrors.password_confirmation = 'Las contraseñas no coinciden.';
        }

        errors.value = newErrors; // Actualizar los errores

        // Si no hay errores, retornar true para proceder con el registro
        return Object.keys(newErrors).length === 0;
    };
    const validateLoginForm = () => { 
        const newErrors = {};
        if (!userModel.value.email) {
            newErrors.email = 'Ingresa tu correo electrónico.';
        } else {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(userModel.value.email)) {
                newErrors.email = 'Ingrese un correo electrónico válido.';
            }
        }
        if (!userModel.value.password) {
            newErrors.password = 'Ingresa tu contraseña.';
        } else {
            if (userModel.value.password.length < 8) {
                newErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
            }
        }
        errors.value = newErrors; // Actualizar los errores

        // Si no hay errores, retornar true para proceder con el registro
        return Object.keys(newErrors).length === 0;
    }
    const validateForgotPasswordForm = () => {
        const newErrors = {};
        if (!userModel.value.email) {
            newErrors.email = 'Ingresa tu correo electrónico.';
        } else {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(userModel.value.email)) {
                newErrors.email = 'Ingrese un correo electrónico válido.';
            }
        }
        errors.value = newErrors; // Actualizar los errores

        // Si no hay errores, retornar true para proceder con el registro
        return Object.keys(newErrors).length === 0;
    }
    const validateResetPasswordForm = () => {
        const newErrors = {};
        if (!userModel.value.password) {
            newErrors.password = 'La contraseña es obligatoria.';
        } else {
            if (userModel.value.password.length < 8) {
                newErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
            }
        }
        if (userModel.value.password !== userModel.value.password_confirmation) {
            newErrors.password_confirmation = 'Las contraseñas no coinciden.';
        }

        errors.value = newErrors; // Actualizar los errores

        // Si no hay errores, retornar true para proceder con el registro
        return Object.keys(newErrors).length === 0;
    }

    // Función para asignar errores a los campos
    const setValidationErrors = (backendErrors) => {
        // Resetear los errores anteriores
        errors.value = {};

        // Iterar sobre los errores devueltos por el backend
        for (const field in backendErrors) {
            if (backendErrors.hasOwnProperty(field)) {
                // Tomamos solo el primer mensaje de error del array (puedes mostrar más si es necesario)
                errors.value[field] = backendErrors[field][0];
            }
        }
    };


    // FUNCIONES
    const registerUser = async () => {
        const loader = $loading.show();
        try {

            if (!validateRegisterForm()) {
                toast.warning('Revisa los campos para continuar')
                return; // Si hay errores, no procedemos
            }

            const result = await Authentication.registerUser(userModel.value);

            if (!result) {
                throw Error("Error al registrar el usuario");
            }

            if (result && result.success === false) {
                // Mostrar los errores de validación en la vista
                setValidationErrors(result.errors);
                toast.warning('Revisa los campos para continuar')
                return; // No continuar con el registro si hay errores
            }

            if (result && result.success === true) {
                toast.success('¡Genial! Verifica tu correo electrónico para continuar');
                router.replace({ name: 'verify-notice', query: { email: userModel.value.email } });
                return;
            }

            throw Error("Error al registrar el usuario");
            
        } catch (error) {
            toast.error('Ha ocurrido un error. Inténtalo de nuevo más tarde')
            throw new Error('Error al registrar el usuario');
        } finally {
            loader.hide()
        }
    }

    const resendVerificationEmail = async (email) => {
        const loader = $loading.show();
        try {
            const result = await Authentication.resendVerificationEmail(email);
            if (!result) {
                throw Error("Error al reenviar el correo de verificación");
            }
            if (result && result.success === false) {
                toast.error(result.error ? result.error : 'Ha ocurrido un error. Inténtalo de nuevo más tarde');
                return;
            }
            if (result && result.success === true) {
                toast.success('¡Se ha reenviado el correo de verificación!');
                return;
            }
            throw Error("Error al reenviar el correo de verificación");
        } catch (error) {
            toast.error('Ha ocurrido un error. Inténtalo de nuevo más tarde')
            throw new Error('Error al reenviar el correo de verificación');
        } finally {
            loader.hide()
        }
    }

    const verifyUserEmail = async (id, token) => { 
        const loader = $loading.show();
        try {
            const result = await Authentication.verifyUserEmail(id, token);

            if (!result) {
                throw Error("Error con el enlace de verificación");
            }

            if (result && result.success === false) { 
                toast.error(result.error ? result.error : 'Ha ocurrido un error. Inténtalo de nuevo más tarde');
                isEmailVerified.value = false;
                return;
            }

            if (result && result.success === true) {
                toast.success('¡Se ha verificado el correo electrónico!');
                isEmailVerified.value = true;
                return;
            }

        } catch (error) {
            toast.error('Ha ocurrido un error. Inténtalo de nuevo más tarde')
            throw new Error('Error al verificar el correo electrónico');
        } finally {
            loader.hide()
        }
    }

    const loginUser = async (email, password) => {
        const loader = $loading.show();
        try {

            if (!validateLoginForm()) {
                toast.warning('Revisa los campos para continuar')
                return; // Si hay errores, no procedemos
            }

            const result = await authStore.loginUser(email, password);

            if (!result) {
                throw Error("Error al iniciar sesión. No se pudo autenticar al usuario");
            }
            if (result && result.success === false) {
                if (result.code === 403) {
                    toast.warning(result.error ? result.error : 'Debes verificar tu correo electrónico para iniciar sesión');
                    router.push({ name:'verify-notice', query: { email: email } });
                    return;
                } if (result.code === 401) {
                    toast.error(result.error ? result.error : 'Usuario o contraseña incorrectas.');
                    return;
                } else {
                    toast.error(result.error ? result.error : 'Ha ocurrido un error. Inténtalo de nuevo más tarde');
                    return;
                }
            }
            if (result && result.success === true) {
                sidebarStore.page = 'Dashboard'
                sidebarStore.selected = ''
                router.push({ name: 'dashboard' });
                toast.success('¡Iniciaste sesión, bienvenido!');
                return;
            }
            throw Error("Error al iniciar sesión");
        } catch (error) {
            toast.error('Ha ocurrido un error. Inténtalo de nuevo más tarde')
            throw new Error('Error al iniciar sesión');
        } finally {
            loader.hide()
        }
    }

    const logoutUser = async () => { 
        const loader = $loading.show();
        try {
            const result = await authStore.logoutUser();
            if (!result) {
                throw Error("Error al cerrar sesión");
            }
            sidebarStore.page = ''
            sidebarStore.selected = ''
            if (result && result.success === true) {
                router.push({ name: 'login' });
                toast.success('¡Has cerrado sesión correctamente!');
                return;
            }
            throw Error("Error al cerrar sesión");
        } catch (error) {
            toast.error('Ha ocurrido un error. Inténtalo de nuevo más tarde')
            throw new Error('Error al cerrar sesión');
        } finally {
            loader.hide()
        }
    }

    const forgotPassword = async (email) => {
        const loader = $loading.show();
        try {
            if (!validateForgotPasswordForm()) {
                toast.warning('Revisa los campos para continuar')
                return; // Si hay errores, no procedemos
            }

            const result = await Authentication.forgotPassword(email);
            if (!result) {
                throw Error("Error al solicitar recuperación de contraseña");
            }
            if (result && result.success === false) {
                toast.error(result.error ? result.error : 'Ha ocurrido un error. Inténtalo de nuevo más tarde');
                return;
            }
            if (result && result.success === true) {
                toast.success('¡Se han enviado las instrucciones al correo solicitado!');
                isForgotPasswordEmailSent.value = true
                return;
            }
            throw Error("Error al enviar el correo de recuperación de contraseña");
        } catch (error) {
            toast.error('Ha ocurrido un error. Inténtalo de nuevo más tarde')
            throw new Error('Error al enviar el correo de recuperación de contraseña');
        } finally {
            loader.hide()
        }
    }

    const resetPassword = async (token, email, password, password_confirmation) => {
        const loader = $loading.show();
        try {
            if (!validateResetPasswordForm()) {
                toast.warning('Revisa los campos para continuar')
                return; // Si hay errores, no procedemos
            }

            const result = await Authentication.resetPassword(token, email, password, password_confirmation);
            if (!result) {
                throw Error("Error al restablecer la nueva contraseña");
            }
            if (result && result.success === false) {
                toast.error(result.error ? result.error : 'Ha ocurrido un error. Inténtalo de nuevo más tarde');
                return;
            }
            if (result && result.success === true) {
                toast.success('¡Se restableció tu contraseña! Inicia sesión');
                router.push({ name: 'login' });
                return;
            }
            throw Error("Error al restablecer la nueva contraseña");
        } catch (error) {
            toast.error('Ha ocurrido un error. Inténtalo de nuevo más tarde')
            throw new Error('Error al restablecer la nueva contraseña');
        } finally {
            loader.hide()
        }
    }

    return {
        toast,
        userModel,
        errors,
        isEmailVerified,
        isForgotPasswordEmailSent,
        registerUser,
        resendVerificationEmail,
        verifyUserEmail,
        loginUser,
        logoutUser,
        forgotPassword,
        resetPassword
    }

}

export default useAuthentication;