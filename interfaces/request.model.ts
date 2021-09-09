export interface ResponseType<T>{
    statusText:string,
    status:number,
    headers:Object,
    config:Object,
    request:any,
    data:T
}

export interface ProfileType {
    id: number,
    name:string,
    age:number,
    country:string,
    token:string
}

export interface FeedDataType {
    text: string,
    date: string,
    author: string,
}