import { useState } from "react";
import { addFeedBack } from "../../services/feedback";
import { convertNormalDate } from "../../helper/const-util";
import { FeedBackListProps } from "../../interfaces/feedback.model";



const FeedBackShare: React.FC<FeedBackListProps> = ({ setFeeds, feedsList }) => {

    const date = convertNormalDate(new Date())

    const [formData, setFormData] = useState<any | null>({})
    const [errorMes, setErrorMes] = useState(false)

    const handleChange = ({ target: { name, value } }: any) => {
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setErrorMes(false)
        
        if (formData) {
            try {
                formData.date = date;
                const { data: { feedback } } = await addFeedBack(formData)
                setFormData('');
                setFeeds([...feedsList, feedback])
            }
            catch (err) {
                const { response: { data: { message } } } = err
                setErrorMes(message)
            }
        }
    }

    return (
        <form onChange={handleChange} onSubmit={handleSubmit}>
            <br />
            <input type="author" name='author' value={formData ? formData.author : ''} placeholder='Author' />
            <br />
            <br />
            <textarea name="text" value={formData ? formData.text : ''}></textarea>

            {errorMes && <p className="errorMes">
                {errorMes}
            </p>}
            <br />
            <br />
            <button type="submit">Share</button>
        </form>
    )
}

export default FeedBackShare