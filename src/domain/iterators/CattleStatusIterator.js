export default {
    ResponseToAllStatusModelNoPag: (data) => {
        return data.map(item => {
            return {
                id: item.id,
                code: item.code,
                name: item.name,
                registerDate: new Date( item.created_at ).toLocaleDateString("es-MX"),
            }
        })
    },

}