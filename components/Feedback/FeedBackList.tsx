import React from "react"
import { FeedBackListProps } from "../../interfaces/feedback.model";
import { delFeedBack } from "../../services/feedback";


const FeedBackList: React.FC<FeedBackListProps> = ({ feedsList, setFeeds }) => {

    console.log(feedsList);

    const deleteFeedBack: Function = (id: string) => {
        (async () => {
            const { data } = await delFeedBack({ id })
            setFeeds(data)
            // console.log(data);
        })()
    }


    return (
        <ul>
            {feedsList.map((item: any, index: number) => <li key={index}><strong>{item.author}: </strong> <span>{item.text}</span> - <span>{item.date}</span> <button onClick={() => deleteFeedBack(item.id)}>del</button></li>)}
        </ul>
    )
}

export default FeedBackList