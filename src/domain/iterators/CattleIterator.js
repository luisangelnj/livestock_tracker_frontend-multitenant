export default {
    ResponseToAllCattleModel: (data) => {
        return {
            values: data.data.map(item => {
                return {
                    id: item.id,
                    tagNameNumber: item.tag_name_number,
                    acquisitionDate: new Date( item.acquisition_date ).toLocaleDateString("es-MX"),
                    purchaseCost: item.purchase_cost,
                    initialWeight: item.initial_weight,
                    sex: item.sex.sex,
                    breed: item.breed.name,
                    initialNotes: item.initial_notes,
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
            purchase_cost: cattleModel.purchaseCost,
            initial_weight: cattleModel.initialWeight,
            sex_id: cattleModel.sexId, 
            breed_id: cattleModel.breedId,
            initial_notes : cattleModel.initialNotes
        }
    }
}