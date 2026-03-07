import { yupResolver } from '@hookform/resolvers/yup';
import css from './LoginModal.module.css'
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import clsx from 'clsx';
import React, { useEffect } from 'react';
import type { LoginFormData } from '../../types/teachers';

const schema = yup.object({
    email: yup.string().email().required("Email is required."),
    password: yup.string().min(6).max(15).required("Password is required.")
})

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: LoginFormData) => void;
}

export default function LoginModal({ isOpen, onClose, onSubmit }: Props) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
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
            }
        }
        addEventListener("keydown", handleClickEscape)

        return (() => removeEventListener("keydown", handleClickEscape))

    }, [isOpen, onClose])

    const handleBackDrop = (e: React.MouseEvent<HTMLElement>) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const handlerSubmit = (data: LoginFormData) => {
        onSubmit(data)
        reset()
    }


    return (
        <div className={openModal} onClick={handleBackDrop}>
            <div className={css.modal}>
                <button className={css.closeBtn} onClick={() => onClose()} type="button"><svg className={css.iconClose} width={32} height={32}><use href="/icons.svg#icon-close"></use></svg></button>
                <h2 className={css.title}>Log In</h2>
                <p className={css.text}>Welcome back! Please enter your credentials to access your account and continue your search for an teacher.</p>

                <form className={css.form} onSubmit={handleSubmit(handlerSubmit)}>
                    <input className={css.input} {...register('email')} />
                    {errors.email && <p className={css.errorMessages}>{errors.email.message}</p>}

                    <input className={`${css.input} ${css.lastInput}`} {...register('password')} />
                    {errors.password && <p className={css.errorMessages}>{errors.password.message}</p>}
                    <input className={css.submit} type="submit" value={"Log In"} />
                </form>
            </div>
        </div>
    )
}