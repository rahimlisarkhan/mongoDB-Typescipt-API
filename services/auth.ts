import { AuthType } from "../interfaces/auth.model"
import { Axios } from "../helper/axios"


export const register = async (registerData:AuthType) => {
    const response = await Axios.post('/register', registerData)
    return response
}