import LoadingImg from "../../assets/images/Spin@1x-1.0s-200px-200px.svg"
import styles from "./Loading.module.css"
function Loading (){
    return (
        <div className={styles.container_loading}><img src={LoadingImg} /></div>
    )
}
export default Loading