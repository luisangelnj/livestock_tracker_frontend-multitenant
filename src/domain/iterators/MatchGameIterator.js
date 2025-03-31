export default {
    ResponseToLastTenRecords: (records) => {
        return records.map((record) => {
            return {
                id: record.id,
                setId: record.set_id,
                userId: record.user_id,
                milliseconds: record.milliseconds,
                user: {
                    id: record.user.id,
                    firstName: record.user.first_name,
                    lastName: record.user.last_name
                }
            }
        })
    }
}