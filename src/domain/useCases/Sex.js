import SexRepository from "@/data/SexRepository"
import SexIterator from "@/domain/iterators/SexIterator";

export default {

    getAllSexesNoPag: async () => {
        const response = await SexRepository.getAllSexesNoPag();

        return (response.success && response.data) ? SexIterator.ResponseToAllSexesModelNoPag(response.data) : response
    },
}