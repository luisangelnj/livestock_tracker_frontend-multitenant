export default {
    ResponseToAllCorralsModelNoPag: (data) => {
        return data.map(item => {
            return {
                id: item.id,
                name: item.name + ' - ' + item?.location,
            }
        })
    },
    ResponseToAllCorralsModel: (data) => {
        return {
            values: data.data.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    location: item.location ?? '-',
                    capacity: item.capacity ?? 'Sin límite',
                    currentOccupancy: item.cattle_count ?? '0',
                    createdAt: new Date( item.created_at ).toLocaleDateString("es-MX"),
                    status: item.status
                }
            }),
            totalPages: data.last_page
        }
    },
    RequestToAddCorral: (corralModel) => {
        return {
            name: corralModel.name,
            location: corralModel.location,
            capacity: corralModel.capacity,
            description: corralModel.description,
        }
    },
    // RequestToUpdateCattle: (cattleModel) => {
    //     return {
    //         id: cattleModel.id,
    //         tag_name_number: cattleModel.tagNameNumber,
    //         acquisition_date: cattleModel.acquisitionDate,
    //         birth_date: cattleModel.birthDate,
    //         purchase_cost: cattleModel.purchaseCost,
    //         initial_weight: cattleModel.initialWeight,
    //         sex_id: cattleModel.sexId, 
    //         breed_id: cattleModel.breedId,
    //         status_id: cattleModel.statusId,
    //         initial_notes : cattleModel.initialNotes
    //     }
    // },
    ResponseToRegisteredCorralModel: (response) => {
        return {
            id: response.id
        }
    },
    // ResponseToCattleModel: (data) => {
    //     return {
    //         id: data.id,
    //         tagNameNumber: data.tag_name_number,
    //         acquisitionDate: data.acquisition_date ? data.acquisition_date.split('-').reverse().join('/') : '',
    //         birthDate: data.birth_date ? data.birth_date.split('-').reverse().join('/') : '',
    //         purchaseCost: data.purchase_cost ?? '',
    //         initialWeight: data.initial_weight ?? '',
    //         initialNotes: data.initial_notes ?? '',
    //         sexId: data?.sex?.id ?? '',
    //         sex: data?.sex?.name ?? '',
    //         breedId: data?.breed?.id ?? '',
    //         breed: data?.breed?.name ?? '',
    //         statusId: data?.status?.id ?? '',
    //         status: data.status?.name ?? '',
    //         registerDate: new Date( data.created_at ).toLocaleDateString("es-MX"),
    //         updatedDate: new Date( data.updated_at ).toLocaleDateString("es-MX")
    //     }
    // },
}