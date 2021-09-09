import { AxiosResponse } from "axios"
import { ProfileType, ResponseType } from "../interfaces/request.model"
import { Axios } from "../helper/axios-util"

export const getProfileInfo = async () => {
    const resp = await Axios.get<void, AxiosResponse<ResponseType<ProfileType>>>('/user')
    return resp
}

export const editProfileInfo = async (data: object) => {
    const resp = await Axios.put<void, AxiosResponse<ResponseType<ProfileType>>>('/user', data)
    return resp
}