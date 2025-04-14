import FoodTypeRepository from "@/data/FoodTypeRepository"
import FoodTypeIterator from "@/domain/iterators/FoodTypeIterator"

export default {

    getAllFoodTypesNoPag: async () => {
        const response = await FoodTypeRepository.getAllFoodTypesNoPag();

        return (response.success && response.data) ? FoodTypeIterator.ResponseToAllFoodTypeListNoPag(response.data) : response
    }

}