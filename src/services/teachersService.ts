
import { child, get, ref } from "firebase/database";
import type { Teacher } from "../types/teachers"
import { db } from "../firebase/firebaseConfig";


const dbRef = ref(db);

export default async function getTeachers(): Promise<Teacher[]> {

    try {
        const snapshot = await get(child(dbRef, `teachers/`))
        if (!snapshot.exists()) {
            console.log("No data available");
            return []
        } else {

            return snapshot.val();
        }

    } catch (error) {
        console.error(error);
        return []
    }

}
