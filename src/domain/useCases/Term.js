import TermRepository from "@/data/TermRepository";
import TermIterator from "@/domain/iterators/TermIterator";

export default {

    toggleFavorite: async (termId) => {
        const response = await TermRepository.toggleFavorite(termId);
        return response?.data ? TermIterator.ResponseToToggleFavoriteTerm(response.data) : null;
    },

    updateTerm: async (termEditModel) => {
        const response = await TermRepository.updateTerm(termEditModel);
        return response
    }


}