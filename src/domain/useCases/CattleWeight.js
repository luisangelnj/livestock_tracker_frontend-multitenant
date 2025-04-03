import CattleWeightRepository from "@/data/CattleWeightRepository"
import CattleWeightIterator from "@/domain/iterators/CattleWeightIterator";

export default {

    getAllWeightHistory: async(page, perPage, cattleId) => {
        const response = await CattleWeightRepository.getAllWeightHistory(page, perPage, cattleId)

        return (response.success && response.data) ? CattleWeightIterator.ResponseToAllWeightHistoryModel(response.data) : response
    }

}