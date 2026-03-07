
import { useId, useState, useRef, useEffect } from "react";
import css from "./SearchBox.module.css";
import type { Filters } from "../../types/teachers";

interface Props {
    languages: string[];
    levels: string[];
    prices: number[];
    onSubmit: (data: Filters) => void;
}

const SearchBox = ({ languages, levels, prices, onSubmit }: Props) => {
    const [openSelect, setOpenSelect] = useState<string | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
    const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

    const fieldId = useId();
    const languageRef = useRef<HTMLDivElement>(null);
    const levelRef = useRef<HTMLDivElement>(null);
    const priceRef = useRef<HTMLDivElement>(null);



    const toggleSelect = (selectName: string) => {
        setOpenSelect(openSelect === selectName ? null : selectName);
    };

    // Закриття при кліку поза селектами
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                languageRef.current && !languageRef.current.contains(event.target as Node) &&
                levelRef.current && !levelRef.current.contains(event.target as Node) &&
                priceRef.current && !priceRef.current.contains(event.target as Node)
            ) {
                setOpenSelect(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (selectedLanguage || selectedLevel || selectedPrice) {
            onSubmit({
                language: selectedLanguage,
                level: selectedLevel,
                price: selectedPrice,
            });
        }


    }, [selectedLanguage, selectedLevel, selectedPrice])




    return (
        <>
            <form className={css.filtersForm}>

                <div className={css.filterField} ref={languageRef}>
                    <label htmlFor={`language-${fieldId}`} className={css.filterLabel}>
                        Languages
                    </label>
                    <div className={css.customSelect}>
                        <button
                            type="button"
                            id={`language-${fieldId}`}
                            onClick={() => toggleSelect("language")}
                            className={css.filterControl}
                        >
                            <span>{selectedLanguage || "Choose a language"}</span>
                            <svg
                                width="16" height="16"
                                className={`${css.selectArrow} ${openSelect === "language" ? css.selectArrowUp : ""}`.trim()}
                            >
                                <use href="/icons.svg#icon-select" />
                            </svg>
                        </button>
                        {openSelect === "language" && (
                            <ul className={css.selectDropdown}>
                                <li onClick={() => { setSelectedLanguage(""); setOpenSelect(null); }}>
                                    Choose a language
                                </li>
                                {languages.map((lang) => (
                                    <li
                                        key={lang}
                                        onClick={() => { setSelectedLanguage(lang); setOpenSelect(null); }}
                                        className={selectedLanguage === lang ? css.selectOptionSelected : ""}
                                    >
                                        {lang}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className={css.filterField} ref={levelRef}>
                    <label htmlFor={`level-${fieldId}`} className={css.filterLabel}>
                        Level of knowledge
                    </label>
                    <div className={css.customSelect}>
                        <button
                            type="button"
                            id={`level-${fieldId}`}
                            onClick={() => toggleSelect("level")}
                            className={css.filterControl}
                        >
                            <span>{selectedLevel || "Choose a level"}</span>
                            <svg
                                width="16" height="16"
                                className={`${css.selectArrow} ${openSelect === "level" ? css.selectArrowUp : ""}`.trim()}
                            >
                                <use href="/icons.svg#icon-select" />
                            </svg>
                        </button>
                        {openSelect === "level" && (
                            <ul className={css.selectDropdown}>
                                <li onClick={() => { setSelectedLevel(""); setOpenSelect(null); }}>
                                    Choose a level
                                </li>
                                {levels.map((level) => (
                                    <li
                                        key={level}
                                        onClick={() => { setSelectedLevel(level); setOpenSelect(null); }}
                                        className={selectedLevel === level ? css.selectOptionSelected : ""}
                                    >
                                        {level}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className={css.filterField} ref={priceRef}>
                    <label htmlFor={`price-${fieldId}`} className={css.filterLabel}>
                        Price
                    </label>
                    <div className={css.customSelect}>
                        <button
                            type="button"
                            id={`price-${fieldId}`}
                            onClick={() => toggleSelect("price")}
                            className={css.filterControl}
                        >
                            <span>{selectedPrice ? `${selectedPrice} $` : "Choose a price"}</span>
                            <svg
                                width="16" height="16"
                                className={`${css.selectArrow} ${openSelect === "price" ? css.selectArrowUp : ""}`.trim()}
                            >
                                <use href="/icons.svg#icon-select" />
                            </svg>
                        </button>
                        {openSelect === "price" && (
                            <ul className={css.selectDropdown}>
                                <li onClick={() => { setSelectedPrice(null); setOpenSelect(null); }}>
                                    Choose a price
                                </li>
                                {prices.map((price) => (
                                    <li
                                        key={price}
                                        onClick={() => { setSelectedPrice(price); setOpenSelect(null); }}
                                        className={selectedPrice === price ? css.selectOptionSelected : ""}
                                    >
                                        {price}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

            </form>

        </>
    );
};

export default SearchBox;