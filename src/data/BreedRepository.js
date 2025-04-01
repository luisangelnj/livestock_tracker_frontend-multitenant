import axios from '@/libs/apiAxios'

export default {

    async getAllBreedsNoPag() {
        try {

            const response = await axios.get('/catalogs/breed', {
                params: {
                    paginated: false,
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
    }

}