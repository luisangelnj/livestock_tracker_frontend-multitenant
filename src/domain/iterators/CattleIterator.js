export default {
    ResponseToAllCattleModel: (data) => {
        return {
            values: data.data.map(item => {
                return {
                    id: item.id,
                    tagNameNumber: item.tag_name_number,
                    acquisitionDate: item.acquisition_date ? new Date( item.acquisition_date ).toLocaleDateString("es-MX") : '-',
                    sex: item?.sex?.name ?? '-',
                    breed: item?.breed?.name ?? '-',
                    registerDate: new Date( item.created_at ).toLocaleDateString("es-MX"),
                    status: item.status
                }
            }),
            totalPages: data.last_page
        }
    },
    RequestToAddCattle: (cattleModel) => {
        return {
            tag_name_number: cattleModel.tagNameNumber,
            acquisition_date: cattleModel.acquisitionDate,
            birth_date: cattleModel.birthDate,
            purchase_cost: cattleModel.purchaseCost,
            initial_weight: cattleModel.initialWeight,
            sex_id: cattleModel.sexId, 
            breed_id: cattleModel.breedId,
            initial_notes : cattleModel.initialNotes
        }
    },
    ResponseToRegisteredCattleModel: (response) => {
        return {
            id: response.id
        }
    },
    ResponseToCattleModel: (data) => {
        return {
            id: data.id,
            tagNameNumber: data.tag_name_number,
            acquisitionDate: data.acquisition_date ? new Date(data.acquisition_date).toLocaleDateString("es-MX") : '-',
            birthDate: data.birth_date ? new Date(data.birth_date).toLocaleDateString("es-MX") : '-',
            purchaseCost: data.purchase_cost ?? '-',
            initialWeight: data.initial_weight ?? '-',
            initialNotes: data.initial_notes ?? '-',
            sex: data?.sex?.name ?? '-',
            breed: data?.breed?.name ?? '-',
            status: data.status,
            registerDate: new Date( data.created_at ).toLocaleDateString("es-MX"),
            updatedDate: new Date( data.updated_at ).toLocaleDateString("es-MX")
        }
    },
}