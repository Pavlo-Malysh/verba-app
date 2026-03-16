import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import css from "./BookTrialLessonModal.module.css"
import { useForm } from "react-hook-form";
import clsx from "clsx";

const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required("Email is required.")
})

interface Props {
    isOpen: boolean;
    onClose: () => void;
    // onSubmit: (data) => void;
    errorMessages: string;
}


export default function BookTrialLessonModal({ isOpen, onClose }: Props) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            email: "",
        }, resolver: yupResolver(schema)
    });

    const openModal = clsx(
        css.backdrop, isOpen && css.isOpen
    )

    // useEffect(() => {
    //     const handleClickEscape = (event: KeyboardEvent) => {
    //         if (event.key === "Escape") {
    //             onClose();
    //             reset();
    //         }
    //     }
    //     addEventListener("keydown", handleClickEscape)

    //     return (() => removeEventListener("keydown", handleClickEscape))

    // }, [isOpen, onClose])

    const handleBackDrop = (e: React.MouseEvent<HTMLElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
            reset();
        }
    }

    const handlerSubmit = (data) => {
        // onSubmit(data)

    }


    return (
        <div className={openModal} onClick={handleBackDrop}>
            <div className={css.modal}>
                <button className={css.closeBtn} onClick={() => onClose()} type="button"><svg className={css.iconClose} width={32} height={32}><use href="/icons.svg#icon-close"></use></svg></button>
                <h2 className={css.title}>Book trial lesson</h2>
                <p className={css.text}>Our experienced tutor will assess your current language level, discuss your learning goals, and tailor the lesson to your specific needs.</p>

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

                    </div>

                    <div className={css.inputWrapper}>


                    </div>

                    <input className={css.submit} type="submit" value={"Book"} />
                </form>
            </div>
        </div>
    )
}