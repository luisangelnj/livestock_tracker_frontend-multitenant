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
    },
    RequestToRegisterWeight: (data) => {
        const formatDate = (dateStr) => {
            if (!dateStr || typeof dateStr !== 'string') return '';
        
            const parts = dateStr.split('/');
            if (parts.length !== 3) return '';
        
            const [day, month, year] = parts;
            return `${year}-${month}-${day}`;
        };

        return {
            cattle_id: data.cattleId,
            weight: data.weight,
            register_date: formatDate(data.registerDate) 
        }
    }
}