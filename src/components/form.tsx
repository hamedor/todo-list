import styles from '../styles/form.module.scss'

const Form = () => {

    return(
        <div>
            <input className={styles.input} type="text" placeholder="добавить задачу"></input>
            <button className={styles.button}>ок</button>
        </div>
    )
}

export default Form;