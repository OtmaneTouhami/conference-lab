export interface Review {
    id: string;
    date: string;
    text: string;
    stars: number;
}

export interface ReviewRequest {
    date: string;
    text: string;
    stars: number;
}
