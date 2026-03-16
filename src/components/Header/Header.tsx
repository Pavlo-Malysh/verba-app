import { Link } from "react-router-dom";
import css from "./Header.module.css";
import type { User } from "../../types/teachers";

interface Props {
    openModalLogin: () => void;
    openModalRegister: () => void;
    isLoggedIn: boolean;
    onLogout: () => void;
    user: User | null;
}

function Header({ openModalLogin, openModalRegister, isLoggedIn, onLogout, user }: Props) {

    return (
        <header >
            <div className={css.headerContainer}>
                <Link to="/" className={css.logoText}> <img width="36" height="44" src="/logo.png" alt="logo" />Verba</Link>
                <nav className={css.navBox}>
                    <Link to="/" className={css.navItem}>Home</Link>
                    <Link to="teachers" className={css.navItem}>Teachers</Link>
                    {isLoggedIn && <Link to="favorites" className={css.navItem}>Favorites</Link>}
                </nav>
                {isLoggedIn ? <><button type="button" onClick={() => onLogout()} className={css.loginBtn}><svg width={20} height={20}><use href="/icons.svg#icon-login" className={css.iconLogin}></use></svg>Log out</button>
                    <div className={css.userLoginName}>
                        <svg width={20} height={20}><use className={css.iconProfile} href="/icons.svg#icon-user-circle"></use></svg>
                        <p className={css.loginBtn}>{user?.displayName}</p>
                    </div> </> : <><button type="button" onClick={() => openModalLogin()} className={css.loginBtn}><svg width={20} height={20}><use href="/icons.svg#icon-login" className={css.iconLogin}></use></svg>Log in</button>
                    <button type="button" onClick={() => openModalRegister()} className={css.registerBtn}>Registration</button></>}
            </div>
        </header>
    );
};

export default Header