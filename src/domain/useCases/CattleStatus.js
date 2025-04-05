import CattleStatusRepository from "@/data/CattleStatusRepository"
import CattleStatusIterator from "@/domain/iterators/CattleStatusIterator";

export default {

    getAllStatusNoPag: async () => {
        const response = await CattleStatusRepository.getAllStatusNoPag();

        return (response.success && response.data) ? CattleStatusIterator.ResponseToAllStatusModelNoPag(response.data) : response
    },
}