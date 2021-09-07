import { useEffect, useState } from "react"
import FeedBackList from "../../components/Feedback/FeedBackList"
import FeedBackShare from "../../components/Feedback/FeedbackShare"
import Layout from "../../components/Layout"
import { Feedback } from "../../interfaces"
import { getFeedBack } from "../../services/feedback"
import { getProfileInfo } from "../../services/profile"

const FeedbackPage = (props) => {

    const [feeds,setFeeds] = useState<Feedback[] | null>(null)
    const [errorMes,setErrorMes] = useState('')

    

    useEffect(() => {
        const feedbackData = async () => {
            try{
                const { data } = await getFeedBack()
                setFeeds(data)
            }
            catch{
                setErrorMes('Error Mes')
            }
        }
        feedbackData()
        
    }, [])


    if( !feeds){
        return <>Loading...</>
    }

    return (
        <Layout>
            <h2>Feedback Page</h2>
            <FeedBackList setFeeds={setFeeds} feedsList={feeds} />
            <FeedBackShare feedList={feeds} setFeeds={setFeeds} />
        </Layout>

    )
}


export default FeedbackPage

// export async function getServerSideProps(){

//     const feedbackData = await getFeedBack()
//     let {data} = feedbackData


//     console.log(data);

//     return {
//         props:{
//             feedback:'test'
//         }
//     }

// }