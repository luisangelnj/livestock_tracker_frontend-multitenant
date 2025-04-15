export default {
    
    ResponseToAllWarehouseStockList: (data) => {
        return {
            values: data.data.map(item => {
                return {
                    id: item.id,
                    foodTypeId: item.food_type_id,
                    foodType: item.food_type.name,
                    quantity: item.quantity,
                    estimatedUnitPrice:new Intl.NumberFormat('es-MX', {
                        style: 'currency',
                        currency: 'MXN',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    }).format(item.estimated_unit_price),
                    estimatedStockValue: new Intl.NumberFormat('es-MX', {
                        style: 'currency',
                        currency: 'MXN',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    }).format(item.estimated_stock_value),
                    createdAt: new Date( item.created_at ).toLocaleDateString("es-MX"),
                }
            }),
            totalPages: data.last_page
        }
    }

}