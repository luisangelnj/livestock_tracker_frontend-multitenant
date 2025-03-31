// src/stores/authStore.js
import { defineStore } from 'pinia';
import authAxios from '@/libs/authAxios';
import apiAxios from '@/libs/apiAxios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: {
            id: null,
            first_name: null,
            last_name: null,
            email: null,
            roles: [
                {
                    id: null,
                    name: null,
                }
            ]

        },
        is_authenticated: null,
        error: null,
    }),
    getters: {
        // isPro: (state) => {
        //     return state.user?.roles.some(role => role.name === 'pro');
        // }
    },

    actions: {
        // Solicitar el token CSRF desde Laravel
        async getCsrfToken() {
            await authAxios.get('/sanctum/csrf-cookie');
        },

        async loginUser(email, password) {
            try {
                // Obtener el token CSRF antes de enviar la solicitud de inicio de sesión
                await this.getCsrfToken();
                const response = await authAxios.post('auth/login', {
                    email: email,
                    password: password
                });
                
                if (response.status === 200) {
                    this.user = response.data.data;
                    this.is_authenticated = true;
                    return {
                        success: true
                    };
                } else {
                    this.error = 'Credenciales incorrectas o problemas con el servidor';
                    throw Error(`Unexpected response status: ${response.status}`); // Para otros códigos
                }

            } catch (error) {
                this.logoutUser();  // Si falla, el usuario no está autenticado
                if (error.response && error.response.data.code === 403) {

                    // Estructura personalizada para devolver los errores
                    return {
                        success: false,
                        code: 403,
                        error: 'Debes verificar tu correo antes de iniciar sesión.'
                    };
                }
                // Respuesta credenciales incorrectas
                if (error.response && error.response.data.code === 401) {

                    // Estructura personalizada para devolver los errores
                    return {
                        success: false,
                        code: 401,
                        error: 'Usuario o contraseña incorrectas.'
                    };
                }
                if (error.response && error.response.data.code === 422) {

                    // Estructura personalizada para devolver los errores
                    return {
                        success: false,
                        code: 422,
                        error: 'Correo o contraseña inválidas'
                    };
                }
                // Manejo de otros tipos de errores
                // console.error('Error al iniciar sesión:', error.response ? error.response.data : error.message);
                // Estructura personalizada para devolver los errores
                return {
                    success: false,
                    error: 'Error al iniciar sesión.'
                };
            }
        },

        async logoutUser() {
            try {
                const response = await authAxios.post('auth/logout');
                // Limpiar el estado del usuario
                this.user = null;
                this.is_authenticated = false;
                if (response.status === 200) {
                    return {
                        success: true
                    };
                } else {
                    throw Error(`Unexpected response status: ${response.status}`); // Para otros códigos
                }
            } catch (error) {
                // Limpiar el estado del usuario
                this.user = null;
                this.is_authenticated = false;
                // Manejo de otros tipos de errores
                console.error('Error al cerrar sesión:', error.response? error.response.data : error.message);
                // Estructura personalizada para devolver los errores
                return {
                    success: false,
                    error: 'Error al cerrar sesión.'
                };
            }
        },

        // Obtener los datos del usuario autenticado
        async fetchUser() {
            try {

                const response = await apiAxios.get('profile/me');
                
                this.user = response.data.data;
                this.is_authenticated = true;
                
            } catch (error) {
                // console.error('Error fetching user:', error);
                this.logoutUser();  // Si falla, el usuario no está autenticado
                if (error.response && error?.response?.status === 401) {
                    return {
                        success: false,
                        code: 401,
                        error: 'Unauthorized attempt.'
                    };
                }
                if (error.response && error.response.status === 419) {
                    window.location.reload();
                    return;
                }
                throw error;
            }
        }
    }
});
