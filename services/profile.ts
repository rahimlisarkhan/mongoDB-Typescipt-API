import { AxiosResponse } from "axios"
import { ProfileType, ResponseType } from "../interfaces/request.model"
import { Axios } from "../helper/axios"

export const getProfileInfo = async () => {
    const resp = await Axios.get<void,AxiosResponse<ResponseType<ProfileType>>>('/profile')
    return resp   
} 

export const editProfileInfo = async (data) => {
    const resp = await Axios.put<void,AxiosResponse<ResponseType<ProfileType>>>('/profile',data)
    return resp   
} 