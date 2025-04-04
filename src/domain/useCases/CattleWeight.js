import CattleWeightRepository from "@/data/CattleWeightRepository"
import CattleWeightIterator from "@/domain/iterators/CattleWeightIterator";

export default {

    getAllWeightHistory: async(page, perPage, cattleId) => {
        const response = await CattleWeightRepository.getAllWeightHistory(page, perPage, cattleId)

        return (response.success && response.data) ? CattleWeightIterator.ResponseToAllWeightHistoryModel(response.data) : response
    },

    registerWeight: async (weightModel) => {
        const request = CattleWeightIterator.RequestToRegisterWeight(weightModel);

        const response = await CattleWeightRepository.registerWeight(request)

        return (response.success && response.data) ? response.data : response
    },

    deleteWeight: async (weightId) => {
        const response = await CattleWeightRepository.deleteWeight(weightId)

        return (response.success && response.data) ? response.data : response
    }

}