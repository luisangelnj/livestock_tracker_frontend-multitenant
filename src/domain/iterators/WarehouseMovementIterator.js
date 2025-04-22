export default {
    RequestToRegisterEntryMovement: (warehouseMovementModel) => {
        const formatDate = (dateStr) => {
            if (!dateStr || typeof dateStr !== 'string') return '';
        
            const parts = dateStr.split('/');
            if (parts.length !== 3) return '';
        
            const [day, month, year] = parts;
            return `${year}-${month}-${day}`;
        };

        return {
            register_date: formatDate(warehouseMovementModel.registerDate),
            movement_type: 'entry',
            movement_details: warehouseMovementModel.movementDetails.map(item => {
                return {
                    food_type_id: item.foodTypeId,
                    quantity: item.quantity,
                    unit_price: item.unitPrice,
                    description: item.description
                }
            })
        }
    }
}