import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getTeachers } from "../../services/teachersService"
import TeacherList from "../../components/TeacherList/TeacherList";
import type { Teacher, Filters } from "../../types/teachers";
import css from "./TeachersPage.module.css"
import SearchBox from "../../components/SearchBox/SearchBox";

const languages = ["French", "English", 'German', 'Ukrainian', 'Polish', "Spanish", "Italian", "Korean", "Chinese", "Vietnamese"];
const levels = ["A1 Beginner", "A2 Elementary", "B1 Intermediate", "B2 Upper-Intermediate", "C1 Advanced", "C2 Proficient"]
const price_per_hour = [10, 20, 30, 40, 50]

export type TeacherEntry = [string, Teacher];

interface OutletContextType {
    favorites: string[];
    onToggleFavorite: (teacherId: string) => void;

}


export default function TeachersPage() {
    const { favorites, onToggleFavorite } = useOutletContext<OutletContextType>();
    const [teachers, setTeachers] = useState<TeacherEntry[]>([]);
    const [allFilteredTeachers, setAllFilteredTeachers] = useState<TeacherEntry[]>([]);
    const [lastItemId, setlastItemId] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState<number>(0);
    const [filters, setFilters] = useState<Filters | null>(null);
    const [visibleCount, setVisibleCount] = useState(4);
    const [filterLevel, setFilterLevel] = useState<string | null>(null);

    const limit = 4;

    const hasActiveFilters = filters && (filters.language || filters.level || filters.price);

    useEffect(() => {
        const fetchTeachers = async () => {
            const data = await getTeachers(limit, null, filters);

            if (data) {
                const teachersData = Object.entries(data.teachers);

                if (hasActiveFilters) {
                    // Зберігаємо ВСІ відфільтровані
                    setAllFilteredTeachers(teachersData);
                    // Показуємо перші 4
                    setTeachers(teachersData.slice(0, limit));
                    setVisibleCount(limit);
                    setHasMore(teachersData.length - limit);

                    if (filters.level) {
                        setFilterLevel(filters.level)
                    }
                } else {
                    // Звичайна пагінація Firebase
                    setTeachers(teachersData);

                    const lastKey = teachersData[teachersData.length - 1][0];
                    setlastItemId(lastKey);
                    setHasMore(data.totalCount - limit);
                }
            }
        };
        fetchTeachers();
    }, [filters, hasActiveFilters]);

    const handleLoadMore = async () => {
        if (hasActiveFilters) {
            // Пагінація на клієнті - показуємо наступні 4
            const newVisibleCount = visibleCount + limit;
            setTeachers(allFilteredTeachers.slice(0, newVisibleCount));
            setVisibleCount(newVisibleCount);
            setHasMore(allFilteredTeachers.length - newVisibleCount);
        } else {
            // Пагінація Firebase
            const data = await getTeachers(limit, lastItemId, filters);
            if (data) {
                const newTeachers = Object.entries(data.teachers);
                setTeachers((prev) => [...prev, ...newTeachers]);
                const keys = Object.keys(data.teachers);
                setlastItemId(keys[keys.length - 1]);
                setHasMore((prev) => prev - limit);
            }
        }
    };

    const handleFilter = (newFilters: Filters) => {
        setFilters(newFilters);
        setlastItemId(null);
    }



    return (
        <div className="container">
            <SearchBox languages={languages} levels={levels} prices={
                price_per_hour} onSubmit={handleFilter} />

            {teachers.length > 0 && <TeacherList teachers={teachers} filterLevel={filterLevel} favorites={favorites} onToggleFavorite={onToggleFavorite} />}

            {teachers.length === 0 && hasActiveFilters && (
                <p className={css.emptyMessage}>No teachers found matching your filters</p>
            )}

            {hasMore > 0 && <button onClick={handleLoadMore} className={css.btn} type="button">Load more</button>}
        </div>
    )
}



