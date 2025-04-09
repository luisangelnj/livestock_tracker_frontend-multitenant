export default {
    ResponseToAllCorralsModelNoPag: (data) => {
        return data.map(item => {
            return {
                id: item.id,
                name: item.name + (item?.location ? (' - ' + item.location) : ''),
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
                    currentOccupancy: item?.cattle_count,
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
    RequestToUpdateCorral: (corralModel) => {
        return {
            id: corralModel.id,
            name: corralModel.name,
            location: corralModel.location,
            capacity: corralModel.capacity,
            description: corralModel.description,
        }
    },
    ResponseToRegisteredCorralModel: (response) => {
        return {
            id: response.id
        }
    },
    ResponseToCorralModel: (data) => {
        return {
            id: data.id,
            name: data.name,
            location: data.location,
            capacity: data.capacity,
            currentOccupancy: data.cattle_count,
            description: data.description
        }
    },
    ResponseToCorralCattleList: (data) => {
        return {
            values: data.data.map(item => {
                return {
                    id: item.id,
                    tagNameNumber: item.tag_name_number,
                    acquisitionDate: item.acquisition_date ? item.acquisition_date.split('-').reverse().join('/') : '-',
                    sex: item?.sex?.name ?? '-',
                    breed: item?.breed?.name ?? '-',
                    corral: item?.corral?.name ?? '-',
                    registerDate: new Date( item.created_at ).toLocaleDateString("es-MX"),
                    status: item.status.name
                }
            }),
            totalPages: data.last_page
        }
    }
}