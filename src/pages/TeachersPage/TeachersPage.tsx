import { useEffect, useState } from "react";
import getTeachers from "../../services/teachersService"
import TeacherList from "../../components/TeacherList/TeacherList";
import type { Teacher } from "../../types/teachers";
import css from "./TeachersPage.module.css"

export type TeacherEntry = [string, Teacher];



export default function TeachersPage() {
    const [teachers, setTeachers] = useState<TeacherEntry[]>([]);
    const [lastItemId, setlastItemId] = useState<string | null>(null)
    const [hasMore, setHasMore] = useState<number>(0)

    const limit = 4;


    useEffect(() => {
        const data = async () => {
            const data = await getTeachers(limit, lastItemId);

            if (data) {
                const teachersData = Object.entries(data.teachers)
                setTeachers(teachersData);

                const lastKey = teachersData[teachersData.length - 1][0]
                setlastItemId(lastKey);

                console.log("TEACHERS", teachersData);
                console.log("LAST", lastKey);
                const totalCount = data.totalCount;
                const total = totalCount
                setHasMore(total - limit)



            }
        }
        data();

    }, [])

    console.log("TOTALLLLLLLL", hasMore);

    const handleLoadMore = async () => {
        const data = await getTeachers(limit, lastItemId);
        if (data) {
            const teachers = Object.entries(data.teachers)
            setTeachers((prev) => [...prev, ...teachers]);

            const keys = Object.keys(data.teachers)
            setlastItemId(keys[keys.length - 1]);
            setHasMore((prev) => prev - limit)



        }

    }


    return (
        <div className="container">
            {teachers && <TeacherList teachers={teachers} />}
            {hasMore > 0 && <button onClick={handleLoadMore} className={css.btn} type="button">Load more</button>}
        </div>
    )
}



