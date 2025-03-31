import axios from '@/libs/apiAxios'

export default {

    async toggleFavorite(termId) {
        try {

            const response = await axios.post('/my-library/sets/terms/toggle-favorite?id=' + termId);

            if (response.status === 200) {
                return {
                    success: true,
                    data: response.data.data
                }
            }

            return null;

        } catch (error) {

            // Manejo de otros tipos de errores
            console.error('Error on toggle favorite term:', error.response ? error.response.data : error.message);
            return null; // Retorna null si ocurre un error diferente
        }
    },

    async updateTerm(termEditModel) {
        try {

            const response = await axios.post('/my-library/sets/terms/update', termEditModel)

            if (response.status === 200) {
                return {
                    success: true,
                    data: response.data.data
                }
            }

            return null;

        } catch (error) {

            // Verifica si el código de respuesta es explícito (errores de validación)
            if (error.response && error.response.status === 403) {
                const errorMessage = error?.response?.data?.error?.details;  // Extrae los detalles de los errores

                // Estructura personalizada para devolver los errores
                return {
                    success: false,
                    code: 403,
                    error: errorMessage
                };
            }

            // Manejo de otros tipos de errores
            console.error('Error on toggle favorite term:', error.response ? error.response.data : error.message);
            return null; // Retorna null si ocurre un error diferente
        }
    }

}