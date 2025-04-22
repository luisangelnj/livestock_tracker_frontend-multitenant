import WarehouseMovementRepository from "@/data/WarehouseMovementRepository"
import WarehouseMovementIterator from "@/domain/iterators/WarehouseMovementIterator"

export default {
    
    registerWarehouseEntryMovement: async (warehouseMovementModel) => {
        const request = WarehouseMovementIterator.RequestToRegisterEntryMovement(warehouseMovementModel)

        const response = await WarehouseMovementRepository.registerWarehouseEntryMovement(request);
        
        return (response.succes && response.data) ? WarehouseMovementIterator.ResponseToRegisteredEntryMovement(response.data) : response
    }

}