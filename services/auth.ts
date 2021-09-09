import { AuthType } from "../interfaces/auth.model"
import { Axios } from "../helper/axios-util"


export const register = async (registerData:AuthType) => {
    const response = await Axios.post('/auth/register', registerData)
    return response
}