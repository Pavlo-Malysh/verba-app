import css from "./Hero.module.css";

function Hero() {

    return (
        <section>
            <div className={` ${css.heroBox}`}>
                <div className={css.heroContent}>
                    <h1 className={css.title}>Unlock your potential with the best <span className={css.titleAccent}>language</span> tutors</h1>
                    <p className={css.text}>Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your language proficiency to new heights by connecting with highly qualified and experienced tutors.</p>
                    <a className={css.link} href="#">Get started</a>
                </div>
                <div className={css.heroImgBox}>
                    <img className={css.heroImg} src="/hero.png" alt="" />
                </div>
            </div>
            <div className={css.heroAdvantages}>
                <ul className={css.heroList}>
                    <li className={css.heroItem}>
                        <h4 className={css.listTitle}>32,000 +</h4>
                        <p className={css.listText}>Experienced tutors</p>
                    </li>
                    <li className={css.heroItem}>
                        <h4 className={css.listTitle}>300,000 +</h4>
                        <p className={css.listText}>5-star tutor reviews</p>
                    </li>
                    <li className={css.heroItem}>
                        <h4 className={css.listTitle}>120 +</h4>
                        <p className={css.listText}>Subjects taught</p>
                    </li>
                    <li className={css.heroItem}>
                        <h4 className={css.listTitle}>200 +</h4>
                        <p className={css.listText}>Tutor nationalities</p>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Hero;