import WarehouseStockRepository from "@/data/WarehouseStockRepository"
import WarehouseStockIterator from "@/domain/iterators/WarehouseStockIterator"

export default {
    
    getAllWarehouseStock: async (page, perPage, searchQuery) => {
        const response = await WarehouseStockRepository.getAllWarehouseStock(page, perPage, searchQuery)

        return (response.success && response.data) ? WarehouseStockIterator.ResponseToAllWarehouseStockList(response.data) : response
    }

}