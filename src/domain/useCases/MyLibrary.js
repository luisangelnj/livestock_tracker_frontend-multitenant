import MyLibraryRepository from '@/data/MyLibraryRepository'
import MyLibraryIterator from '../iterators/MyLibraryIterator';

export default {

    getMySets: async () => {
        const response = await MyLibraryRepository.getMySets();
        
        return response?.data ? MyLibraryIterator.ResponseToMySetsModel(response.data) : null;
    },

}