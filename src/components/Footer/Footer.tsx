import css from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={css.footer}>
            <div className={css.container}>
                <p className={css.text}>
                    &copy; 2026 Built by{" "}
                    <a
                        className={css.link}
                        href="https://www.linkedin.com/in/pavlo-malysh/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <svg className={css.icon} width={16} height={16}>
                            <use href="/icons.svg#icon-linkedin"></use>
                        </svg>
                        Pavlo Malysh
                    </a>
                    . All rights reserved.
                </p>
            </div>
        </footer>
    );
}
