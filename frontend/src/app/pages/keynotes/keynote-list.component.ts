import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { KeynoteService } from '../../services/keynote.service';
import { Keynote } from '../../models/keynote.model';
import { ButtonComponent } from '../../components/ui/button.component';
import { CardComponent, CardContentComponent } from '../../components/ui/card.component';
import { DialogComponent } from '../../components/ui/dialog.component';
import { ToastService } from '../../components/ui/toast.component';

@Component({
  selector: 'app-keynote-list',
  standalone: true,
  imports: [
    RouterLink,
    ButtonComponent,
    CardComponent,
    CardContentComponent,
    DialogComponent
  ],
  templateUrl: './keynote-list.component.html',
  styleUrl: './keynote-list.component.css'
})
export class KeynoteListComponent implements OnInit {
  authService = inject(AuthService);
  private keynoteService = inject(KeynoteService);
  private toastService = inject(ToastService);

  keynotes = signal<Keynote[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  showDeleteDialog = signal(false);
  deleting = signal(false);

  private keynoteToDelete: Keynote | null = null;

  ngOnInit(): void {
    this.loadKeynotes();
  }

  loadKeynotes(): void {
    this.loading.set(true);
    this.error.set(null);

    this.keynoteService.getKeynotes().subscribe({
      next: (keynotes) => {
        this.keynotes.set(keynotes);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load keynotes. Please try again.');
        this.loading.set(false);
        console.error('Error loading keynotes:', err);
      }
    });
  }

  getInitials(keynote: Keynote): string {
    return `${keynote.firstName[0]}${keynote.lastName[0]}`.toUpperCase();
  }

  confirmDelete(keynote: Keynote): void {
    this.keynoteToDelete = keynote;
    this.showDeleteDialog.set(true);
  }

  deleteKeynote(): void {
    if (!this.keynoteToDelete) return;

    this.deleting.set(true);

    this.keynoteService.deleteKeynote(this.keynoteToDelete.id).subscribe({
      next: () => {
        this.keynotes.update(list => list.filter(k => k.id !== this.keynoteToDelete!.id));
        this.showDeleteDialog.set(false);
        this.deleting.set(false);
        this.keynoteToDelete = null;
        this.toastService.success('Keynote deleted successfully');
      },
      error: (err) => {
        this.deleting.set(false);
        this.toastService.error('Failed to delete keynote');
        console.error('Error deleting keynote:', err);
      }
    });
  }
}
