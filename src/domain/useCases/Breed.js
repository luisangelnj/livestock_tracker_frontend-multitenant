import BreedRepository from "@/data/BreedRepository"
import BreedIterator from "@/domain/iterators/BreedIterator";

export default {

    getAllBreedsNoPag: async () => {
        const response = await BreedRepository.getAllBreedsNoPag();

        return (response.success && response.data) ? BreedIterator.ResponseToAllBreedsModelNoPag(response.data) : response
    },
}