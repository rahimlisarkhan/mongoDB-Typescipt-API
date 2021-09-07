import React from "react"
import { Feedback } from "../../interfaces"
import { delFeedBack } from "../../services/feedback";

type Props = {
    feedsList:{
        feedback:{
            id: string,
            text: string,
            date: string,
            author: string,
        }
    }
}

const FeedBackList = ({ feedsList: { feedback },setFeeds }:any) => {

    console.log(feedback);

    const deleteFeedBack:Function = (id:string) =>{
        (async () =>{
            const {data} = await delFeedBack({id})
            setFeeds(data)
            console.log(data);
        })()
    }


    return (
        <ul>
            {feedback.map((item:any, index: number) => <li key={index}><strong>{item.author}: </strong> <span>{item.text}</span> - <span>{item.date}</span> <button onClick={()=> deleteFeedBack(item.id)}>del</button></li>)}
        </ul>
    )
}

export default FeedBackList