import { useState } from "react";
import { addFeedBack } from "../../services/feedback";
import { convertNormalDate } from "../../helper/helper";

type Props = {
    setFeeds: (data) => void
    feedList:{
        feedback:any
    }
}

const FeedBackShare: React.FC<Props> = ({ setFeeds,feedList:{feedback} }) => {


    const date = convertNormalDate(new Date())

    const [formData, setFormData] = useState<any | null>({})

    const handleChange = ({ target: { name, value } }: any) => {
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if(formData){
            formData.date = date
            console.log(formData);
            setFormData('')
            const feedBackdata = async () => {
                const res = await addFeedBack(formData)
                const {data:{feedback}} = res
                setFeeds({...feedback, feedback})
                console.log(res);
            }
            feedBackdata()
        }
    }

    return (
        <form onChange={handleChange} onSubmit={handleSubmit}>
            <br />
            <input type="author" name='author' value={formData ? formData.author : ''} placeholder='Author' />
            <br />
            <br />
            <textarea name="text" value={formData ? formData.text : ''}></textarea>
            <br />
            <br />
            <button type="submit">Share</button>
        </form>
    )
}

export default FeedBackShare