import { useOutletContext } from "react-router-dom";
import type { Teacher } from "../../types/teachers";
import TeacherList from "../../components/TeacherList/TeacherList";
import { useEffect, useState } from "react";
import { getFavoritesTeachers } from "../../services/teachersService";
import css from "./FavoritesPage.module.css"

interface OutletContextType {
    favorites: string[];
    onToggleFavorite: (teacherId: string) => void;

}


function FavoritesPage() {
    const { favorites, onToggleFavorite } = useOutletContext<OutletContextType>();

    const [teachersFavorites, setTeachersFavorites] = useState<[string, Teacher][]>([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const favoritesTeachers = await getFavoritesTeachers(favorites)

            if (favoritesTeachers) {
                setTeachersFavorites(favoritesTeachers)

            }
        }
        fetchFavorites();

    }, [favorites])


    return (
        <div className="container">
            <h2 className={css.title}>My Favorites</h2>
            <TeacherList teachers={teachersFavorites} favorites={favorites} onToggleFavorite={onToggleFavorite} />
        </div>
    )
}

export default FavoritesPage