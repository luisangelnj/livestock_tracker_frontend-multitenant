export default {
    ResponseToAllWeightHistoryModel: (data) => {
        return {
            values: data.data.map(item => {
                return {
                    id: item.id,
                    registerDate: item.register_date ? item.register_date.split('-').reverse().join('/') : '-',
                    weight: item.weight,
                    createdAt: new Date(item.created_at).toLocaleDateString("es-MX"),
                }
            }),
            totalPages: data.last_page
        }
    }
}