import axios from '@/libs/authAxios';

export default {

    async createUser(userModel) {
        try {
            const response = await axios.post('/auth/register', userModel);
            // Verificar si el código de respuesta es 201
            // Comprobar si la respuesta es 201
            if (response.status === 201) {
                return {
                    success: true
                };
            } else {
                throw new Error(`Unexpected response status: ${response.status}`); // Para otros códigos
            }
        } catch (error) {
            // Verifica si el código de respuesta es 422 (errores de validación)
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.error.details;  // Extrae los detalles de los errores

                // Estructura personalizada para devolver los errores
                return {
                    success: false,
                    errors: validationErrors
                };
            } else {
                // Manejo de otros tipos de errores
                console.error('Error creating user:', error.response ? error.response.data : error.message);
                return null; // Retorna null si ocurre un error diferente
            }
        }
    },

    async resendVerificationEmail(email) {
        try {
            const response = await axios.post('/auth/email/verification-notification', {
                email: email
            });
            if (response.status === 202) {
                return {
                    success: true
                };
            } else {
                throw new Error(`Unexpected response status: ${response.status}`); // Para otros códigos
            }
        } catch (error) { 
            if (error.response && error.response.status === 429) {

                // Estructura personalizada para devolver los errores
                return {
                    success: false,
                    error: 'Has solicitado demasiadas veces. Inténtalo más tarde.'
                };
            }
            // Manejo de otros tipos de errores
            console.error('Error creating user:', error.response ? error.response.data : error.message);
            return null; // Retorna null si ocurre un error diferente
        }
    },

    async verifyUserEmail(id, token) {
        try {
            const response = await axios.get(`/auth/email/verify/${id}/${token}`);
            if (response.status === 200) {
                return {
                    success: true
                };
            } else {
                throw Error(`Unexpected response status: ${response.status}`); // Para otros códigos
            }
        } catch (error) {
            // Manejo de otros tipos de errores
            console.error('Error al verificar el correo:', error.response ? error.response.data : error.message);
            // Estructura personalizada para devolver los errores
            return {
                success: false,
                error: 'Error al verificar el correo.'
            };
        }
    },

    async forgotPassword(email) {
        try {
            
            const response = await axios.post('/auth/forgot-password', {
                email: email
            });
            if (response.status === 200) {
                return {
                    success: true
                };
            } else {
                throw new Error(`Unexpected response status: ${response.status}`); // Para otros códigos
            }

        } catch (error) {
            // Manejo de otros tipos de errores
            console.error('Error al enviar el correo:', error.response ? error.response.data : error.message);
            // Estructura personalizada para devolver los errores
            return {
                success: false,
                error: 'Error al enviar el correo.'
            };
        }
    },

    async resetPassword(token, email, password, password_confirmation) {
        try {
            
            const response = await axios.post('/auth/reset-password', {
                token,
                email,
                password,
                password_confirmation
            });
            if (response.status === 200) {
                return {
                    success: true
                };
            } else {
                throw new Error(`Unexpected response status: ${response.status}`); // Para otros códigos
            }

        } catch (error) {
            // Manejo de otros tipos de errores
            console.error('Error al enviar el correo:', error.response ? error.response.data : error.message);
            // Estructura personalizada para devolver los errores
            return {
                success: false,
                error: 'Este enlace de recuperación es inválido.'
            };
        }
    }

}