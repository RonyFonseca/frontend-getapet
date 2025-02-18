import Input from '../../form/Input'
import api from '../../../utils/api'
import RoundedImage from '../../Layouts/RondedImage'

import { useEffect, useState} from 'react'

import styles from './Profile.module.css'
import formStyles from '../../form/Form.module.css'

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessages"

import Loading from "../../Layouts/Loading.js"


function Profile() {
    const [user, setUser] = useState({})
    const [preview, setPreview] = useState()
    const [token] = useState(localStorage.getItem('token') || "")
    const {setFlashMessage} = useFlashMessage()
    const [removeLoading, setRemoveLoading] = useState(true)

    useEffect(()=> {
        const checar = () => {
            api.get("/users/checkuser", {
                headers: {
                    Authorization: `Baerer ${token}`
                }
            }).then((response) => {
              setUser(response.data)
              setRemoveLoading(false)
            }).catch((err)=> {console.log(err.response.data)})
        }
        checar()
    },[token])

    const onFileChange = (e) => {
        setPreview(e.target.files[0])
        setUser({...user, [e.target.name]: e.target.files[0]})
    }

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        let type = "success"

        const formData = new FormData()
        await Object.keys(user).forEach((key) => {
            formData.append(key, user[key])
        })

        setRemoveLoading(true)
        const data = await api.patch(`/users/edit/${user._id}`, formData, {
            headers: {
                Authorization: `Baerer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) =>{
          setRemoveLoading(false)
            return response.data
        }).catch((err)=>{
            type = 'error'
            return err.response.data
        })
        
        setFlashMessage(data.message, type)
    }

  return (
    <section>
      {removeLoading ? <Loading /> : 
      <div>
        <div className={styles.profile_header}>
          <h1>Perfil</h1>
          {(user.image || preview) && (
            <RoundedImage src={preview ? URL.createObjectURL(preview): `${user.image}`}/>
          )}
        </div>
        <form onSubmit={handleSubmit} className={formStyles.form_container}>
          <Input
            text="Imagem"
            type="file"
            name="image"
            handleOnChange={onFileChange}
          />
          <Input
            text="E-mail"
            type="email"
            name="email"
            placeholder="Digite o e-mail"
            handleOnChange={handleChange}
            value={user.email || ''}
          />
          <Input
            text="Nome"
            type="text"
            name="name"
            placeholder="Digite o nome"
            handleOnChange={handleChange}
            value={user.name || ''}
          />
          <Input
            text="Telefone"
            type="text"
            name="phone"
            placeholder="Digite o seu telefone"
            handleOnChange={handleChange}
            value={user.phone || ''}
          />
          <Input
            text="Senha"
            type="password"
            name="password"
            placeholder="Digite a sua senha"
            handleOnChange={handleChange}
          />
          <Input
            text="Confirmação de senha"
            type="password"
            name="confirmPassword"
            placeholder="Confirme a sua senha"
            handleOnChange={handleChange}
          />
          <input type="submit" value="Editar" />
        </form>
      </div>}
    </section>
  )
}

export default Profile