import AuthenticationRepository from "@/data/AuthenticationRepository"

export default {

    registerUser: async (userModel) => {
        let obj = {
            first_name: userModel.first_name,
            last_name: userModel.last_name,
            email: userModel.email,
            password: userModel.password,
            password_confirmation: userModel.password_confirmation
        }
        const response = await AuthenticationRepository.createUser(obj);
        return response
    },

    resendVerificationEmail: async (email) => {
        const response = await AuthenticationRepository.resendVerificationEmail(email);
        return response
    },

    verifyUserEmail: async (id, token) => {
        const response = await AuthenticationRepository.verifyUserEmail(id, token);
        return response
    },

    forgotPassword: async (email) => {
        const response = await AuthenticationRepository.forgotPassword(email)
        return response
    },

    resetPassword: async (token, email, password, password_confirmation) => {
        const response = await AuthenticationRepository.resetPassword(token, email, password, password_confirmation)
        return response
    }

}