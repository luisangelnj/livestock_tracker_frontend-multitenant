export default {


    ResponseToToggleFavoriteTerm: (term) => {
        return {
            id: term.term_id,
            isFavorite: term.is_favorite
        }
    }
}