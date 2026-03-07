
import {
    get, limitToFirst, orderByKey, query, ref, startAfter
} from "firebase/database";
import type { Filters, Teacher } from "../types/teachers"
import { db } from "../firebase/firebaseConfig";

export type Response = {
    teachers: data,
    totalCount: number
}

type data = {
    [id: string]: Teacher
}

const refDB = ref(db, "teachers/teachers");


export default async function getTeachers(limit: number, lastItemId?: string | null, filters?: Filters | null): Promise<Response | undefined> {

    try {
        let recentTeachersRef;

        if (lastItemId) {

            recentTeachersRef = query(
                refDB,
                orderByKey(),
                startAfter(lastItemId),
                limitToFirst(limit)
            );
        } else {
            recentTeachersRef = query(
                refDB,
                orderByKey(),
                limitToFirst(limit)
            );
        }

        if (filters && (filters.language || filters.level || filters.price)) {
            console.log("FFFFFFFFF", filters);

            const snapshot = await get(refDB);

            const dataTeachers = Object.entries(snapshot.val() as data)

            const dataFilters = dataTeachers.filter(([, teacher]) => {
                if (filters.language && !teacher.languages.includes(filters.language)) return false;
                if (filters.level && !teacher.levels.includes(filters.level)) return false;
                if (filters.price && teacher.price_per_hour > Number(filters.price) || teacher.price_per_hour < (Number(filters.price) - 10)) return false;
                return true;
            })
            console.log("test", dataFilters);

            return {
                teachers: Object.fromEntries(dataFilters),
                totalCount: dataFilters.length

            }
        } else {

            const [snapshot, snapshotCounter] = await Promise.all([
                get(recentTeachersRef),
                get(ref(db, "teachers/totalCount"))])


            if (!snapshot.exists()) {
                console.log("No data available");
                return undefined
            }

            return {
                teachers: snapshot.val(),
                totalCount: snapshotCounter.val()
            }
        }


    } catch (error) {
        console.error(error);
        return undefined

    }

}

// під час додавання в колекцію teachers треба вручну збільшувати totalCounter




// const post = async (item: Teacher) => {


//     try {
//         const postRef = ref(db, 'teachers/teachers');
//         const newPostRef = push(postRef);
//         set(newPostRef, item
//         );

//         console.log(" POST sccesfuly");

//     } catch {
//         console.log("Error POST");
//     }

// }



// post();

// const test = () => eway.forEach((item) => post(item))

// test();