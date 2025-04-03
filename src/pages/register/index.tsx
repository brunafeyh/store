import { CreateAccountForm } from "../../components/forms/create-account";
import styles from "../login/LoginPage.module.scss";

export default function RegisterPage() {
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
                    <h2 className={styles.title}>Criar Conta</h2>

                   <CreateAccountForm/>

                    <p className={styles.footer}>
                       Já tem uma conta? <a href="/login">Faça login</a>
                    </p>
                </div>
            </div>
        </div>
    )
}
