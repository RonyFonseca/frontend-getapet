import { useState, useContext } from 'react'
import Input from '../../form/Input'
import { Link } from 'react-router-dom'

import styles from '../../form/Form.module.css'

/* contexts */
import { Context } from '../../../context/UserContext'
import Loading from "../../Layouts/Loading.js"

function Login() {
  const [user, setUser] = useState({})
  const [removeLoading, setRemoveLoading] = useState(false)
  const { login } = useContext(Context)

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = login(user)
    setRemoveLoading(result)
  }

  return (
    <section className={styles.form_container}>
      {removeLoading ? <Loading /> : 
        <div>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <Input
              text="E-mail"
              type="email"
              name="email"
              placeholder="Digite o e-mail"
              handleOnChange={handleChange}
            />
            <Input
              text="Senha"
              type="password"
              name="password"
              placeholder="Digite a senha"
              handleOnChange={handleChange}
            />
            <input type="submit" value="Entrar" />
          </form>
          <p>
            Não tem conta? <Link to="/register">Clique aqui.</Link>
          </p>
        </div>}
    </section>
  )
}

export default Login