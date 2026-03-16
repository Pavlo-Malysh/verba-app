import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header.tsx"
import LoginModal from "../components/LoginModal/LoginModal.tsx";
import { useEffect, useState } from "react";
import type { FirebaseAuthError, LoginFormData, RegisterFormData, User } from "../types/teachers.ts";
import RegisterModal from "../components/RegisterModal/RegisterModal.tsx";
import { auth, createUser, getFavorites, LoginEmailPassword, logout, toggleFavorite } from "../services/teachersService.ts";
import { onAuthStateChanged } from "firebase/auth";
import BookTrialLessonModal from "../components/BookTrialLessonModal/BookTrialLessonModule.tsx";


function Layout() {
    const [openModalLogin, setOpenModalLogin] = useState(false);
    const [openModalRegister, setOpenModalRegister] = useState(false);
    const [errorMessages, setErrorMessages] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<null | User>(null);
    const [favorites, setFavorites] = useState<string[]>([]);

    const onSubmitLogin = async (data: LoginFormData) => {
        try {
            setErrorMessages("");
            await LoginEmailPassword(data);
            setOpenModalLogin(false);

        } catch (error) {
            const firebaseError = error as FirebaseAuthError;
            if (firebaseError.code === "auth/wrong-password") {
                setErrorMessages("Wrong password. Try again!")
            } else {
                setErrorMessages(firebaseError.message)
            }
        }
    };

    const handleCloseLogin = () => {
        setOpenModalLogin(false);
        setErrorMessages("")
    }

    const handleCloseRegister = () => {
        setOpenModalRegister(false);
        setErrorMessages("")
    }

    const onSubmitRegister = async (data: RegisterFormData) => {
        try {
            setErrorMessages("");
            await createUser(data);
            setOpenModalRegister(false);

        } catch (error) {
            const firebaseError = error as FirebaseAuthError;
            console.log(firebaseError.message);
            if (firebaseError.code === "auth/email-already-in-use") {
                setErrorMessages("Email already in use. Try again!")
            } else {
                setErrorMessages(firebaseError.message)
            }
        }
    };


    const onLogout = async () => {
        await logout();
        setFavorites([]);
    }

    const handleToggleFavorite = async (teacherId: string) => {
        if (!user) {
            setOpenModalLogin(true);
            return;
        }
        const isAdded = await toggleFavorite(user.uid, teacherId);
        if (isAdded) {
            setFavorites((prev) => [...prev, teacherId])
        } else {
            setFavorites((prev) => prev.filter((id) => id !== teacherId));
        }

    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setIsLoggedIn(true);
                setUser(currentUser);

                const userFavorites = await getFavorites(currentUser.uid);
                setFavorites(userFavorites);

            } else {
                setIsLoggedIn(false);
                setUser(null);
                setFavorites([]);
            }
        });

        return () => unsubscribe();
    }, [])


    return (
        < >
            <Header openModalLogin={() => setOpenModalLogin(!false)} openModalRegister={() => setOpenModalRegister(!false)} isLoggedIn={isLoggedIn} onLogout={onLogout} user={user} />
            <LoginModal isOpen={openModalLogin} onClose={handleCloseLogin} onSubmit={onSubmitLogin} errorMessages={errorMessages} />
            <RegisterModal isOpen={openModalRegister} onClose={handleCloseRegister} onSubmit={onSubmitRegister} errorMessages={errorMessages} />
            {/* <BookTrialLessonModal/> */}
            <Outlet context={{ favorites, onToggleFavorite: handleToggleFavorite, user }} />

        </>
    )
}

export default Layout