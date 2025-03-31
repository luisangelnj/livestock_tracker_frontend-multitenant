import MatchGameRepository from "@/data/MatchGameRepository";
import MatchGameIterator from "../iterators/MatchGameIterator";

export default {

    getLastTenRecords: async (setId) => {
        const response = await MatchGameRepository.getLastTenRecords(setId);
        return response?.data ? MatchGameIterator.ResponseToLastTenRecords(response.data) : null;
    },

    updatePersonalRecord: async (setId, ms) => {
        const response = await MatchGameRepository.updatePersonalRecord(setId, ms);
        return response;
    },

    getPersonalRecord: async (setId) => {
        const response = await MatchGameRepository.getPersonalRecord(setId);
        return response?.data ? response?.data?.milliseconds : null;
    }

}