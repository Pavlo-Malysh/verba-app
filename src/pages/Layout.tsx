import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header.tsx"
import LoginModal from "../components/LoginModal/LoginModal.tsx";
import { useState } from "react";
import type { LoginFormData } from "../types/teachers.ts";

function Layout() {
    const [openModal, setOpenModal] = useState(false);
    const onSubmit = (data: LoginFormData) => {
        setOpenModal(false)
        console.log(data)

    };


    return (
        < >
            <Header openModal={() => setOpenModal(!false)} />
            <LoginModal isOpen={openModal} onClose={() => setOpenModal(false)} onSubmit={onSubmit} />
            <Outlet />

        </>
    )
}

export default Layout