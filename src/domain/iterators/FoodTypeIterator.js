export default {
    ResponseToAllFoodTypeListNoPag: (data) => {
        return data.map(item => {
            return {
                id: item.id,
                name: item.name,
                description: item.description,
                status: item.description
            }
        })
    }

}