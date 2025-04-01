import axios from '@/libs/apiAxios'

export default {

    async getAllCattle(page, perPage, searchQuery) { 
        try {
            
            const response = await axios.get('/cattle', {
                params: {
                    page: page,       // Número de página
                    per_page: perPage, // Elementos por página
                    search_query: searchQuery // Término de búsqueda (opcional)
                }
            });

            // Verifica si la respuesta es exitosa
            if (response.status === 200) {
                return {
                    code: 200,
                    success: true,
                    data: response.data.data
                };
            }

            // Si la respuesta no es exitosa, retorna un objeto de error
            return {
                success: false,
                code: 500,
                error: `Unexpected status code: ${response.status}`
            };

        } catch (error) {

            // Retorna un objeto de error
            return {
                code: error.status ?? 500,
                success: false,
                error: error.response ? error.response.data : error.message
            };

        }
    },

    async addCattle(cattleModel) {
        try {
            
            const response = await axios.post(`/cattle`, cattleModel);

            // Verifica si la respuesta es exitosa
            if (response.status === 201) {
                return {
                    code: 201,
                    success: true,
                    data: response.data.data
                };
            }
            // Si la respuesta no es exitosa, retorna un objeto de error
            return {
                success: false,
                code: 500,
                error: `Unexpected status code: ${response.status}`
            };

        } catch (error) {
            return {
                code: error.status ?? 500,
                success: false,
                error: error?.response?.data?.error?.details ? error?.response?.data?.error?.details : error.message
            };
        }
    },

}