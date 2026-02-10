
import { useState } from "react"
import TeacherCard from "../TeacherCard/TeacherCard"
import css from "./TeacherList.module.css"
import type { TeacherEntry } from "../../pages/TeachersPage/TeachersPage"

type Props = {
    teachers: TeacherEntry[];
}



export default function TeacherList({ teachers }: Props) {
    const [openId, setOpenId] = useState<string | null>(null)

    const handleToggle = (id: string) => {
        setOpenId(prev => prev === id ? null : id)
    }

    return (
        <ul className={css.list}>
            {teachers?.map(([id, teacher]) => {


                return ((

                    <TeacherCard
                        data={teacher}
                        key={id}
                        id={id}
                        isOpen={openId === id}
                        onToggle={handleToggle}
                    />
                ))
            })}

        </ul>
    )
}