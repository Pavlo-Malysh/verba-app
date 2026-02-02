
export interface Teacher {
    avatar_url: string;
    conditions: string[];
    experience: string;
    languages: string[];
    lesson_info: string;
    lessons_done: number;
    levels: string[];
    name: string;
    price_per_hour: number;
    rating: number;
    reviews: Reviews[];
    surname: string;
}

interface Reviews {
    comment: string;
    reviewer_name: string;
    reviewer_rating: number;
}