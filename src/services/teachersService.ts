
import {
    get, limitToFirst, orderByKey, query, ref, startAfter
} from "firebase/database";
import type { Teacher } from "../types/teachers"
import { db } from "../firebase/firebaseConfig";

export type Response = {
    teachers: data,
    totalCount: number
}

type data = {
    id: Teacher
}

const refDB = ref(db, "teachers/teachers");


export default async function getTeachers(limit: number, lastItemId?: string | null): Promise<Response | undefined> {

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

        const [snapshot, snapshotCounter] = await Promise.all([get(recentTeachersRef), get(ref(db, "teachers/totalCount"))])


        if (!snapshot.exists()) {
            console.log("No data available");
            return undefined
        }

        return {
            teachers: snapshot.val(),
            totalCount: snapshotCounter.val()
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