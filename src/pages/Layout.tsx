import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header.tsx"

function Layout() {

    return (
        <div className="container">
            <Header />
            <Outlet />
        </div>
    )
}

export default Layout