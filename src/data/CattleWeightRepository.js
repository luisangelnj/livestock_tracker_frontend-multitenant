import axios from '@/libs/apiAxios'

export default {

    async getAllWeightHistory(page, perPage, cattleId) {
        try {
            const response = await axios.get('/cattle-weight-history', {
                params: {
                    page: page,       // Número de página
                    per_page: perPage, // Elementos por página
                    cattle_id: cattleId, // Elementos por página
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

    async registerWeight(weightModel) {
        try {
            
            const response = await axios.post(`/cattle-weight-history`, weightModel);

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

    async deleteWeight(weightId) {
        try {
            
            const response = await axios.delete(`/cattle-weight-history/${weightId}`);

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
            return {
                code: error.status ?? 500,
                success: false,
                error: error?.response?.data?.error?.details ? error?.response?.data?.error?.details : error.message
            };
        }
    },

}