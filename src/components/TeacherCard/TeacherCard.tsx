
import { clsx } from 'clsx';
import type { Teacher } from "../../types/teachers";
import css from "./TeacherCard.module.css";

type Props = {
    id: string;
    data: Teacher;
    isOpen: boolean;
    onToggle: (id: string) => void;
}

export default function TeacherCard({ id, data, isOpen, onToggle }: Props) {
    const { avatar_url, conditions, languages, lesson_info, lessons_done, name, price_per_hour, rating, surname, experience, levels, reviews } = data

    const openReadMore = clsx(
        css.testtext, isOpen && css.open
    )




    return (
        <li className={css.card} key={id} >
            <div className={css.avatarContainer}> <img className={css.avatar} src={avatar_url} alt={`Teacher ${name} ${surname}`} width={96} height={96} /></div>


            <div className={css.wrapper}>
                <div className={css.navTeacherBlock}>
                    <h2 className={css.title}><span className={css.subtitle}>Languages</span>{name} {surname}</h2>
                    <ul className={css.list}>
                        <li className={`${css.listItemFirst} ${css.navListItem}`}>
                            <svg className={css.iconBook} width={16} height={16}><use href="/icons.svg#icon-book-open" ></use></svg>
                            <p className={css.listItemText}>Lessons online</p></li>
                        <li className={`${css.listItemText} ${css.navListItem}`}>Lessons done:  {lessons_done}</li>
                        <li className={`${css.navListItem} ${css.listItemRating} `}>
                            <svg width={16} height={16}><use href="/icons.svg#icon-star" ></use></svg>
                            <p className={css.listItemText}>Rating: {rating}</p></li>


                        <li className={`${css.navListItem} ${css.listItemText}`}>Price / 1 hour: <span className={css.price}>{price_per_hour}$</span></li>

                    </ul>
                    <svg className={css.iconHeart} width={20} height={20}><use href="/icons.svg#icon-heart" ></use></svg>

                </div>
                <div>
                    <ul className={css.listInfo}>
                        <li className={css.listItemInfo}><p className={css.infoText}>Speaks:</p>
                            {languages.map((item, index) => <span className={css.infoTextLangueges} key={index}>{index > 0 && ", "}{item}</span>)}
                        </li>
                        <li className={css.listItemInfo}><p className={css.infoText}>Lesson Info: <span className={css.infoTextLessons}>{lesson_info}</span></p></li>
                        <li className={css.listItemInfo} ><p className={css.infoText}>Conditions:</p>
                            {conditions.map((item, index) => <span className={css.infoTextConditions} key={index}>{item} </span>)}
                        </li>

                    </ul>
                </div>
            </div>

            {!isOpen && <button onClick={() => onToggle(id)} className={css.readMoreBtn} type="button">Read more</button>}
            <div className={clsx(openReadMore)}>
                <p className={css.experienceText}>{experience}</p>
                <ul className={css.reviewsList}>
                    {reviews.map((review, index) => {
                        const { comment, reviewer_name, reviewer_rating } = review

                        return (
                            <li className={css.reviewsListItem} key={index}>
                                {/* <img className={css.userAvatarReviews} src="/user-default.png" alt="default user avatar" width={44} height={44} /> */}
                                <div className={css.reviewWrapper}>
                                    <svg className={css.userAvatarDefault} width={44} height={44}><use href="/icons.svg#icon-person" ></use></svg>

                                    <div >
                                        <h3 className={css.reviewerTitle}>{reviewer_name}</h3>
                                        <div className={css.reviewerRatingWrapper}>
                                            <svg width={16} height={16}><use href="/icons.svg#icon-star" ></use></svg>
                                            <p className={css.ratingNumber}>{Number.isInteger(reviewer_rating) ? `${reviewer_rating}.0` : reviewer_rating}</p>
                                        </div>
                                    </div>

                                </div>

                                <p className={css.commentText}>{comment}</p>
                            </li>
                        )

                    })
                    }
                </ul>
                <ul className={css.listLevels}>
                    {levels.map((level, index) => <li className={css.listLevelsItem} key={index}>#{level}</li>)}

                </ul>
                <button className={css.bookTrialLessonBtn} type="button">Book trial lesson</button>
            </div>


        </li >
    )
}