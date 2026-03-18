import { useForm } from "react-hook-form";
import * as yup from "yup"
import clsx from 'clsx';
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./BookingModal.module.css"
import type { FormDataBook, SaveFormData, TeacherInfoBookModal } from "../../types/teachers";

const schema = yup.object({
    name: yup.string().min(3).required("Full Name is required"),
    email: yup.string().email().required("Email is required."),
    phone: yup.string().matches(/^\+?\d{10,15}$/, "Phone number is not valid").required("Phone is required"),
    reasonLearnEnglish: yup.string().required()
})

interface Props {
    isOpen: boolean;
    onClose: () => void;
    currentTeacher: null | TeacherInfoBookModal
    onSubmit: (data: SaveFormData) => void;

}

export default function BookingModal({ isOpen, onClose, currentTeacher, onSubmit }: Props) {
    const teacherId = currentTeacher?.id

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            reasonLearnEnglish: "",
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

    const handlerSubmit = (data: FormDataBook) => {
        if (!teacherId) return;
        onSubmit({ ...data, teacherId })

        reset()
    }


    return (
        <div className={openModal} onClick={handleBackDrop}>
            <div className={css.modal}>
                <button className={css.closeBtn} onClick={() => onClose()} type="button"><svg className={css.iconClose} width={32} height={32}><use href="/icons.svg#icon-close"></use></svg></button>
                <h2 className={css.title}>Book trial lesson</h2>
                <p className={css.text}>Our experienced tutor will assess your current language level, discuss your learning goals, and tailor the lesson to your specific needs.</p>
                <div className={css.teacherInfoBox}>
                    <img className={css.teacherInfoImg} src={currentTeacher?.avatar_url ? currentTeacher.avatar_url : ""} alt={`avatar ${currentTeacher?.name} ${currentTeacher?.surname}`} />
                    <div>
                        <p className={css.teacherInfoText}>Your teacher</p>
                        <h4 className={css.teacherInfoTitle}>{currentTeacher?.name} {currentTeacher?.surname}</h4>
                    </div>
                </div>
                <form className={css.form} onSubmit={handleSubmit(handlerSubmit)}>
                    <fieldset className={css.fieldQuestions}>
                        <legend className={css.titleRadioBtn}>What is your main reason for learning English?</legend>
                        <div className={css.fieldWrap}>
                            <input className={css.fieldInput} type="radio" id="career" value="career-and-business" defaultChecked  {...register('reasonLearnEnglish')} />
                            <span className={css.customRadio}></span>
                            <label className={css.fieldLabel} htmlFor="career">Career and business</label>
                        </div>
                        <div className={css.fieldWrap}>
                            <input className={css.fieldInput} type="radio" id="kids" value="lesson-for-kids" {...register('reasonLearnEnglish')} />
                            <span className={css.customRadio}></span>
                            <label className={css.fieldLabel} htmlFor="kids">Lesson for kids</label>
                        </div>
                        <div className={css.fieldWrap}>
                            <input className={css.fieldInput} type="radio" id="living-abroad" value="living-abroad" {...register('reasonLearnEnglish')} />
                            <span className={css.customRadio}></span>
                            <label className={css.fieldLabel} htmlFor="living-abroad">Living abroad</label>
                        </div>
                        <div className={css.fieldWrap}>
                            <input className={css.fieldInput} type="radio" id="coursework" value="Exams-and-coursework" {...register('reasonLearnEnglish')} />
                            <span className={css.customRadio}></span>
                            <label className={css.fieldLabel} htmlFor="coursework">Exams and coursework</label>
                        </div>
                        <div className={css.fieldWrap}>
                            <input className={css.fieldInput} type="radio" id="travel" value="travel" {...register('reasonLearnEnglish')} />
                            <span className={css.customRadio}></span>
                            <label className={css.fieldLabel} htmlFor="travel">Culture, travel or hobby</label>
                        </div>
                    </fieldset>

                    <div className={css.inputWrapper}>
                        <input
                            className={`${css.input} ${errors.name ? css.inputError : ""}`}
                            type="text"
                            placeholder="Full Name"
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
                        <div className={css.passwordWrapper}>
                            <input
                                className={`${css.input} ${errors.phone ? css.inputError : ""}`}
                                type="tel"
                                placeholder="Phone number"
                                {...register('phone')}
                            />

                        </div>

                        {errors.phone && <p className={css.errorMessages}>{errors.phone.message}</p>}

                    </div>

                    <input className={css.submit} type="submit" value={"Book"} />
                </form>
            </div>
        </div>
    )
}