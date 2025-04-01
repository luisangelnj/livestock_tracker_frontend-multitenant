import BreedRepository from "@/data/BreedRepository"
import BreedIterator from "@/domain/iterators/BreedIterator";

export default {
    getAllBreeds: async (page, perPage, searchQuery) => {
        const response = await BreedRepository.getAllBreeds(page, perPage, searchQuery);

        return (response.success && response.data) ? BreedIterator.ResponseToAllBreedsModel(response.data) : response
    },
    getAllBreedsNoPag: async () => {
        const response = await BreedRepository.getAllBreedsNoPag();

        return (response.success && response.data) ? BreedIterator.ResponseToAllBreedsModelNoPag(response.data) : response
    },
}