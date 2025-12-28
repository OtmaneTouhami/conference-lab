import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Review, ReviewRequest } from '../models/review.model';

@Injectable({ providedIn: 'root' })
export class ReviewService {
    private http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/conference-service/api/v1`;

    getReviewsByConference(conferenceId: string): Observable<Review[]> {
        return this.http.get<Review[]>(`${this.baseUrl}/conferences/${conferenceId}/reviews`);
    }

    getReviewById(reviewId: string): Observable<Review> {
        return this.http.get<Review>(`${this.baseUrl}/reviews/${reviewId}`);
    }

    createReview(conferenceId: string, review: ReviewRequest): Observable<Review> {
        return this.http.post<Review>(`${this.baseUrl}/conferences/${conferenceId}/reviews`, review);
    }

    updateReview(reviewId: string, review: ReviewRequest): Observable<Review> {
        return this.http.put<Review>(`${this.baseUrl}/reviews/${reviewId}`, review);
    }

    deleteReview(reviewId: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/reviews/${reviewId}`);
    }
}
