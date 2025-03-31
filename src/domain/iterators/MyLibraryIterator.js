export default {

    ResponseToMySetsModel: (response) => {
        return {

            drafts: response.drafts.map((draft) => {
                return {
                    id: draft.id,
                    name: draft.name,
                    description: draft.description,
                    status: draft.status,
                    termsCount: draft.terms_count,
                    createdAt: draft.created_at,
                    updatedAt: draft.updated_at,
                    userId: draft.user_id,
                    user: {
                        id: draft.user.id,
                        firstName: draft.user.first_name,
                        lastName: draft.user.last_name,
                        email: draft.user.email
                    }
                }
            }),
            published: response.published.map((published) => {
                return {
                    id: published.id,
                    name: published.name,
                    description: published.description,
                    status: published.status,
                    termsCount: published.terms_count,
                    createdAt: published.created_at,
                    updatedAt: published.updated_at,
                    userId: published.user_id,
                    user: {
                        id: published.user.id,
                        firstName: published.user.first_name,
                        lastName: published.user.last_name,
                        email: published.user.email
                    }
                }
            })

        }
    }

}