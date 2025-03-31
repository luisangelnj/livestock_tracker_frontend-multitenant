
export default {
    ResponseToLastDraf: (set) => {
        return {
            id: set.id,
            userId: set.user_id,
            name: set?.name ?? '',
            description: set.description ?? '',
            status: set.status,
            termsSaved: set?.terms_count ?? 0,
            isSaved: set.created_at ? true : false,
            isPublic: set.is_public ? true : false,
            terms: set?.terms
                ? set.terms.map((term) => ({
                    id: term.id,
                    setId: term.set_id,
                    term: term.term,
                    definition: term.definition,
                    imageId: term.image_id,
                    imageUrl: term.image_url,
                    order: term.order,
                }))
                : [] // Retorna un array vacío si set.terms es undefined o no es un array
        }
    },
    RequestToAutoSave: (setModel) => {
        return {
            id: setModel.id,
            name: setModel.name,
            description: setModel.description,
            status: setModel.status,
            terms: setModel.terms.map((term) => ({
                id: term?.id ?? '',
                set_id: term.setId ?? '',
                term: term.term,
                definition: term.definition,
                image_id: term.imageId ?? '',
                image_file: term.imageFile ?? '',
                header_number: term.headerNumber
            }))
        }
    },
    ResponseToSetDetail: (set) => {
        return {
            id: set.id,
            userId: set?.user_id,
            name: set?.name ?? '',
            description: set.description ?? '',
            status: set.status,
            createdAt: new Date(set.created_at).toLocaleDateString('es-ES'),
            user: {
                firstName: set?.user?.first_name,
                lastName: set?.user?.last_name,
                email: set?.user?.email
            },
            terms: set.terms.map((term) => ({
                id: term.id,
                setId: term.set_id,
                isFavorite : term.is_favorite ? true : false,
                term: term.term,
                definition: term.definition,
                imageId: term.image_id,
                imageUrl: term.image_url,
                order: term.order,
            }))
        }
    },
    ResponseToLastPublicSets: (sets) => {
        return sets.map((set) => {

            return {
                id: set.id,
                name: set.name,
                termsCount: set.terms_count,
                user: {
                    firstName: set.user.first_name,
                    lastName: set.user.last_name
                }
            }

        });
    }
}