import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "../../../pages/login/LoginPage.module.scss";
import { LoginFormData, loginSchema } from "../../../schemas/auth";
import { useAuth } from "../../../hooks/use-auth";

export default function LoginForm() {
    const { login } = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        await login(data)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <input
                type="email"
                placeholder="Email"
                className={styles.input}
                {...register("email")}
            />
            {errors.email && (
                <span className={styles.error}>{errors.email.message}</span>
            )}
            <input
                type="password"
                placeholder="Password"
                className={styles.input}
                {...register("password")}
            />
            {errors.password && (
                <span className={styles.error}>{errors.password.message}</span>
            )}
            <button type="submit" className={styles.submitButton}>
                Login
            </button>
        </form>
    );
}
