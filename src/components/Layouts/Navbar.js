import {Link} from "react-router-dom"
import { useContext } from "react"

import styles from "./Navbar.module.css"
import Logo from "../../assets/images/logo.png"
import {Context} from "../../context/UserContext"

function Navbar(){

    const {loged, logout} = useContext(Context)

    return (
        <nav className={styles.NavBar}>
            <div className={styles.logo}>
                <img src={Logo} alt="Logo"/>
                <h2>Get a Pet</h2>
            </div>
            <div className={styles.menu_cell}>
                <p>Ver mais</p>
                <ul className={styles.links}>
                    <li>
                        <Link to="/">Adotar</Link>
                    </li>
                    {loged ? (<>
                    <li><Link to="/pet/mypets">Meus pets</Link></li>
                    <li><Link to="/pet/myadoptions">Minhas adoções</Link></li>
                    <li><Link to="/user/profile">Perfil</Link></li>
                    <li onClick={logout}>Sair</li>
                    </>) : (<>
                    <li>
                        <Link to="/Login">Login</Link>
                    </li>
                    <li>
                        <Link to="/Register">Register</Link>
                    </li></>)}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar