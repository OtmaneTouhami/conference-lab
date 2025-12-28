import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ConferenceService } from '../../services/conference.service';
import { Conference } from '../../models/conference.model';
import { ButtonComponent } from '../../components/ui/button.component';
import { BadgeComponent } from '../../components/ui/badge.component';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent } from '../../components/ui/card.component';
import { DialogComponent } from '../../components/ui/dialog.component';
import { ToastService } from '../../components/ui/toast.component';

@Component({
  selector: 'app-conference-list',
  standalone: true,
  imports: [
    RouterLink,
    ButtonComponent,
    BadgeComponent,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardContentComponent,
    DialogComponent
  ],
  templateUrl: './conference-list.component.html',
  styleUrl: './conference-list.component.css'
})
export class ConferenceListComponent implements OnInit {
  authService = inject(AuthService);
  private conferenceService = inject(ConferenceService);
  private toastService = inject(ToastService);

  conferences = signal<Conference[]>([]);
  filter = signal<'all' | 'ACADEMIC' | 'COMMERCIAL'>('all');
  loading = signal(true);
  error = signal<string | null>(null);
  showDeleteDialog = signal(false);
  deleting = signal(false);

  private conferenceToDelete: Conference | null = null;

  filteredConferences = () => {
    const f = this.filter();
    if (f === 'all') return this.conferences();
    return this.conferences().filter(c => c.type === f);
  };

  ngOnInit(): void {
    this.loadConferences();
  }

  loadConferences(): void {
    this.loading.set(true);
    this.error.set(null);

    this.conferenceService.getConferences().subscribe({
      next: (conferences) => {
        this.conferences.set(conferences);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load conferences. Please try again.');
        this.loading.set(false);
        console.error('Error loading conferences:', err);
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

  confirmDelete(conference: Conference): void {
    this.conferenceToDelete = conference;
    this.showDeleteDialog.set(true);
  }

  deleteConference(): void {
    if (!this.conferenceToDelete) return;

    this.deleting.set(true);

    this.conferenceService.deleteConference(this.conferenceToDelete.id).subscribe({
      next: () => {
        this.conferences.update(list => list.filter(c => c.id !== this.conferenceToDelete!.id));
        this.showDeleteDialog.set(false);
        this.deleting.set(false);
        this.conferenceToDelete = null;
        this.toastService.success('Conference deleted successfully');
      },
      error: (err) => {
        this.deleting.set(false);
        this.toastService.error('Failed to delete conference');
        console.error('Error deleting conference:', err);
      }
    });
  }
}
