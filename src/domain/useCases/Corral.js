import CorralRepository from "@/data/CorralRepository"
import CorralIterator from "@/domain/iterators/CorralIterator";

export default {

    getAllCorralsNoPag: async () => {
        const response = await CorralRepository.getAllCorralsNoPag();

        return (response.success && response.data) ? CorralIterator.ResponseToAllCorralsModelNoPag(response.data) : response
    },

    getAllCorrals: async (page, perPage, searchQuery) => {
        const response = await CorralRepository.getAllCorrals(page, perPage, searchQuery);

        return (response.success && response.data) ? CorralIterator.ResponseToAllCorralsModel(response.data) : response
    },

    addCorral: async (corralModel) => {
        const request = CorralIterator.RequestToAddCorral(corralModel);

        const response = await CorralRepository.addCorral(request);

        return (response.success && response.data) ? CorralIterator.ResponseToRegisteredCorralModel(response.data) : response
    },

    // getCattleDetail: async (cattleId) => {
    //     const response = await CattleRepository.getCattleDetail(cattleId);

    //     return (response.success && response.data) ? CattleIterator.ResponseTocorralModel(response.data) : response
    // },

    // updateCattle: async (corralModel) => {
    //     const request = await CattleIterator.RequestToUpdateCattle(corralModel);

    //     const response = await CattleRepository.updateCattle(request)

    //     return (response.success && response.data) ? response.data : response
    // }

}