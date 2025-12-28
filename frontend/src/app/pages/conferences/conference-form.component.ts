import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConferenceService } from '../../services/conference.service';
import { ConferenceRequest } from '../../models/conference.model';
import { ButtonComponent } from '../../components/ui/button.component';
import { InputComponent } from '../../components/ui/input.component';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardDescriptionComponent, CardContentComponent, CardFooterComponent } from '../../components/ui/card.component';
import { ToastService } from '../../components/ui/toast.component';

@Component({
    selector: 'app-conference-form',
    standalone: true,
    imports: [
        FormsModule,
        ButtonComponent,
        InputComponent,
        CardComponent,
        CardHeaderComponent,
        CardTitleComponent,
        CardDescriptionComponent,
        CardContentComponent,
        CardFooterComponent
    ],
    templateUrl: './conference-form.component.html',
    styleUrl: './conference-form.component.css'
})
export class ConferenceFormComponent implements OnInit {
    private conferenceService = inject(ConferenceService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private toastService = inject(ToastService);

    isEditMode = signal(false);
    loadingData = signal(false);
    saving = signal(false);
    errors = signal<Record<string, string>>({});

    form: ConferenceRequest = {
        title: '',
        type: '',
        date: '',
        duration: 60,
        numberOfEnrollments: 0,
        score: 1
    };

    private conferenceId: string | null = null;

    ngOnInit(): void {
        this.conferenceId = this.route.snapshot.params['id'];
        if (this.conferenceId && !this.router.url.includes('/new')) {
            this.isEditMode.set(true);
            this.loadConference();
        }
    }

    private loadConference(): void {
        if (!this.conferenceId) return;

        this.loadingData.set(true);
        this.conferenceService.getConferenceById(this.conferenceId).subscribe({
            next: (conference) => {
                this.form = {
                    title: conference.title,
                    type: conference.type,
                    date: conference.date,
                    duration: conference.duration,
                    numberOfEnrollments: conference.numberOfEnrollments,
                    score: conference.score
                };
                this.loadingData.set(false);
            },
            error: (err) => {
                this.toastService.error('Failed to load conference data');
                this.router.navigate(['/conferences']);
                console.error('Error loading conference:', err);
            }
        });
    }

    onSubmit(): void {
        if (!this.validate()) return;

        this.saving.set(true);

        const request$ = this.isEditMode() && this.conferenceId
            ? this.conferenceService.updateConference(this.conferenceId, this.form)
            : this.conferenceService.createConference(this.form);

        request$.subscribe({
            next: () => {
                this.toastService.success(
                    this.isEditMode() ? 'Conference updated successfully' : 'Conference created successfully'
                );
                this.router.navigate(['/conferences']);
            },
            error: (err) => {
                this.saving.set(false);
                this.toastService.error(
                    this.isEditMode() ? 'Failed to update conference' : 'Failed to create conference'
                );
                console.error('Error saving conference:', err);
            }
        });
    }

    private validate(): boolean {
        const newErrors: Record<string, string> = {};

        if (!this.form.title.trim()) {
            newErrors['title'] = 'Title is required';
        }
        if (!this.form.type) {
            newErrors['type'] = 'Type is required';
        }
        if (!this.form.date) {
            newErrors['date'] = 'Date is required';
        }
        if (!this.form.duration || this.form.duration < 1) {
            newErrors['duration'] = 'Duration must be at least 1 minute';
        }
        if (this.form.numberOfEnrollments < 0) {
            newErrors['numberOfEnrollments'] = 'Enrollments must be 0 or more';
        }
        if (!this.form.score || this.form.score < 1 || this.form.score > 5) {
            newErrors['score'] = 'Score must be between 1 and 5';
        }

        this.errors.set(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    cancel(): void {
        this.router.navigate(['/conferences']);
    }
}
