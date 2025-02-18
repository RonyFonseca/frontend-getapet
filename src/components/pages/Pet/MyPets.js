import {useState, useEffect} from "react"
import {Link} from "react-router-dom"

import api from "../../../utils/api"
import useFlashMessages from "../../../hooks/useFlashMessages"

import styles from "./Dashboard.module.css"

import RoundedImage from "../../Layouts/RondedImage"

import Loading from "../../Layouts/Loading.js"

function MyPets(){
    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem("token") || "")
    const [removeLoading, setRemoveLoading] = useState(true)

    const {setFlashMessage} = useFlashMessages()

    useEffect(()=>{
        api.get("/pets/mypets", {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=> {
            setPets(response.data.petsUser)
            setRemoveLoading(false)
        })
    },[token])

    const remove = async(id) => {
        let type = "success"
        let msg

        setRemoveLoading(true)
        const data = await api.delete(`/pets/${id}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=> {
            msg = "Deletado"
            const NewPets = pets.filter((pet) => pet._id !== id)
            setPets(NewPets)
            setRemoveLoading(false)
            return response.data
        }).catch((err) => {
            type="error"
            msg = "Algo deu errado"
        })

        setFlashMessage(msg, type)
    }

    const concludeAdoption = async(id) => {
        let type = "success" 
        setRemoveLoading(true)
        const data = await api.patch(`/pets/conclude/${id}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setRemoveLoading(false)
            return response.data
        }).catch((err) => {
            type= "error"
            return err.response.data
        })

        setFlashMessage(data.message, type)
    }


    return (
        <section>
            {removeLoading ? <Loading /> :
            <div>
                <div className={styles.petslist_header}>
                <h1>Meus pets</h1>
                <Link to="/pet/add">Cadastrar pet</Link>
                </div>
                <div className={styles.petslist_container}>
                    {pets.length > 0 && pets.map((pet) => (
                        <div className={styles.petlist_row} key={pet._id}>
                            <RoundedImage src={`${pet.images[0]}`} alt={pet.name} width="px75"/>
                            <span className="bold">{pet.name}</span>
                            <div className={styles.actions}>
                                {pet.available ?
                                (<>
                                    {pet.adopter && (
                                        <button className={styles.conclude_btn} onClick={()=>concludeAdoption(pet._id)}>Concluir adoção</button>
                                    )}
                                    <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                                    <button onClick={() => remove(pet._id)}>Excluir</button>
                                </>) : (<p>Pet ja foi adotado</p>)}
                            </div>
                        </div>
                    ))}
                </div>
                    {pets.length == 0 && <p>Você não tem pets cadastrados</p>}
            </div>
            }
        </section>
    )
}

export default MyPets