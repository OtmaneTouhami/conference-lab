import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { KeynoteService } from '../../services/keynote.service';
import { KeynoteRequest } from '../../models/keynote.model';
import { ButtonComponent } from '../../components/ui/button.component';
import { InputComponent } from '../../components/ui/input.component';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardDescriptionComponent, CardContentComponent, CardFooterComponent } from '../../components/ui/card.component';
import { ToastService } from '../../components/ui/toast.component';

@Component({
  selector: 'app-keynote-form',
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
  templateUrl: './keynote-form.component.html',
  styleUrl: './keynote-form.component.css'
})
export class KeynoteFormComponent implements OnInit {
  private keynoteService = inject(KeynoteService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastService = inject(ToastService);

  isEditMode = signal(false);
  loadingData = signal(false);
  saving = signal(false);
  errors = signal<Record<string, string>>({});

  form: KeynoteRequest = {
    firstName: '',
    lastName: '',
    email: '',
    function: ''
  };

  private keynoteId: string | null = null;

  ngOnInit(): void {
    this.keynoteId = this.route.snapshot.params['id'];
    if (this.keynoteId) {
      this.isEditMode.set(true);
      this.loadKeynote();
    }
  }

  private loadKeynote(): void {
    if (!this.keynoteId) return;

    this.loadingData.set(true);
    this.keynoteService.getKeynoteById(this.keynoteId).subscribe({
      next: (keynote) => {
        this.form = {
          firstName: keynote.firstName,
          lastName: keynote.lastName,
          email: keynote.email,
          function: keynote.function
        };
        this.loadingData.set(false);
      },
      error: (err) => {
        this.toastService.error('Failed to load keynote data');
        this.router.navigate(['/keynotes']);
        console.error('Error loading keynote:', err);
      }
    });
  }

  onSubmit(): void {
    if (!this.validate()) return;

    this.saving.set(true);

    const request$ = this.isEditMode() && this.keynoteId
      ? this.keynoteService.updateKeynote(this.keynoteId, this.form)
      : this.keynoteService.createKeynote(this.form);

    request$.subscribe({
      next: () => {
        this.toastService.success(
          this.isEditMode() ? 'Keynote updated successfully' : 'Keynote created successfully'
        );
        this.router.navigate(['/keynotes']);
      },
      error: (err) => {
        this.saving.set(false);
        this.toastService.error(
          this.isEditMode() ? 'Failed to update keynote' : 'Failed to create keynote'
        );
        console.error('Error saving keynote:', err);
      }
    });
  }

  private validate(): boolean {
    const newErrors: Record<string, string> = {};

    if (!this.form.firstName.trim()) {
      newErrors['firstName'] = 'First name is required';
    }
    if (!this.form.lastName.trim()) {
      newErrors['lastName'] = 'Last name is required';
    }
    if (!this.form.email.trim()) {
      newErrors['email'] = 'Email is required';
    } else if (!this.isValidEmail(this.form.email)) {
      newErrors['email'] = 'Invalid email format';
    }
    if (!this.form.function.trim()) {
      newErrors['function'] = 'Function is required';
    }

    this.errors.set(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  cancel(): void {
    this.router.navigate(['/keynotes']);
  }
}
