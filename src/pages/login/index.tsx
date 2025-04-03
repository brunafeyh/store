import LoginForm from "../../components/forms/login";
import styles from "./LoginPage.module.scss";

export default function LoginPage() {
    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <div className={styles.testimonial}>
                    <p className={styles.quote}>
                        “A moda é uma linguagem. É uma maneira de dizer quem você é sem precisar falar”
                    </p>
                    <div className={styles.user}>
                        <div className={styles.name}>Costanza Pascolato</div>
                    </div>
                </div>
                <div className={styles.imageOverlay}></div>
            </div>

            <div className={styles.rightSide}>
                <div className={styles.formWrapper}>
                    <h2 className={styles.title}>Seja bem-vindo!</h2>
                    <p className={styles.subtitle}>Por favor, entre com suas credenciais!</p>

                    <LoginForm/>

                    <p className={styles.footer}>
                        Ainda não tem uma conta? <a href="/register">Registre-se</a>
                    </p>
                </div>
            </div>
        </div>
    )
}
