export default {
    ResponseToAllSexesModelNoPag: (data) => {
        return data.map(item => {
            return {
                id: item.id,
                name: item.name,
                registerDate: new Date( item.created_at ).toLocaleDateString("es-MX"),
            }
        })
    },

}