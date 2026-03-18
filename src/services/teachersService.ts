
import {
    get, limitToFirst, orderByKey, push, query, ref, remove, set, startAfter
} from "firebase/database";
import type { Filters, LoginFormData, RegisterFormData, SaveFormData, Teacher } from "../types/teachers"
import { app, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

export type Response = {
    teachers: data,
    totalCount: number
}

type data = {
    [id: string]: Teacher
}

const refDB = ref(db, "teachers/teachers");


export async function getTeachers(limit: number, lastItemId?: string | null, filters?: Filters | null): Promise<Response | undefined> {

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

            const snapshot = await get(refDB);

            const dataTeachers = Object.entries(snapshot.val() as data)

            const dataFilters = dataTeachers.filter(([, teacher]) => {
                if (filters.language && !teacher.languages.includes(filters.language)) return false;
                if (filters.level && !teacher.levels.includes(filters.level)) return false;
                if (filters.price && teacher.price_per_hour > Number(filters.price) || teacher.price_per_hour < (Number(filters.price) - 10)) return false;
                return true;
            })

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



export const auth = getAuth(app);
// connectAuthEmulator(auth, "http://localhost:9099");




export async function LoginEmailPassword({ email, password }: LoginFormData) {

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential.user);

    } catch (error) {
        console.log(error);
        throw error;
    }
}


export async function createUser({ name, email, password }: RegisterFormData) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userCredential.user);
        if (auth.currentUser) {
            await updateProfile(auth.currentUser, {
                displayName: name,
            })
        }



    } catch (error) {
        console.log(error);
        throw error;

    }
}


export const logout = async () => {
    await signOut(auth);
}

// Favorites
export async function addFavorite(userId: string, teacherId: string) {
    const favoriteRef = ref(db, `favorites/${userId}/${teacherId}`);
    await set(favoriteRef, true);
}

export async function removeFavorite(userId: string, teacherId: string) {
    const favoriteRef = ref(db, `favorites/${userId}/${teacherId}`);
    await remove(favoriteRef);
}

export async function getFavorites(userId: string): Promise<string[]> {
    const favoritesRef = ref(db, `favorites/${userId}`);
    const snapshot = await get(favoritesRef);

    if (!snapshot.exists()) {
        return [];
    }

    return Object.keys(snapshot.val());
}

export async function toggleFavorite(userId: string, teacherId: string): Promise<boolean> {
    const favoriteRef = ref(db, `favorites/${userId}/${teacherId}`);
    const snapshot = await get(favoriteRef);

    if (snapshot.exists()) {
        await remove(favoriteRef);
        return false; // removed
    } else {
        await set(favoriteRef, true);
        return true; // added
    }
}

export async function getFavoritesTeachers(favorites: string[]): Promise<[string, Teacher][] | undefined> {

    const snapshot = await get(refDB);
    if (!snapshot.exists()) {
        console.log("No data available");
        return undefined
    }

    const teachers = Object.entries(snapshot.val() as data);

    return teachers.filter(([id]) => favorites.includes(id));
}

export async function saveFormData(data: SaveFormData) {
    const formDataRef = ref(db, `formBookData`);
    await push(formDataRef, data);
}