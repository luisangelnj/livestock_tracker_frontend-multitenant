import CattleRepository from "@/data/CattleRepository"
import CattleIterator from "@/domain/iterators/CattleIterator";

export default {

    getAllCattle: async (page, perPage, searchQuery) => {
        const response = await CattleRepository.getAllCattle(page, perPage, searchQuery);

        return (response.success && response.data) ? CattleIterator.ResponseToAllCattleModel(response.data) : response
    },

    addCattle: async (cattleModel) => {
        const request = CattleIterator.RequestToAddCattle(cattleModel);

        const response = await CattleRepository.addCattle(request);

        return (response.success && response.data) ? CattleIterator.ResponseToRegisteredCattleModel(response.data) : response
    },

    getCattleDetail: async (cattleId) => {
        const response = await CattleRepository.getCattleDetail(cattleId);

        return (response.success && response.data) ? CattleIterator.ResponseToCattleModel(response.data) : response
    },

}