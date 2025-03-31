import axios from '@/libs/apiAxios';

export default {

    async lastDraft(setId) {
        try {
            const response = await axios.get('/my-library/sets/drafts/last?id=' + setId);
            
            if (response.status === 200) {
                return {
                    success: true,
                    data: response.data.data
                }
            }
            return null;
        } catch (error) {
            // Manejo de otros tipos de errores
            console.error('Error getting last draft:', error.response ? error.response.data : error.message);
            return null; // Retorna null si ocurre un error diferente
        }
    },

    async discardDraft(setId) {
        try {
            const response = await axios.post('/my-library/sets/drafts/discard-draft', { id: setId });
            if (response.status === 200) {
                return {
                    success: true,
                    data: response.data.data
                }
            }
        } catch (error) {
            // Manejo de otros tipos de errores
            console.error('Error discarting last draft:', error.response ? error.response.data : error.message);
            return null; // Retorna null si ocurre un error diferente
        }
    },

    async autoSaveUnit(request) {
        try {
            
            // Crear una instancia de FormData
            const formData = new FormData();

            // Agregar los datos básicos al FormData
            formData.append('id', request.id);
            formData.append('name', request.name);
            formData.append('description', request.description);
            formData.append('is_public', request.isPublic ? 1 : 0);
            formData.append('status', request.status);

            // Agregar los datos de terms, incluyendo archivos si existen
            request.terms.forEach((term, index) => {
                formData.append(`terms[${index}][id]`, term.id ?? '');
                formData.append(`terms[${index}][set_id]`, term.setId ?? '');
                formData.append(`terms[${index}][term]`, term.term ?? '');
                formData.append(`terms[${index}][definition]`, term.definition ?? '');
                formData.append(`terms[${index}][image_id]`, term.imageId ?? '');
                formData.append(`terms[${index}][order]`, term.order);
                formData.append(`terms[${index}][header_number]`, term.headerNumber);

                // Agregar archivo solo si existe
                if (term.imageFile) {
                    formData.append(`terms[${index}][image_file]`, term.imageFile);
                }
            });

            // Enviar la solicitud con Axios usando FormData
            const response = await axios.post('/my-library/sets/drafts/auto-save', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                return {
                    success: true,
                    data: response.data.data
                }
            }

        } catch (error) {

            // Verifica si el código de respuesta es explícito (errores de validación)
            if (error.response && error.response.status === 403) {
                const errorMessage = error?.response?.data?.error?.details;  // Extrae los detalles de los errores

                // Estructura personalizada para devolver los errores
                return {
                    success: false,
                    code: 403,
                    error: errorMessage
                };
            }
            if (error.response && error.response.status === 409) {
                const errorMessage = error?.response?.data?.error?.details;  // Extrae los detalles de los errores

                // Estructura personalizada para devolver los errores
                return {
                    success: false,
                    code: 403,
                    error: errorMessage
                };
            }
            // Manejo de otros tipos de errores
            console.error('Error auto-saving last draft:', error.response ? error.response.data : error.message);
            return null; // Retorna null si ocurre un error diferente
        }
    },

    async publishUnit(setId) {
        try {
            const response = await axios.post('/my-library/sets/drafts/publish?id=' + setId);

            if (response.status === 200) {
                return {
                    success: true,
                    data: response.data.data
                }
            }

            return null;

        } catch (error) {

            if (error.response && error.response.status === 422) {
                const errorMessage = error?.response?.data?.error?.details;  // Extrae los detalles de los errores

                // Estructura personalizada para devolver los errores
                return {
                    success: false,
                    code: 422,
                    error: errorMessage
                };
            }

            // Manejo de otros tipos de errores
            console.error('Error publishing the unit:', error.response ? error.response.data : error.message);
            return null; // Retorna null si ocurre un error diferente
        }
    },

    async getSetDetail(setId) {
        try {
            const response = await axios.get('/my-library/sets/detail?id=' + setId);

            if (response.status === 200) {
                return {
                    success: true,
                    data: response.data.data
                }
            }

            return null;

        } catch (error) {
            
            // Manejo de otros tipos de errores
            console.error('Error getting the set detail:', error.response ? error.response.data : error.message);
            return null; // Retorna null si ocurre un error diferente
        }
    },

    async getPublicSetDetail(setId) {
        try {
            const response = await axios.get('/home/preview-set?id=' + setId);

            if (response.status === 200) {
                return {
                    success: true,
                    data: response.data.data
                }
            }

            return null;

        } catch (error) {
            
            // Manejo de otros tipos de errores
            console.error('Error getting the set detail:', error.response ? error.response.data : error.message);
            return null; // Retorna null si ocurre un error diferente
        }
    },

    async deleteSet(setId) {
        try {

            const response = await axios.post('/my-library/sets/delete?id=' + setId);

            if (response.status === 200) {
                return {
                    success: true,
                    data: response.data.data
                }
            }

            return null;
            
        } catch (error) { 

            // Manejo de otros tipos de errores
            console.error('Error deleting the unit:', error.response ? error.response.data : error.message);
            return null; // Retorna null si ocurre un error diferente
        }
    },

    async autoSaveEditUnit(setModel) {
        try {
            // Crear una instancia de FormData
            const formData = new FormData();

            formData.append('id', setModel.id);
            formData.append('name', setModel.name);
            formData.append('description', setModel.description);

            setModel.terms.forEach((term, index) => { 
                formData.append(`terms[${index}][id]`, term.id ?? '');
                formData.append(`terms[${index}][set_id]`, term.setId ?? '');
                formData.append(`terms[${index}][term]`, term.term ?? '');
                formData.append(`terms[${index}][definition]`, term.definition ?? '');
                formData.append(`terms[${index}][image_id]`, term.imageId ?? '');
                formData.append(`terms[${index}][order]`, term.order);
                formData.append(`terms[${index}][header_number]`, term.headerNumber);

                // Agregar archivo solo si existe
                if (term.imageFile) {
                    formData.append(`terms[${index}][image_file]`, term.imageFile);
                }
            })

            // Enviar la solicitud con Axios usando FormData
            const response = await axios.post('/my-library/sets/auto-save-edit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (response.status === 200) {
                return {
                    success: true,
                    data: response.data.data
                }
            }

        } catch (error) {
            // Manejo de otros tipos de errores
            console.error('Error auto-saving last draft:', error.response ? error.response.data : error.message);
            return null; // Retorna null si ocurre un error diferente
        }
    },

    async getLastPublicSets() {
        try {
            
            const response = await axios.get('/home/last-public-sets');
            if (response.status === 200) {
                
                return {
                    success: true,
                    data: response.data.data
                }
            }
            return null;
        } catch (error) {
            // Manejo de otros tipos de errores
            console.error('Error getting last public sets:', error.response ? error.response.data : error.message);
            return null; // Retorna null si ocurre un error diferente
        }
    }

}