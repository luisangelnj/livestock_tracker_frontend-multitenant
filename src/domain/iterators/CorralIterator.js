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
                    currentOccupancy: (item?.cattle_count ?? '0') + ' de ' + (item?.capacity ?? 'Sin límite'),
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
            description: data.description
        }
    },
}