import { Link } from "react-router-dom";
import css from "./Header.module.css";


function Header() {

    return (
        <header >
            <div className={css.headerContainer}>
                <Link to="/" className={css.logoText}> <img width="36" height="44" src="/logo.png" alt="logo" />Verba</Link>
                <nav className={css.navBox}>
                    <Link to="/" className={css.navItem}>Home</Link>
                    <Link to="teachers" className={css.navItem}>Teachers</Link>
                </nav>
                <button type="button" className={css.loginBtn}><svg width={20} height={20}><use href="/icons.svg#icon-login" className={css.iconLogin}></use></svg>Log in</button>
                <button type="button" className={css.registerBtn}>Registration</button>
            </div>
        </header>
    );
};

export default Header