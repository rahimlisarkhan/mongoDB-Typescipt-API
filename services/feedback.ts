import { FeedDataType } from "../interfaces/request.model";
import { Axios } from "../helper/axios-util"

export const getFeedBack = async () => {
    const response = await Axios.get('/feedback')
    return response;
}

export const addFeedBack = async (data: FeedDataType) => {
    const response = await Axios.post('/feedback', data)
    return response;
}

export const delFeedBack = async (id: any) => {
    const response = await Axios.delete('/feedback', { data: id })
    return response;
}