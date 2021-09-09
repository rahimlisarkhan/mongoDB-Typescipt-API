import { useEffect, useState } from "react"
import { getFeedBack } from "../../services/feedback"
import dynamic from 'next/dynamic'

//child components
const FeedBackList = dynamic(() => import('../../components/Feedback/FeedBackList'))
const FeedBackShare = dynamic(() => import('../../components/Feedback/FeedbackShare'))

const FeedbackPage = () => {

    const [feeds, setFeeds] = useState<any | null>(null)
    const [errorMes, setErrorMes] = useState('')

    useEffect(() => {

        (async () => {
            setErrorMes(null)
            try {
                const { data } = await getFeedBack()
                setFeeds(data.feedback)
            }
            catch {
                setErrorMes('Error Mes')
            }
        })()

    }, [])


    if (!feeds) {
        return <>Loading...</>
    }

    return (
        <>
            <h2>Feedback Page</h2>
            <FeedBackList setFeeds={setFeeds} feedsList={feeds} />
            <FeedBackShare setFeeds={setFeeds} feedsList={feeds} />
        </>

    )
}


export default FeedbackPage

// export const getServerSideProps = async () => {

//     const feedbackData = await getFeedBack()
//     let { data } = feedbackData

//     console.log(data);

//     return {
//         props: {
//             feedback: 'test'
//         }
//     }

// }