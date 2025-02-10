import Input from "../../form/Input"
import styles from "../../form/Form.module.css"

import { useState,useContext } from "react"
import {Link} from "react-router-dom"

import { Context, } from "../../../context/UserContext"

function Register(){

    const [user, setUser] = useState({})
    const {register} = useContext(Context)

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        register(user)
    }
    
    return (
        <section className={styles.form_container}>
            <h1>Registrar</h1>
            <form onSubmit={handleSubmit}>
                <Input text="nome" type="text" placeholder="Digite o seu nome" name="name" handleOnChange={handleChange}/>
                <Input text="email" type="email" placeholder="Digite o seu E-mail" name="email" handleOnChange={handleChange}/>
                <Input text="phone" type="text" placeholder="Digite o seu telefone" name="phone" handleOnChange={handleChange}/>
                <Input text="password" type="password" placeholder="Digite a sua senha" name="password" handleOnChange={handleChange}/>
                <Input text="password" type="password" placeholder="Confirme sua senha" name="confirmPassword" handleOnChange={handleChange}/>
                <input type="submit" value="Enviar" />
            </form>
            <p>Já tem conta? <Link to="/login">CLique aqui</Link></p>
        </section>
    )
}

export default Register