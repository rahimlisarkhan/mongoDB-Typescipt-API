import { useEffect, useRef, useState } from 'react';
import { signIn } from 'next-auth/client'
import { toast } from 'react-toastify';
import { userStore } from '../providers/userProvider';
import { register } from '../services/auth';
import { editProfileInfo } from '../services/profile';


const IndexPage = () => {

  const { user, setEditText, auth, setAuth, text, setUser } = userStore()
  const [formData, setFormData] = useState<any | null>({})
  const [errMessage, setErrorMessage] = useState<any>(false)
  const [login, setLogin] = useState(false)
  const inputRef = useRef<any | null>()
  const passwordRef = useRef<any | null>()


  const handleSubmitRegister = async () => {
    setErrorMessage(false)

    const formData = {
      email: inputRef.current.value,
      password: passwordRef.current.value
    }

    if (!login) {
      try {
        const { data: { message, auth } } = await register(formData)
        toast.success(message)
        setAuth(auth)
      } catch (err) {
        setErrorMessage(err.response.data.message)
      }
    } else {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      })

      console.log(result);

      setErrorMessage(result.error)
    }
  }

  useEffect(() => {
    user && setFormData({ ...user.profile })
  }, [user])


  const handleChange = ({ target: { name, value } }: any) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const { data } = await editProfileInfo(formData)
    setUser(data)
  }


  if (!user && auth) {
    return <>Loading....</>
  }

  return (
    !auth
      ?
      <>
        <div className="register">
          <h1>Welcome please {!login ? 'register' : 'login'}... 👋</h1>
          <input type='email' ref={inputRef} placeholder="Email" />
          <input type='password' ref={passwordRef} placeholder="Password" />

          <button onClick={() => {
            handleSubmitRegister()
          }}>
            send</button>
          {errMessage && <p className="errorMes">{errMessage}</p>}
          <span
            onClick={() => {
              setLogin(change => !change)
            }}>This is {!login ? 'sign in' : 'sign up'} </span>
        </div>
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
      </>
  )
}

export default IndexPage
