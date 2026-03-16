
import { yupResolver } from '@hookform/resolvers/yup';
import css from './RegisterModal.module.css'
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import type { RegisterFormData } from '../../types/teachers';

const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required("Email is required."),
    password: yup.string().min(6).max(15).required("Password is required.")
})

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: RegisterFormData) => void;
    errorMessages: string
}

export default function RegisterModal({ isOpen, onClose, onSubmit, errorMessages }: Props) {
    const [showError, setShowError] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
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
                reset();
            }
        }
        addEventListener("keydown", handleClickEscape)

        return (() => removeEventListener("keydown", handleClickEscape))

    }, [isOpen, onClose])

    const handleBackDrop = (e: React.MouseEvent<HTMLElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
            reset();
        }
    }

    const handlerSubmit = (data: RegisterFormData) => {
        onSubmit(data)

    }

    useEffect(() => {
        if (!isOpen) {
            reset();
            setShowError(true);
        };
        if (errorMessages) {
            setShowError(true)
        }
    }, [isOpen, reset, errorMessages])

    const email = watch("email");


    useEffect(() => {
        if (email) {
            setShowError(false)
        }
    }, [email])

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    }

    return (
        <div className={openModal} onClick={handleBackDrop}>
            <div className={css.modal}>
                <button className={css.closeBtn} onClick={() => onClose()} type="button"><svg className={css.iconClose} width={32} height={32}><use href="/icons.svg#icon-close"></use></svg></button>
                <h2 className={css.title}>Registration</h2>
                <p className={css.text}>Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information</p>

                <form className={css.form} onSubmit={handleSubmit(handlerSubmit)}>
                    <div className={css.inputWrapper}>
                        <input
                            className={`${css.input} ${errors.name ? css.inputError : ""}`}
                            type="text"
                            placeholder="Name"
                            {...register('name')}
                        />
                        {errors.name && <p className={css.errorMessages}>{errors.name.message}</p>}
                    </div>

                    <div className={css.inputWrapper}>
                        <input
                            className={`${css.input} ${errors.email ? css.inputError : ""}`}
                            type="email"
                            placeholder="Email"
                            {...register('email')}
                        />
                        {errors.email && <p className={css.errorMessages}>{errors.email.message}</p>}
                        {errorMessages && showError && <p className={css.errorMessages}>{errorMessages}</p>}
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
                    </div>

                    <input className={css.submit} type="submit" value={"Sign Up"} />
                </form>
            </div>
        </div>
    )
}