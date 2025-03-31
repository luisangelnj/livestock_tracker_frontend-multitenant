import axios from '@/libs/apiAxios';

export default {

    async updatePersonalRecord(setId, ms) { 
        try {
            const response = await axios.post('/my-library/sets/games/match/update-personal-record?set_id=' + setId + '&milliseconds=' + ms)

            if (response.status === 200) {
                return {
                    success: true,
                    data: response.data.data
                }
            }
            return null;

        } catch (error) {
            return null;
        }
    },

    async getLastTenRecords(setId) {
        try {
            const response = await axios.get('/my-library/sets/games/match/last-ten-records?set_id=' + setId)

            if (response.status === 200) {
                return {
                    success: true,
                    data: response.data.data
                }
            }
            return null;

        } catch (error) {
            return null;
        }
    },

    async getPersonalRecord(setId) {
        try {
            const response = await axios.get('/my-library/sets/games/match/get-personal-record?set_id=' + setId);
            
            if (response.status === 200) {
                return {
                    success: true,
                    data: response.data.data
                }
            }
            return null;

        } catch (error) {
            return null;
        }
    }

}