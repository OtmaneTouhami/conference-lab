import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { ConferenceService } from '../../services/conference.service';
import { ReviewService } from '../../services/review.service';
import { Conference } from '../../models/conference.model';
import { Review, ReviewRequest } from '../../models/review.model';
import { ButtonComponent } from '../../components/ui/button.component';
import { BadgeComponent } from '../../components/ui/badge.component';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardDescriptionComponent, CardContentComponent, CardFooterComponent } from '../../components/ui/card.component';
import { DialogComponent } from '../../components/ui/dialog.component';
import { ToastService } from '../../components/ui/toast.component';

@Component({
    selector: 'app-conference-detail',
    standalone: true,
    imports: [
        RouterLink,
        FormsModule,
        ButtonComponent,
        BadgeComponent,
        CardComponent,
        CardHeaderComponent,
        CardTitleComponent,
        CardContentComponent,
        DialogComponent
    ],
    templateUrl: './conference-detail.component.html',
    styleUrl: './conference-detail.component.css'
})
export class ConferenceDetailComponent implements OnInit {
    authService = inject(AuthService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private conferenceService = inject(ConferenceService);
    private reviewService = inject(ReviewService);
    private toastService = inject(ToastService);

    conference = signal<Conference | null>(null);
    reviews = signal<Review[]>([]);
    loading = signal(true);
    loadingReviews = signal(true);

    showAddReview = signal(false);
    savingReview = signal(false);
    showDeleteReviewDialog = signal(false);
    deletingReview = signal(false);

    newReview: ReviewRequest = {
        date: new Date().toISOString().split('T')[0],
        text: '',
        stars: 5
    };

    private reviewToDelete: Review | null = null;
    private conferenceId: string = '';

    ngOnInit(): void {
        this.conferenceId = this.route.snapshot.params['id'];
        this.loadConference();
        this.loadReviews();
    }

    private loadConference(): void {
        this.conferenceService.getConferenceById(this.conferenceId).subscribe({
            next: (conference) => {
                this.conference.set(conference);
                this.loading.set(false);
            },
            error: (err) => {
                this.toastService.error('Failed to load conference');
                this.router.navigate(['/conferences']);
                console.error('Error loading conference:', err);
            }
        });
    }

    private loadReviews(): void {
        this.loadingReviews.set(true);
        this.reviewService.getReviewsByConference(this.conferenceId).subscribe({
            next: (reviews) => {
                this.reviews.set(reviews);
                this.loadingReviews.set(false);
            },
            error: (err) => {
                this.loadingReviews.set(false);
                console.error('Error loading reviews:', err);
            }
        });
    }

    getStars(score: number): number[] {
        return Array(score).fill(0);
    }

    getEmptyStars(score: number): number[] {
        return Array(5 - score).fill(0);
    }

    formatDate(date: string): string {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    closeReviewDialog(): void {
        this.showAddReview.set(false);
        this.newReview = {
            date: new Date().toISOString().split('T')[0],
            text: '',
            stars: 5
        };
    }

    submitReview(): void {
        if (!this.newReview.text.trim()) {
            this.toastService.error('Please enter a review text');
            return;
        }

        this.savingReview.set(true);
        this.reviewService.createReview(this.conferenceId, this.newReview).subscribe({
            next: (review) => {
                this.reviews.update(list => [...list, review]);
                this.closeReviewDialog();
                this.savingReview.set(false);
                this.toastService.success('Review added successfully');
            },
            error: (err) => {
                this.savingReview.set(false);
                this.toastService.error('Failed to add review');
                console.error('Error adding review:', err);
            }
        });
    }

    confirmDeleteReview(review: Review): void {
        this.reviewToDelete = review;
        this.showDeleteReviewDialog.set(true);
    }

    deleteReview(): void {
        if (!this.reviewToDelete) return;

        this.deletingReview.set(true);
        this.reviewService.deleteReview(this.reviewToDelete.id).subscribe({
            next: () => {
                this.reviews.update(list => list.filter(r => r.id !== this.reviewToDelete!.id));
                this.showDeleteReviewDialog.set(false);
                this.deletingReview.set(false);
                this.reviewToDelete = null;
                this.toastService.success('Review deleted successfully');
            },
            error: (err) => {
                this.deletingReview.set(false);
                this.toastService.error('Failed to delete review');
                console.error('Error deleting review:', err);
            }
        });
    }
}
