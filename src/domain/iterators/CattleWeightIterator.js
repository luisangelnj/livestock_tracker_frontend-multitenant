export default {
    ResponseToAllWeightHistoryModel: (data) => {
        return {
            values: data.data.map(item => {
                return {
                    id: item.id,
                    registerDate: new Date(item.register_date).toLocaleDateString("es-MX"),
                    weight: item.weight,
                    createdAt: new Date(item.created_at).toLocaleDateString("es-MX"),
                }
            }),
            totalPages: data.last_page
        }
    }
}