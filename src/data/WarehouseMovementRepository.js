import axios from '@/libs/apiAxios'

export default {
    
    async registerWarehouseEntryMovement(warehouseMovementModel) {
        try {

            const response = await axios.post(`/warehouse-movements`, warehouseMovementModel);

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
    }

}