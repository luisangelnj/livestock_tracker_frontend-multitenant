import SetRepository from '@/data/SetRepository'
import SetIterator from '@/domain/iterators/SetIterator';

export default {

    lastDraft: async (setId) => {
        const response = await SetRepository.lastDraft(setId);
        return response?.data ? SetIterator.ResponseToLastDraf(response.data) : null;
    },

    discardDraft: async (setId) => { 
        const response = await SetRepository.discardDraft(setId);
        return response;
    },

    autoSaveUnit: async (setModel) => {        
        const response = await SetRepository.autoSaveUnit(setModel);
        return response;
    },

    publishUnit: async (setId) => {
        const response = await SetRepository.publishUnit(setId);
        return response;
    },

    getSetDetail: async (setId) => {
        const response = await SetRepository.getSetDetail(setId);
        return response?.data ? SetIterator.ResponseToSetDetail(response.data) : null;
    },

    getPublicSetDetail: async (setId) => {
        const response = await SetRepository.getPublicSetDetail(setId);
        console.log(response);
        
        return response?.data ? SetIterator.ResponseToSetDetail(response.data) : null;
    },

    deleteSet: async (setId) => {
        const response = await SetRepository.deleteSet(setId);
        return response;
    },

    autoSaveEditUnit: async (setModel) => {
        const response = await SetRepository.autoSaveEditUnit(setModel);
        return response;
    },

    getLastPublicSets: async () => {
        const response = await SetRepository.getLastPublicSets();
        return response?.data ? SetIterator.ResponseToLastPublicSets(response.data) : null;
    }

}