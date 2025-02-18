import api from "../../utils/api"
import {useState, useEffect} from "react"

import {Link} from "react-router-dom"

import styles from "./Home.module.css"

import Loading from "../Layouts/Loading.js"


function Home(){
    const [pets, setPets] = useState([])
    const [removeLoading, setRemoveLoading] = useState(true)
    useEffect(()=>{
        api.get("/pets")
        .then((response)=> {
            setPets(response.data.pets)
            setRemoveLoading(false)
        })
        .catch((err)=> {
            console.log(`Error ao buscar pelos pets: ${err.response.data.message}`)
        })
    },[])
    return (
        <section>
            {removeLoading ? <Loading /> : 
                <div>
                    <div className={styles.pet_home_header}>
                        <h1>Todos pets</h1>
                        <p>Esta página vai exibir todos os pets, você vai poder ver mais detalhes ou adotar um pet.</p>
                    </div>
                    <div className={styles.pet_container}>
                        {pets.length > 0 && pets.map((pet)=> (
                            <div className={styles.pet_card} key={pet._id}>
                                <div className={styles.container_image}>
                                    <div
                                        style={{
                                        backgroundImage: `url(${pet.images[0]})`,
                                        }}
                                        className={styles.pet_card_image}
                                    ></div>
                                    <div className={styles.pet_name_header}>
                                        <h3>{pet.name}</h3>
                                        <p>Peso:{pet.weight}Kg</p>
                                    </div>
                                </div>
                                {pet.available ? (<Link to={`pet/${pet._id}`}>Ver mais detalhes</Link>) : (
                                    <p className={styles.adopted_text}>Pet ja adotado</p>
                                )}
                            </div>
                        ))}
                        {pets.length === 0 && (<p>Não há pets cadastrados</p>)}
                    </div>
                </div>}
        </section>
    )
}

export default Home