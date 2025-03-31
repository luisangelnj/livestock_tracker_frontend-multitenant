import axios from '@/libs/apiAxios'

export default {

    async getMySets() { 
        try {
            const response = await axios.get('/my-library/sets/my-sets');
            if (response.status === 200) {
                
                return {
                    success: true,
                    data: response.data.data
                }
            }
            return;
        } catch (error) {
            // Manejo de otros tipos de errores
            console.error('Error getting last draft:', error.response ? error.response.data : error.message);
            return null; // Retorna null si ocurre un error diferente
        }
    }

}