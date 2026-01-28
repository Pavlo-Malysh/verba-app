import css from "./Header.module.css";


function Header() {

    return (
        <header >
            <div className={css.headerContainer}>
                <a href="/" className={css.logoText}> <img width="36" height="44" src="/logo.png" alt="logo" />Verba</a>
                <nav className={css.navBox}>
                    <a href="#" className={css.navItem}>Home</a>
                    <a href="#" className={css.navItem}>Teachers</a>
                </nav>
                <button type="button" className={css.loginBtn}><svg width={20} height={20}><use href="/icons.svg#icon-login" className={css.iconLogin}></use></svg>Log in</button>
                <button type="button" className={css.registerBtn}>Registration</button>
            </div>
        </header>
    );
};

export default Header