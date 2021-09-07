import Link from 'next/link'
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/Layout'
import { userStore } from '../providers/userProvider';
import { register } from '../services/auth';
import { editProfileInfo } from '../services/profile';

const IndexPage = () => {

  const { user, setEditText, auth, setAuth, text, setUser } = userStore()
  const [formData, setFormData] = useState<any | null>({})
  const [errMessage, setErrorMessage] = useState(false)

  const inputRef = useRef<any | null>()

  const handleSubmitRegister = () => {
    const formData = {
      email: inputRef.current.value
    }
    register(formData)
      .then(response => {
        setErrorMessage(false)
        toast.success(response.data.message)
        setAuth(response.data.auth)
      })
      .catch(err => setErrorMessage(err.response.data.message))
  }

  useEffect(() => {
    user && setFormData({ ...user.profile })
  }, [user])


  const handleChange = ({ target: { name, value } }: any) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const profileData = async () => {
      const res = await editProfileInfo(formData)
      setUser(res.data)
    }
    profileData()
  }



  if (!user) {
    return <>Loading....</>
  }

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      {!auth
        ?
        <>
          <h1>Welcome Please Login... 👋</h1>
          <div className="register">
            <input type='email' ref={inputRef} placeholder="Register" />
            <button onClick={handleSubmitRegister}>send</button>
          </div>
          {errMessage && <p className="errorMes"> Invalid mail </p>}
        </>
        :
        <>
          <h2>{text}</h2>
          <h1>Hello {formData.name} 👋</h1>

          <form onChange={handleChange} onSubmit={handleSubmit}>
            <label htmlFor={formData.id}>ID:</label>
            <input name='id' id={formData.id} defaultValue={formData.id} readOnly={false} />
            <br />
            <br />

            <label htmlFor={formData.name}>Name:</label>
            <input name='name' id={formData.name} defaultValue={formData.name} readOnly={false} />
            <br />
            <br />

            <label htmlFor={formData.age}>Age:</label>
            <input name='age' id={formData.age} defaultValue={formData.age} readOnly={false} />
            <br />
            <br />

            <label htmlFor={formData.country}>Country:</label>
            <input name='country' id={formData.country} defaultValue={formData.country} readOnly={false} />
            <br />
            <br />

            <button type='submit'>Edit</button>
          </form>

          <br />
          <br />
          {/* <button onClick={() => setEditText('Success')}>Change Text</button> */}
        </>}
    </Layout>
  )
}

export default IndexPage
