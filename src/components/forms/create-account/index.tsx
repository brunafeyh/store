import { useForm } from "react-hook-form";
import { CreateAccountFormData, createAccountSchema } from "../../../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./CreateAccountForm.module.scss";
import { useState } from "react";
import { ViewFilled, ViewOffFilled } from "@carbon/icons-react";

export function CreateAccountForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateAccountFormData>({
        resolver: zodResolver(createAccountSchema),
    })



    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = async(data: CreateAccountFormData) => {
        const userData = {
            name: data.name,
            email: data.email,
            password: data.password,
            role: "CLIENT",
        }
        console.log("Formulário enviado:", userData);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <input
                type="text"
                placeholder="Nome"
                {...register("name")}
                className={styles.input}
            />
            {errors.name && <span className={styles.error}>{errors.name.message}</span>}

            <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className={styles.input}
            />
            {errors.email && <span className={styles.error}>{errors.email.message}</span>}

            <div className={styles.inputWithIcon}>
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha"
                    {...register("password")}
                    className={styles.input}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={styles.eyeButton}
                >
                    {showPassword ? <ViewFilled /> : <ViewOffFilled />}
                </button>
            </div>
            {errors.password && <span className={styles.error}>{errors.password.message}</span>}

            <div className={styles.inputWithIcon}>
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirmar senha"
                    {...register("confirmPassword")}
                    className={styles.input}
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={styles.eyeButton}
                >
                    {showConfirmPassword ? <ViewFilled /> : <ViewOffFilled />}
                </button>
            </div>
            {errors.confirmPassword && (
                <span className={styles.error}>{errors.confirmPassword.message}</span>
            )}

            <button type="submit" className={styles.submitButton}>
                Criar Conta
            </button>
        </form>
    )
}
