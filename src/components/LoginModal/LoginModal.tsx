import { yupResolver } from '@hookform/resolvers/yup';
import css from './LoginModal.module.css'
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import type { LoginFormData } from '../../types/teachers';

const schema = yup.object({
    email: yup.string().email().required("Email is required."),
    password: yup.string().min(6).max(15).required("Password is required.")
})

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: LoginFormData) => void;
    errorMessages: string;
}

export default function LoginModal({ isOpen, onClose, onSubmit, errorMessages }: Props) {
    const [showError, setShowError] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }, resolver: yupResolver(schema)
    });

    const openModal = clsx(
        css.backdrop, isOpen && css.isOpen
    )

    useEffect(() => {
        const handleClickEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
                reset()
            }
        }
        addEventListener("keydown", handleClickEscape)

        return (() => removeEventListener("keydown", handleClickEscape))

    }, [isOpen, onClose])

    const handleBackDrop = (e: React.MouseEvent<HTMLElement>) => {
        if (e.target === e.currentTarget) {
            onClose()
            reset()
        }
    }

    const handlerSubmit = (data: LoginFormData) => {
        onSubmit(data)
        reset()
    }

    const password = watch("password")

    useEffect(() => {

        if (errorMessages) {
            setShowError(true);
        }
        if (!isOpen) {
            reset();
            setShowError(true);
        }
    }, [errorMessages, isOpen, reset])


    useEffect(() => {
        if (password) {
            setShowError(false)
        };

    }, [password])

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    }

    return (
        <div className={openModal} onClick={handleBackDrop}>
            <div className={css.modal}>
                <button className={css.closeBtn} onClick={() => onClose()} type="button"><svg className={css.iconClose} width={32} height={32}><use href="/icons.svg#icon-close"></use></svg></button>
                <h2 className={css.title}>Log In</h2>
                <p className={css.text}>Welcome back! Please enter your credentials to access your account and continue your search for an teacher.</p>

                <form className={css.form} onSubmit={handleSubmit(handlerSubmit)}>
                    <div className={css.inputWrapper}>
                        <input
                            className={`${css.input} ${errors.email ? css.inputError : ""}`}
                            type="email"
                            placeholder="Email"
                            {...register('email')}
                        />
                        {errors.email && <p className={css.errorMessages}>{errors.email.message}</p>}
                    </div>

                    <div className={css.inputWrapper}>
                        <div className={css.passwordWrapper}>
                            <input
                                className={`${css.input} ${errors.password ? css.inputError : ""}`}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                {...register('password')}
                            />
                            <span onClick={toggleShowPassword} className={css.iconEyesBlock}><svg className={css.iconEyes} width={20} height={20}><use href={showPassword ? '/icons.svg#icon-eye' : '/icons.svg#icon-eye-blocked'}></use></svg></span>
                        </div>

                        {errors.password && <p className={css.errorMessages}>{errors.password.message}</p>}
                        {errorMessages && showError && <p className={css.errorMessages}>{errorMessages}</p>}
                    </div>

                    <input className={css.submit} type="submit" value={"Log In"} />
                </form>
            </div>
        </div>
    )
}